from db import db
import enum

class Track(enum.Enum):
    AUDIO_ONLY = 1
    VIDEO_ONLY = 2
    AUDIO_VISUAL_FUSION = 3
class ScoreModel(db.Model):
    __tablename__ = "scores"

    id = db.Column(db.Integer, primary_key=True)
    fileId = db.Column(db.Integer, db.ForeignKey('files.id'), nullable=False)
    track = db.Column(db.Enum(Track), nullable=False)

    # metrics
    AS_20K_map_public = db.Column(db.Float)
    VGGSound_acc_public = db.Column(db.Float)
    Kinetics_Sounds_acc_public = db.Column(db.Float)
    UCF101_acc_public = db.Column(db.Float)
    LRS3_TED_cer_public = db.Column(db.Float)
    VoxCeleb2_eer_public = db.Column(db.Float)
    IEMOCAP_acc_public = db.Column(db.Float)

    @classmethod
    def find_by_fileId(cls, _id: int) -> "ScoreModel":
        return cls.query.filter_by(fileId=_id)

    @classmethod
    def find_by_id(cls, _id: int) -> "ScoreModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
