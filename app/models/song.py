from .db import db, add_prefix_for_prod
from .likes import likes
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

playlist_songs = db.Table(
    "playlist_songs",
    db.Model.metadata,
    db.Column("song_id", db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), primary_key=True),
    db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")), primary_key=True),
    db.Column("created_at", db.Date)
)

class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=False)
    track_num = db.Column(db.Integer, nullable=False)
    song_link = db.Column(db.String, nullable=False)

    album = db.relationship("Album", back_populates="songs")
    song_likes = db.relationship("User", secondary=likes, back_populates="liked_songs")
    playlists = db.relationship("Playlist", secondary=playlist_songs, back_populates="playlist_songs")

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "title": self.title,
            "album_id": self.album_id,
            "track_num": self.track_num,
            "song_link": self.song_link,
            "likes": len(self.song_likes)
        }

        if printer:
            print(return_dict)

        return return_dict

if environment == "production":
    playlist_songs.schema = SCHEMA
