import re
import os
import datetime 
import uuid
import enum
import datetime
import magic
from dotenv import load_dotenv

def check_admin_credential(admin_email):
    load_dotenv()
    ADMIN_EMAIL_LIST = os.getenv(
        'ADMIN_EMAIL_LIST', default="")
    ADMIN_EMAIL_LIST = ADMIN_EMAIL_LIST.split(",")
    return admin_email in ADMIN_EMAIL_LIST


def is_plaintext(file_path):
    f = magic.Magic(mime=True)
    return f.from_file(file_path) == 'text/plain'

def is_csv(file_path):
    f = magic.Magic(mime=True)
    return f.from_file(file_path) in ['application/csv', 'text/csv', 'text/plain']

def get_uuid():
    return str(uuid.uuid4())
    
def get_AOETime(to_str = True):
    aoe_time = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12))
    if to_str:
        return aoe_time.strftime("%Y-%m-%d %H:%M:%S")
    else:
        return aoe_time.replace(microsecond=0)

def get_AOE_today(to_str=True):
    aoe_time = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12)).replace(hour=0,minute=0,second=0,microsecond=0)
    if to_str:
        return aoe_time.strftime("%Y-%m-%d %H:%M:%S")
    else:
        return aoe_time

def get_AOE_week(to_str=True):
    # Sunday is the start
    aoe_time = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12)).replace(hour=0,minute=0,second=0,microsecond=0) - datetime.timedelta(days=datetime.datetime.today().weekday() + 1)
    if to_str:
        return aoe_time.strftime("%Y-%m-%d %H:%M:%S")
    else:
        return aoe_time

def admin_submission_records_parser(submission_records, configs):
    return submission_records_parser(submission_records, configs, mode="individual", competition_type="hidden")


def submission_records_parser(submission_records, configs, mode="individual", competition_type="public"):

    def __submission_records_parser(attribute, key_name):
        if (attribute is None) or (attribute == ""):
            return "-"
        elif isinstance(attribute, enum.Enum):
            return attribute.name
        elif isinstance(attribute, datetime.datetime):
            return attribute.strftime("%Y-%m-%d %H:%M:%S")
        elif isinstance(attribute, float):
            if re.search(r"stoi|mtwv|map|[pwce]er|acc|f1", key_name):
                return round(attribute * 100, 2)
            elif ("der" in key_name):
                return round(attribute, 2)
            else:
                return attribute
        else:
            return attribute
    if mode == "individual":
        if competition_type == "public":
            config_mode = "INDIVIDUAL_SUBMISSION_INFO"

    elif mode == "leaderboard":
        if competition_type == "public":
            config_mode = "LEADERBOARD_INFO"
    file_info_list = configs[config_mode]["FILE"]
    score_info_list = configs[config_mode]["SCORE"]

    submission_info = {
        "audioOnly": [],
        "videoOnly": [],
        "audioVisualFusion": []
    }
    key_change = {
        "AUDIO_ONLY": "audioOnly",
        "VIDEO_ONLY": "videoOnly",
        "AUDIO_VISUAL_FUSION": "audioVisualFusion",
        "AS_20K_map_public": "AS_20K",
        "VGGSound_acc_public": "VGGSound",
        "Kinetics_Sounds_acc_public": "Kinetics_Sounds",
        "UCF101_acc_public": "UCF101",
        "LRS3_TED_cer_public": "LRS3_TED",
        "VoxCeleb2_eer_public": "VoxCeleb2",
        "IEMOCAP_acc_public": "IEMOCAP"
    }
    for file_model in submission_records:
        for score_model in file_model.scores:  
            single_info = {}
            for file_info in file_info_list:
                single_info[file_info] = __submission_records_parser(file_model.__dict__[file_info], file_info)
            for score_info in score_info_list:
                if score_info in key_change:
                    single_info[key_change[score_info]] = __submission_records_parser(score_model.__dict__[score_info], score_info)
                else:
                    single_info[score_info] = __submission_records_parser(score_model.__dict__[score_info], score_info)
            submission_info[key_change[single_info["track"]]].append(single_info)
    return submission_info

def get_leaderboard_default():
    AudioOnly = [
        {
            "paramShared": 94700000,
            "submitName": "HuBERT",
            "AS_20K": 14.3,
            "VGGSound": 30.21,
            "Kinetics_Sounds": 51.46,
            "UCF101": 36.06,
            "LRS3_TED": 2.96,
            "VoxCeleb2": 20.29,
            "IEMOCAP": 62.14,
            "submitUUID": "HuBERT-123123"
        },
        {
            "paramShared": 0,
            "submitName": "AV-HuBERT",
            "AS_20K": 12.6,
            "VGGSound": 31.14,
            "Kinetics_Sounds": 49.02,
            "UCF101": 38.58,
            "LRS3_TED": 3.01,
            "VoxCeleb2": 14.71,
            "IEMOCAP": 58.54,
            "submitUUID": "AV-HuBERT-1233321"
        },
        {
            "paramShared": 0,
            "submitName": "RepLAI",
            "AS_20K": 12.3,
            "VGGSound": 27.01,
            "Kinetics_Sounds": 45.9,
            "UCF101": 33.85,
            "LRS3_TED": 66.09,
            "VoxCeleb2": 30.4,
            "IEMOCAP": 57.53,
            "submitUUID": "RepLAI-321123"
        },
        {
            "paramShared": 0,
            "submitName": "AVBERT",
            "AS_20K": 2.6,
            "VGGSound": 4.46,
            "Kinetics_Sounds": 17.86,
            "UCF101": 16.15,
            "LRS3_TED": 84.22,
            "VoxCeleb2": 48.9,
            "IEMOCAP": 45.8,
            "submitUUID": "AVBERT-32133123"
        },
        {
            "paramShared": 0,
            "submitName": "MAViL",
            "AS_20K": 21.6,
            "VGGSound": 39.91,
            "Kinetics_Sounds": 57.28,
            "UCF101": 45.68,
            "LRS3_TED": 24.43,
            "VoxCeleb2": 20.83,
            "IEMOCAP": 59.46,
            "submitUUID": "MAViL-3215533123"
        }
    ]
    VideoOnly = [
        {
            "paramShared": 0,
            "submitName": "AV-HuBERT",
            "AS_20K": 2.4,
            "VGGSound": 5.9,
            "Kinetics_Sounds": 24.73,
            "UCF101": 37.55,
            "LRS3_TED": 50.91,
            "VoxCeleb2": 17.42,
            "IEMOCAP": 26.59,
            "submitUUID": "AV-HuBERT-1233321"
        },
        {
            "paramShared": 0,
            "submitName": "RepLAI",
            "AS_20K": 5.5,
            "VGGSound": 13.5,
            "Kinetics_Sounds": 46.68,
            "UCF101": 56.69,
            "LRS3_TED": 71.33,
            "VoxCeleb2": 44.44,
            "IEMOCAP": 40.72,
            "submitUUID": "RepLAI-321123"
        },
        {
            "paramShared": 0,
            "submitName": "AVBERT",
            "AS_20K": 1.5,
            "VGGSound": 2.76,
            "Kinetics_Sounds": 17.86,
            "UCF101": 24.69,
            "LRS3_TED": 80.87,
            "VoxCeleb2": 49.63,
            "IEMOCAP": 33.06,
            "submitUUID": "AVBERT-32133123"
        },
        {
            "paramShared": 0,
            "submitName": "MAViL",
            "AS_20K": 18.0,
            "VGGSound": 32.08,
            "Kinetics_Sounds": 74.01,
            "UCF101": 79.37,
            "LRS3_TED": 74.03,
            "VoxCeleb2": 23.13,
            "IEMOCAP": 43.03,
            "submitUUID": "MAViL-3215533123"
        }
    ]
    AudioVisualFusion = [
        {
            "paramShared": 0,
            "submitName": "AV-HuBERT",
            "AS_20K": 13.3,
            "VGGSound": 32.69,
            "Kinetics_Sounds": 52.23,
            "UCF101": 41.46,
            "LRS3_TED": 2.75,
            "VoxCeleb2": 14.56,
            "IEMOCAP": 46.45,
            "submitUUID": "AV-HuBERT-1233321"
        },
        {
            "paramShared": 0,
            "submitName": "AVBERT",
            "AS_20K": 2.0,
            "VGGSound": 4.25,
            "Kinetics_Sounds": 20.56,
            "UCF101": 23.46,
            "LRS3_TED": 75.74,
            "VoxCeleb2": 48.78,
            "IEMOCAP": 46.63,
            "submitUUID": "AVBERT-32133123"
        },
        {
            "paramShared": 0,
            "submitName": "MAViL",
            "AS_20K": 26.7,
            "VGGSound": 47.22,
            "Kinetics_Sounds": 79.51,
            "UCF101": 77.98,
            "LRS3_TED": 30.18,
            "VoxCeleb2": 15.94,
            "IEMOCAP": 54.94,
            "submitUUID": "MAViL-3215533123"
        }
    ]
    
    return {
        "audioOnly": AudioOnly,
        "videoOnly": VideoOnly,
        "audioVisualFusion": AudioVisualFusion
    }

