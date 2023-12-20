from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.models import Album, Playlist,  db
from ..forms import PlaylistForm, UpdatePlaylistForm
from datetime import date

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
@login_required
def get_all_playlists():
    """
    Returns a list of all playlists
    """

    playlists = db.session.query(Playlist).filter(Playlist.owner_id == current_user.id)
    def num_songs_dict(playlist):
        dict = playlist.to_dict()
        songs = playlist.playlist_songs
        dict["num_songs"] = len(list(songs))
        return dict
    playlists = [num_songs_dict(playlist) for playlist in playlists]
    return playlists


@playlist_routes.route('/<int:id>')
@login_required
def get_playlist_by_id(id):
    """
    Returns a specific playlist specified by id
    """
    playlist = Playlist.query.get(id)

    songs = [song.to_dict() for song in playlist.playlist_songs]

    owner = playlist.user
    owner_dict = owner.to_dict()

    return_dict = playlist.to_dict()
    return_dict['owner'] = owner_dict
    return_dict['songs'] = songs

    return return_dict


@playlist_routes.route('/new', methods=['POST'])
@login_required
def create_playlist():
    """
    Creates a new playlist
    """
    print("HEY! LISTEN!")
    form = PlaylistForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    # print("FORM CSRF TOKEN: ", form["csrf_token"])

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

        new_playlist = Playlist(
            title = form.data["title"],
            cover_img = upload["url"],
            user = current_user
        )

        db.session.add(new_playlist)
        db.session.commit()

        return_dict = new_playlist.to_dict()
        return_dict['owner'] = current_user.to_dict()
        return_dict['songs'] = []
        return return_dict
    else:
        print(form.errors)
        return form.errors



@playlist_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_playlist(id):
    """
    Updates a playlist
    """
    print("HEY! LISTEN!")
    form = UpdatePlaylistForm()

    playlist = Playlist.query.get(id)

    form["csrf_token"].data = request.cookies["csrf_token"]

    owner_id = playlist.owner_id

    if current_user.id != owner_id:
        response = make_response({ "errors": { "message": "forbidden"} }, 401)
        return response

    # print("FORM CSRF TOKEN: ", form["csrf_token"])

    if form.validate_on_submit():

        if form.data['title']:
            playlist.title = form.data['title']

        if form.data['cover_image'] != 'undefined':
            print(" ")
            print("cover image from update playlist: ", form.data["cover_image"])
            print(" ")
            old_cover = playlist.cover_img
            cover_image = form.data["cover_image"]
            cover_image.filename = get_unique_filename(cover_image.filename)
            upload = upload_file_to_s3(cover_image, filetype="image")
            print("UPLOAD FROM CREATE ALBUM ROUTE: ", upload)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
                return upload

            remove_file_from_s3(old_cover, filetype='image')

            playlist.cover_img = upload['url']

        db.session.commit()

        return_dict = playlist.to_dict()
        return_dict['owner'] = current_user.to_dict()
        return_dict['songs'] = [song.to_dict() for song in playlist.playlist_songs]
        return return_dict
    else:
        print(form.errors)
        return form.errors


@playlist_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_playlist(id):
    """
    Deletes a playlist
    """

    target_playlist = Playlist.query.get(id)

    owner_id = target_playlist.owner_id

    if current_user.id != owner_id:
        response = make_response({ "errors": { "message": "forbidden"} }, 401)
        return response

    old_url = target_playlist.cover_img

    db.session.delete(target_playlist)
    db.session.commit()

    remove_file_from_s3(old_url, filetype='image')
    return {"message": "Successfully Deleted"}



@playlist_routes.route('/<int:id>/add-song', methods=['POST'])
@login_required
def add_song_to_playlist(id):

    playlist = Playlist.query.get(id)

    song_id = request

    print("REQUEST FOR ADD SONG: ", song_id)

    return {"message": "still testing"}
