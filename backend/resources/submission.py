from flask_restx import Resource
from flask import request, jsonify, make_response, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from threading import Thread
from http import HTTPStatus

from models.file import FileModel, Show
from models.score import ScoreModel, Track
from models.user import UserModel
from schemas.submission import SubmissionPublicSchema
from utils import submission_records_parser, get_AOE_week, get_AOE_today,  get_leaderboard_default
from sendmail import send_email
from calculate import metric_calculate_pipeline
from config import configs
import file_upload

publicFormSchema = SubmissionPublicSchema()

class Submission(Resource):
    @classmethod
    @jwt_required()
    def get(cls, submitID):
        '''Get submission by submit uuid'''
        try:
            user_mail = get_jwt_identity()

            submission_record = FileModel.find_by_submitID(submitUUID=submitID)
            assert submission_record.email == user_mail
            download_path = submission_record.filePath

            return send_file(download_path, as_attachment=True)
        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    @jwt_required()
    def post(cls):
        '''Upload user submission'''
        try:
            user_mail = get_jwt_identity()

            # check current submission counts
            daily_counts = FileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_today(to_str=False))
            weekly_counts = FileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_week(to_str=False))
            if (daily_counts >= configs["DAILY_SUBMIT_LIMIT"]) or (weekly_counts >= configs["WEEKLY_SUBMIT_LIMIT"]):
                return {"message": f"Exceed Submission Limit: You have submitted {daily_counts} times today and {weekly_counts} times this week."}, HTTPStatus.FORBIDDEN
            
            # file validation
            file = request.files['file']

            if file.filename == "":
                return {"message": "No file selected."}, HTTPStatus.FORBIDDEN
            if not file_upload.zipfile_check(file):
                return {"message": "Wrong file format."}, HTTPStatus.FORBIDDEN

            # load form data
            formData = publicFormSchema.load(request.form)

            # get file path
            upload_count = FileModel.get_upload_count_by_mail(
                email=user_mail) + 1
            folder = file_upload.create_folder(user_mail, str(upload_count))
            file_path = file_upload.get_full_path(folder, file.filename)

            # add column for db
            formData.update({"email": user_mail, "filePath": file_path})

            fileObj = FileModel(**formData)
            print(formData)
            AOScoreObj = ScoreModel(track=Track.AUDIO_ONLY)
            VOScoreObj = ScoreModel(track=Track.VIDEO_ONLY)
            AVFScoreObj = ScoreModel(track=Track.AUDIO_VISUAL_FUSION)
            fileObj.scores.append(AOScoreObj)
            fileObj.scores.append(VOScoreObj)
            fileObj.scores.append(AVFScoreObj)
            fileObj.save_to_db()
            try:
                file.save(file_path)

                # start processing
                thread = Thread(target=metric_calculate_pipeline, kwargs={"file_path": file_path,
                                                                          "submitUUID": formData["submitUUID"]})
                thread.start()

                return {"message": "Upload successfully!"}, HTTPStatus.OK
            except Exception as e:
                fileObj.delete_from_db()  # Rollback
                return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR
        except ValidationError as e:
            return {"message": "There's something worng with your input!"}, HTTPStatus.BAD_REQUEST
        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    @jwt_required()
    def patch(cls, submitID):
        '''Change user submission show on leaderboard or not by uuid'''
        try:
            user_mail = get_jwt_identity()

            submission_record = FileModel.find_by_submitID(submitUUID=submitID)

            assert submission_record.email == user_mail

            if submission_record.showOnLeaderboard == Show.YES:
                FileModel.unset_show_attribute_by_submitID(submitUUID=submitID)
                return {"message": "Remove from the leaderboard!", "submitID": submitID}, HTTPStatus.OK

            else:
                FileModel.set_show_attribute_by_submitID(submitUUID=submitID)
                return {"message": "Shown on the leaderboard!", "submitID": submitID}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


class SubmissionList(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        '''Get user all submission info'''
        try:
            user_mail = get_jwt_identity()
            submission_records = FileModel.find_by_email(email=user_mail).all()
            submission_info = submission_records_parser(
                submission_records, configs, mode="individual")
            return make_response(jsonify({"submission_info": submission_info}), HTTPStatus.OK)
        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


class LeaderBoard(Resource):
    @classmethod
    def get(cls):
        '''Get leaderboard data'''
        try:
            leaderboard_default_data = get_leaderboard_default()
            leaderboard_user_data = FileModel.find_show_on_leaderboard()
            submission_names = []
            for user_data in leaderboard_user_data:
                submission_names.append(
                    UserModel.find_by_email(email=user_data.email).name)
            submission_info = submission_records_parser(
                leaderboard_user_data, configs, mode="leaderboard")

            leaderboard_default_data["audioOnly"] += submission_info["audioOnly"]
            leaderboard_default_data["videoOnly"] += submission_info["videoOnly"]
            leaderboard_default_data["audioVisualFusion"] += submission_info["audioVisualFusion"]

            return {"leaderboard": leaderboard_default_data}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


