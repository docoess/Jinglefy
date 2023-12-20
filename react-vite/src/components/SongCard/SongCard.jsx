import { useDispatch, useSelector } from "react-redux";
import { oneAlbumThunk, deleteSongThunk } from "../../redux/album";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddToPlaylistModal from "./AddRemovePlaylistModal/AddToPlaylistModal";
import DeleteSongModal from "./DeleteSongModal";
import { useNavigate } from "react-router-dom";
import { deleteSongFromPlaylistThunk } from "../../redux/playlist";

export default function SongCard({ song, source, playlistId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const likedSongs = useSelector(state => state.likes)
  const [liked, setLiked] = useState(false)
  const [numLikes, setNumLikes] = useState(song.likes)

  console.log('LIKED SONGS', likedSongs)


  const addLike = async () => {
    setLiked(!liked);
    setNumLikes(numLikes + 1);
  }

  const removeLike = async () => {
    setLiked(!liked)
    setNumLikes(numLikes - 1);
  }
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getAlbum = async () => {
      await dispatch(oneAlbumThunk(song.album_id))
    }

    getAlbum()
  }, [dispatch, song.album_id])

  if (!Object.keys(likedSongs).length) {
    return null
  }

  if (likedSongs.includes(song.id) && !liked) {
    setLiked(true)
  }
  const removeFromPlaylist = async () => {
   const response = await dispatch(deleteSongFromPlaylistThunk(playlistId, song.id))
   if(!response) {
    setDeleted(true)
   }
  }

// todo: owner auth check for delete button
  const checkSource = () => {
    if (source == 'album') {
      return (
        <>
        <OpenModalMenuItem itemText={'Add to playlist'} modalComponent={<AddToPlaylistModal song={song} />} />
        <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteSongModal />} />
        </>
      )
    }

    if (source == 'playlist') {
      return (
        <>
        <button onClick={removeFromPlaylist}>Remove from playlist</button>
        </>
      )
    }
  }


  console.log("deleted value: ",deleted)
  return !deleted &&(
    <div>
      <p>{numLikes} likes</p>
      <p><span>{song.track_num}. </span><span>{song.title}</span><span><audio controls src={song.song_link}>fallback placeholder</audio></span></p>
      <p>
        {
          liked ?
            <span onClick={removeLike}>
              LIKED
            </span> :
            <span onClick={addLike}>
              UNLIKED
            </span>

        }
      </p>
      {/* <button>Like</button> <OpenModalMenuItem itemText={'Add to playlist'} modalComponent={<AddToPlaylistModal song={song} />} />

        <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteSongModal />} /> */}
      {checkSource()}
    </div>
  )
}
/*

  Get songs from store

  Render related song data



*/
