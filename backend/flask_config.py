import os
from db import SQL_URI
from dotenv import load_dotenv

load_dotenv()
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = SQL_URI

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
MAX_CONTENT_LENGTH = 50 * 1024 * 1024
JWT_ERROR_MESSAGE_KEY = "message"
