from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_restx import Api
from marshmallow import ValidationError

from db import db
from resources.user import UserInfo, UserLogin
from resources.submission import LeaderBoard, Submission, SubmissionList
from resources.download import Example, Expdirs

app = Flask(__name__)
load_dotenv()

app.config.from_object("flask_config")


jwt = JWTManager(app)
CORS(app, resource={r"/api/*": {"origin": "*"}})
api = Api(app)

db.init_app(app)
with app.app_context():
    db.drop_all()
    db.create_all()


@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(err.messages), 400

# public
api.add_resource(Submission, "/api/submission", methods=["POST"])
api.add_resource(Submission, "/api/submission/<string:submitID>",
                 methods=["GET", "PATCH"])
api.add_resource(SubmissionList, "/api/submissions")
api.add_resource(LeaderBoard, "/api/submission/leaderboard")


# utilities
api.add_resource(UserInfo, "/api/user/info")
api.add_resource(UserLogin, "/api/user/login")
api.add_resource(Example, "/api/download/example")
api.add_resource(Expdirs, "/api/download/expdirs")

# db.init_app(app)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
