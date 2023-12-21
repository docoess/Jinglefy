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

  album_4 = Album(
    title='Demo User Album',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/5722e220a7124b0cb2a61a11eebad1cb.jpg',
    desc='A standard demo user album',
    artist_id=1,
    num_songs=4,
    release_date=date.today()
  )

  album_5 = Album(
    title='Quixotic Reporter',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/59a22ba843f841869201ad733e1412e2.png',
    desc='Meme tomorrow gratefully woot harmful utterly yuck upper mortally because since love.',
    artist_id=2,
    num_songs=1,
    release_date=date.today()
  )

  album_6 = Album(
    title='Finished Employer',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/009073b234dd4a389cee51e68cb75983.jpg',
    desc='Organic instead throughout garbage upbeat microwave than naughty prepare generation uh-huh itchy.',
    artist_id=3,
    num_songs=3,
    release_date=date.today()
  )

  album_7 = Album(
    title='Previous Chick',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/49dc370221de4e2c9253aaf31b41b6b6.jpg',
    desc='Root innocently yowza while fondly right truly jump upside-down hm brighten gosh dungeon messy knuckle on naive angrily coral stylish unusual than interject hmph oh defrock inasmuch arid elaborate yummy prey fumbling yuck gorilla if humble knavishly fortunately rarely.',
    artist_id=3,
    num_songs=2,
    release_date=date.today()
  )

  album_8 = Album(
    title='Dimpled Ruckus',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/17af0565139d49fea41543569904cfd8.png',
    desc='Phew how superior justly punctuation campaign shocked aboard hmph church cherish how kindheartedly ouch what phooey never through daintily needy yell even versus tarragon tempting rigidly analgesia uh-huh whoa huzzah healthily noisily aside ruck loftily anxiously psst weird advanced throughout braai dreamily.',
    artist_id=3,
    num_songs=2,
    release_date=date.today()
  )

  album_9 = Album(
    title='Passionate Gall-bladder',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/b04d3a8319554cc794ea0723a7417463.png',
    desc='Verbally uniform underestimation iron aboard as bribery from for pro provided supposing however because destination hidden monkey against whoa shrilly affront through shun where geez retouch ick meanwhile minor-league but dissonance graft live monthly whether evenly.',
    artist_id=2,
    num_songs=10,
    release_date=date.today()
  )

  album_10 = Album(
    title='Brilliant Ex-husband',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/50cd3c1dd8164bfb98babc3341789ffc.png',
    desc='Optimal aha unlike bid enter deliberately bravely bunt streak behind longingly inasmuch as easily and pish snow perky boastfully.',
    artist_id=1,
    num_songs=3,
    release_date=date.today()
  )

  album_11 = Album(
    title='Tender Trustee',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/54cab78a37534b74b27243bc532c6a38.jpg',
    desc='Why till mortally hm whoop uh-huh jam ew who finally leave bob past shunt scarcely greedily deliberately recoil beside feminine ew oh shin slimy yearningly behind ha scallion huzzah lined yippee.',
    artist_id=2,
    num_songs=3,
    release_date=date.today()
  )

  album_12 = Album(
    title='Truthful Newsletter',
    cover_image='https://week-20-awsbucket-dr.s3.us-west-2.amazonaws.com/7d5efb1ffc2047798b1694d4e045551e.jpg',
    desc='Ah party thrifty aside salt meanwhile gadzooks where awkward indeed questioningly drat while ack synergy fooey owlishly times coral cloudy mid acidly sans swoosh keep warm fooey curiously substance grunt oh unto polite boo until selfishly mysteriously that whether kooky.',
    artist_id=2,
    num_songs=3,
    release_date=date.today()
  )

  db.session.add(album_1)
  db.session.add(album_2)
  db.session.add(album_3)
  db.session.add(album_4)
  db.session.add(album_5)
  db.session.add(album_6)
  db.session.add(album_7)
  db.session.add(album_8)
  db.session.add(album_9)
  db.session.add(album_10)
  db.session.add(album_11)
  db.session.add(album_12)
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

  song_11 = Song(
    title='Impartial Vivacious',
    album_id=4,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/18712420899c438a96db7cfa03bf88a6.mp3',
  )

  song_12 = Song(
    title='Difficult Quizzical',
    album_id=4,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/74b226f6ca244710a5303772407bb601.mp3',
  )

  song_13 = Song(
    title='Aware Infinite',
    album_id=4,
    track_num=3,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/02f09a19bda644a78e08800d7f3c6f42.mp3',
  )

  song_14 = Song(
    title='Disgusting Disastrous',
    album_id=4,
    track_num=4,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/75f1cc4a1f0f47e59674235c6f2e5bc2.mp3',
  )

  song_15 = Song(
    title='Variable Glaring',
    album_id=5,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/0ba4cecee57b41998fa0e528fe46639e.mp3',
  )

  song_16 = Song(
    title='Physical Jittery',
    album_id=6,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/454a74c132104d2695f3d62419b01db2.mp3',
    song_likes=[users[0], users[1]]
  )

  song_17 = Song(
    title='Pastel Humiliating',
    album_id=6,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/afe037a2b1a64ca7a3840f9b1137c8d6.mp3',
  )

  song_18 = Song(
    title='Authorized Worn',
    album_id=6,
    track_num=3,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/39d4b5d8aa4842c787e85a5605464b2d.mp3',
  )

  song_19 = Song(
    title='Magnificent Charming',
    album_id=7,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/ea0644acceb34ee2acf8616cee38053d.mp3',
  )

  song_20 = Song(
    title='Unpleasant Dimpled',
    album_id=7,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/d99ecf8346b746ea9345baf189388a08.mp3',
  )

  song_21 = Song(
    title='Yawning Roasted',
    album_id=8,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/b0d35b0e7cf34f0996514b357348384c.mp3',
    song_likes=[users[0], users[1], users[2]]
  )

  song_22 = Song(
    title='Hateful Cold',
    album_id=8,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/45958e275bdb4ce6ba5f3c6420035a5e.mp3',
  )

  song_23 = Song(
    title='Advanced Speedy',
    album_id=9,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/514dad0a01214f368835a9f0bfbf1fa1.mp3',
  )

  song_24 = Song(
    title='Fluid Submissive',
    album_id=9,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/f7b17144e8b14e15ab14ce977852dc8c.mp3',
    song_likes=[users[1]]
  )

  song_25 = Song(
    title='Slimy Separate',
    album_id=9,
    track_num=3,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/f19d1a09303a4c19bbee17634dec0130.mp3',
  )

  song_26 = Song(
    title='Single Long',
    album_id=9,
    track_num=4,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/9b83ebd5dee347879efc5bfef53bce21.mp3',
  )

  song_27 = Song(
    title='Whopping Dutiful',
    album_id=9,
    track_num=5,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/f3c1f1c07b3b4105b4265ad6f67cd55c.mp3',
  )

  song_28 = Song(
    title='Glorious Dead',
    album_id=9,
    track_num=6,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/04c0a2d9618b4188b7c6c62a317a1bb0.mp3',
  )

  song_29 = Song(
    title='Kooky Tame',
    album_id=9,
    track_num=7,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/ff02c03e287e4fc78deb4164a5691fef.mp3',
  )

  song_30 = Song(
    title='Far-flung Deep',
    album_id=9,
    track_num=8,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/dc25e6b4f45e45d8a92f3508b6de1d9c.mp3',
    song_likes=[users[0], users[2]]
  )

  song_31 = Song(
    title='Next Gracious',
    album_id=9,
    track_num=9,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/8edeb076a3ec4880aa5bce4f1744e8ec.mp3',
  )

  song_32 = Song(
    title='Loud Nonstop',
    album_id=9,
    track_num=10,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/327bae5ac8f443faad55432195f64116.mp3',
  )

  song_33 = Song(
    title='Rapid Dark',
    album_id=10,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/833bc5f83a2b45c9b898378527eb4e00.mp3',
    song_likes=[users[0], users[2]]
  )

  song_34 = Song(
    title='Perfumed Mellow',
    album_id=10,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/bcdce65e2de24971b78d6833998bf7d7.mp3',
  )

  song_35 = Song(
    title='Evergreen Elderly',
    album_id=10,
    track_num=3,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/787c6c86bd634d038cb16eecfbcebaeb.mp3',
  )

  song_36 = Song(
    title='Active Intent',
    album_id=11,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/b977153ba27d464983fc00d9962604eb.mp3',
  )

  song_37 = Song(
    title='Rude Metallic',
    album_id=11,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/3ff75ae7911b434cbc2c595f532a4082.mp3',
    song_likes=[users[0], users[2]]
  )

  song_38 = Song(
    title='Concerned Weak',
    album_id=11,
    track_num=3,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/e29d4fe3189546b9b78cf5d136ee81ef.mp3',
    song_likes=[users[0], users[1], users[2]]
  )

  song_39 = Song(
    title='Infantile Glum',
    album_id=12,
    track_num=1,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/9eb662e6d0354d43b2945b3ae5ed14c1.mp3',
  )

  song_40 = Song(
    title='Distorted Agonizing',
    album_id=12,
    track_num=2,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/838249a9f6f54e73ae67d6efb7b87a6e.mp3',
    song_likes=[users[0], users[1], users[2]]
  )

  song_41 = Song(
    title='Drafty Untried',
    album_id=12,
    track_num=3,
    song_link='https://week-20-awsbucket-audio-dr.s3.us-west-2.amazonaws.com/b4deb1f58d7049519053d0a244ba1d3e.mp3',
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
  db.session.add(song_11)
  db.session.add(song_12)
  db.session.add(song_13)
  db.session.add(song_14)
  db.session.add(song_15)
  db.session.add(song_16)
  db.session.add(song_17)
  db.session.add(song_18)
  db.session.add(song_19)
  db.session.add(song_20)
  db.session.add(song_21)
  db.session.add(song_22)
  db.session.add(song_23)
  db.session.add(song_24)
  db.session.add(song_25)
  db.session.add(song_26)
  db.session.add(song_27)
  db.session.add(song_28)
  db.session.add(song_29)
  db.session.add(song_30)
  db.session.add(song_31)
  db.session.add(song_32)
  db.session.add(song_33)
  db.session.add(song_34)
  db.session.add(song_35)
  db.session.add(song_36)
  db.session.add(song_37)
  db.session.add(song_38)
  db.session.add(song_39)
  db.session.add(song_40)
  db.session.add(song_41)
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
