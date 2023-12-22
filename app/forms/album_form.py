from flask_wtf.file import FileRequired, FileAllowed
from wtforms.validators import DataRequired
from wtforms import StringField, FileField
from flask_wtf import FlaskForm

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

class AlbumForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    cover_image = FileField("Cover Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField("Description")
