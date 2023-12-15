from .db import db

class Playlist(db.Model):
  __tablename__ = "playlists"
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  cover_img = db.Column(db.String, nullable=False)

  user = db.relationship("User", back_populates="playlists")
  playlist_songs = db.relationship("Songs", secondary="playlist_songs", back_populates="songs")



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
