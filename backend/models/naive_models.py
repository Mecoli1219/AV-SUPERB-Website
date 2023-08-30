from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, Enum, Float, DateTime, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from models.file import Status, Show
from sqlalchemy.dialects.mysql import BIGINT

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(80), nullable=False, unique=True)
    name = Column(String(80), nullable=False)

class FileModel(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True)
    email = Column(ForeignKey('users.email'), nullable=False)
    submitUUID = Column(String(36),  nullable=False)

    # upload froms
    submitName = Column(String(80),  nullable=False)
    modelURL = Column(String(264))
    modelDesc = Column(Text())
    paramShared = Column(String(80))

    # others
    state = Column(Enum(Status),  nullable=False)
    stateInfo = Column(String(80))
    filePath = Column(String(264), nullable=False)
    aoeTimeUpload = Column(DateTime, nullable=False)
    dateUpload = Column(DateTime)
    showOnLeaderboard = Column(Enum(Show),  nullable=False)

    scores = relationship("ScoreModel",  backref="files")
