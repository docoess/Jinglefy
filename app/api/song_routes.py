from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.models import Album, db, Song
from ..forms import SongForm, SongUpdateForm

song_routes = Blueprint('song', __name__)

@song_routes.route('/')
def get_all_songs():
  """
  Return a list of all songs
  """

  songs = [song.to_dict() for song in Song.query.all()]
  return songs

@song_routes.route('/<int:id>')
def get_song_by_id(id):
  """
  Returns a specific song specified by id
  """

  song = Song.query.get(id)

  return song.to_dict()

@song_routes.route('/new', methods=['POST'])
@login_required
def create_song():
  """
  Creates a new song
  """

  form = SongForm()

  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    song_file = form.data["song_file"]
    song_file.filename = get_unique_filename(song_file.filename)
    upload = upload_file_to_s3(song_file, filetype='audio')
    print('UPLOAD FROM CREATE SONG ROUTE', upload)

    if "url" not in upload:
      return upload

    album = Album.query.get(form.data['album_id'])

    new_song = Song(
      title = form.data['title'],
      song_link = upload["url"],
      album_id = form.data['album_id'],
      track_num = album.num_songs + 1
    )

    db.session.add(new_song)
    db.session.commit()
    return new_song.to_dict()
  else:
    print(form.errors)
    return form.errors

@song_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_song(id):
  """
  Update a song by id
  """
  song = Song.query.get(id)

  owner_id = song.album.artist_id

  if current_user.id != owner_id:
    response = make_response({ "errors": { "message": "forbidden"} }, 401)
    return response

  else:
    form = SongUpdateForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
      if form.data['title']:
        song.title = form.data['title']
      if form.data['song_file']:
        old_url = song.song_link
        song_file = form.data["song_file"]
        song_file.filename = get_unique_filename(song_file.filename)
        upload = upload_file_to_s3(song_file, filetype='audio')

        if "url" not in upload:
          return upload

        remove_file_from_s3(old_url, filetype='audio')

        song.song_link = upload['url']

      db.session.commit()
      return song.to_dict()

    else:
      print(form.errors)
      return form.errors

@song_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_song(id):
  """
  Deletes a song by id
  """
  song = Song.query.get(id)

  owner_id = song.album.artist_id

  if current_user.id != owner_id:
    response = make_response({ "errors": { "message": "forbidden"} }, 401)
    return response

  else:
    old_url = song.song_link

    db.session.delete(song)
    db.session.commit()

    remove_file_from_s3(old_url, filetype='audio')

    return {"message": "Successfully Deleted"}
