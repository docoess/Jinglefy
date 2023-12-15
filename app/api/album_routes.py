from flask import Blueprint, request
from flask_login import login_required, current_user
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
    return album.to_dict()

@album_routes.route('/', methods=['POST'])
@login_required
def create_album():
    """
    Creates a new Album
    """
    form = AlbumForm()

    if form.validate_on_submit():
        new_album = Album(
            title = request.json['title'],
            cover_image = request.json['cover_image'],
            desc = request.json['desc'],
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
