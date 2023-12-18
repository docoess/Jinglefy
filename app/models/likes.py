from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

likes =  db.Table(
    "likes",
    db.Model.metadata,
    db.Column("song_id", db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

if environment == "production":
    likes.schema = SCHEMA
