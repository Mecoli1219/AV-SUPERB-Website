from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
db = SQLAlchemy()

load_dotenv()
SQL_HOST = os.getenv('SQL_HOST')
SQL_PORT = os.getenv('SQL_PORT')
SQL_USER = os.getenv('SQL_USER')
SQL_PASSWORD = os.getenv('SQL_PASSWORD')
SQL_DATABASE = os.getenv('SQL_DATABASE')
SQL_URI = f'mysql+pymysql://{SQL_USER}:{SQL_PASSWORD}@{SQL_HOST}:{SQL_PORT}/{SQL_DATABASE}'