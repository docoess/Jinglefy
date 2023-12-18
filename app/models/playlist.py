from .db import db, add_prefix_for_prod
from .song import playlist_songs
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Playlist(db.Model):
  __tablename__ = "playlists"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  cover_img = db.Column(db.String, nullable=False)

  user = db.relationship("User", back_populates="playlists")
  playlist_songs = db.relationship("Song", secondary=playlist_songs, back_populates="playlists")



  def to_dict(self,  printer=False):
    return_dict = {
      "id": self.id,
      "title": self.title,
      "owner_id": self.owner_id,
      "cover_img": self.cover_img
    }

    if printer:
      print(return_dict)

    return return_dict
