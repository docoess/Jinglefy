from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired, FileAllowed
from wtforms import StringField, FileField
from wtforms.validators import DataRequired
# from app.models import Album

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

class PlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    cover_image = FileField("Cover Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])


class UpdatePlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    cover_image = FileField("Cover Image", validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))])