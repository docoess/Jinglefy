from .db import db

likes =  db.Table(
    "likes",
    db.Model.metadata,
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
)
