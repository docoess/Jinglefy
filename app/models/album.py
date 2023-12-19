from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    cover_image = db.Column(db.String(255), nullable=False)
    desc = db.Column(db.String(2000), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    num_songs = db.Column(db.Integer, nullable=False)
    release_date = db.Column(db.Date, nullable=False)

    artist = db.relationship("User", back_populates="albums")
    songs = db.relationship("Song", back_populates="album", cascade="all, delete" )

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "title": self.title,
            "cover_image": self.cover_image,
            "desc": self.desc,
            "artist_id": self.artist_id,
            "num_songs": self.num_songs,
            "release_date": self.release_date
        }

        if printer:
            print(return_dict)

        return return_dict
