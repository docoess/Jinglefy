from flask import Blueprint, request
from flask_login import login_required, current_user
from .aws_helpers import get_unique_filename, upload_file_to_s3
from app.models import Album, db
from ..forms import AlbumForm
from datetime import date

album_routes = Blueprint('album', __name__)

@album_routes.route('/')
def get_all_albums():
    """
    Returns a list of all albums
    """
    albums = [album.to_dict() for album in Album.query.all()]
    return albums

@album_routes.route('/<int:id>')
def get_album_by_id(id):
    """
    Returns a specific album specified by id
    """
    album = Album.query.get(id)

    artist = album.artist
    artist_dict = artist.to_dict()

    return_dict = album.to_dict()
    return_dict['artist'] = artist_dict

    return return_dict

@album_routes.route('/new', methods=['POST'])
@login_required
def create_album():
    """
    Creates a new Album
    """

    form = AlbumForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    print("FORM CSRF TOKEN: ", form["csrf_token"])

    if form.validate_on_submit():
        cover_image = form.data["cover_image"]
        cover_image.filename = get_unique_filename(cover_image.filename)
        upload = upload_file_to_s3(cover_image, filetype="image")
        print("UPLOAD FROM CREATE ALBUM ROUTE: ", upload)

        if "url" not in upload:
         # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return upload

        new_album = Album(
            title = form.data["title"],
            cover_image = upload["url"],
            desc = form.data["description"],
            artist = current_user,
            num_songs = 0,
            release_date = date.today()
        )

        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    else:
        print(form.errors)
        return form.errors

@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_album(id):
    target_album = Album.query.get(id)

    if target_album.artist_id == current_user.id:
        db.session.delete(target_album)
        db.session.commit()
        return {"message": "Successfully Deleted"}
    else:
        return {"errors": {"message" : "Forbidden"}}
