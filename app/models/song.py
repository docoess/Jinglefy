from .db import db

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"), nullable=False)
    track_num = db.Column(db.Integer, nullable=False)
    song_link = db.Column(db.String, nullable=False)

    album = db.relationship("Album", back_populates="songs")

    def to_dict(self, printer=False):
        return_dict = {
            "id": self.id,
            "title": self.title,
            "album_id": self.album_id,
            "track_num": self.track_num,
            "song_link": self.song_link
        }

        if printer:
            print(return_dict)

        return return_dict


playlist_songs = db.Table(
    "playlist_songs",
    db.Model.metadata,
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True),
    db.Column("playlist_id", db.Integer, db.ForeignKey("playlists.id"), primary_key=True),
    db.Column("created_at", db.Date)
)
