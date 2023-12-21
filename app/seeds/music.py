from app.models import db, User, Album, Song, Playlist, playlist_songs, likes, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from alembic import op

def seed_albums():
  album_1 = Album(
    title='Our Very First Album',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/525044ffc1224575a30704999b64b6e7.png',
    desc='The debut album from new artist marnie!',
    artist_id=2,
    num_songs=2,
    release_date=date.today()
  )

  album_2 = Album(
    title='Our Very Second Album',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/2feb0d5672ef45bbb383d617a7bb026b.jpg',
    desc='The sophmore album from top artist marnie!',
    artist_id=2,
    num_songs=2,
    release_date=date.today()
  )

  album_3 = Album(
    title='Trilobytes and Megabytes',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/70c1dc9c0fc2425b88d111d79d751ea5.png',
    desc='The newest album from conceptual artist bobbie. A tale of dinosaurs and computers.',
    artist_id=3,
    num_songs=6,
    release_date=date.today()
  )

  db.session.add(album_1)
  db.session.add(album_2)
  db.session.add(album_3)
  db.session.commit()

def seed_songs():
  users = User.query.all()

  song_1 = Song(
    title='Sunrise Over Miami',
    album_id=1,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/0f51463153924849a20a40be10b0aff2.mp3',
    song_likes=[users[0], users[1]]
  )

  song_2 = Song(
    title='Sunset Over Prague',
    album_id=1,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/1be9d2a377b24c649c18169fa9da5489.mp3',
    song_likes=[users[2]]
  )

  song_3 = Song(
    title='Bacon And Eggs',
    album_id=2,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/5b8ce15b7d5049cda136429b4b8e7e85.mp3',
    song_likes=[users[0], users[1], users[2]]
  )

  song_4 = Song(
    title='Surf And Turf',
    album_id=2,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/8f51d0ef42fd4ac8922445e63bba702a.mp3'
  )

  song_5 = Song(
    title='T-Rex Ice Cubes',
    album_id=3,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/f913ec49ff9c4a98bddb9d919fddcfd1.mp3',
    song_likes=[users[1], users[2]]
  )

  song_6 = Song(
    title='Orange Juice And Napkins',
    album_id=3,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/7cf435d9835541a9be06ad277ac14d3b.mp3',
    song_likes=[users[0], users[1], users[2]]
  )

  song_7 = Song(
    title='Canned Air',
    album_id=3,
    track_num=3,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/aff9664b152e4afaa5a10c519364bc47.mp3'
  )

  song_8 = Song(
    title='Ethernet Sleepover',
    album_id=3,
    track_num=4,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/2e3e8b46af6440a59e64956705800e16.mp3'
  )

  song_9 = Song(
    title='Moonrise On Jupiter',
    album_id=3,
    track_num=5,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/b92a6a08d6094da38e5195780fa625f7.mp3',
    song_likes=[users[0], users[1]]
  )

  song_10 = Song(
    title='Candlelit Freefall',
    album_id=3,
    track_num=6,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/a1e2c44e058443e688fb85367f935195.mp3',
    song_likes=[users[0], users[2]]
  )

  db.session.add(song_1)
  db.session.add(song_2)
  db.session.add(song_3)
  db.session.add(song_4)
  db.session.add(song_5)
  db.session.add(song_6)
  db.session.add(song_7)
  db.session.add(song_8)
  db.session.add(song_9)
  db.session.add(song_10)
  db.session.commit()

def seed_playlists():
  songs = Song.query.all()

  playlist_1 = Playlist(
    title='My Jams',
    owner_id=3,
    cover_img='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/b675637d431348a8b743c7aa38930388.jpg',
    playlist_songs=[songs[2], songs[3], songs[6]]
  )

  playlist_2 = Playlist(
    title='Demo User Playlist',
    owner_id=1,
    cover_img='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/2feb0d5672ef45bbb383d617a7bb026b.jpg',
    playlist_songs=[songs[1], songs[4], songs[5], songs[6], songs[7]]
  )

  db.session.add(playlist_1)
  db.session.add(playlist_2)
  db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
