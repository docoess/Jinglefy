import { useDispatch, useSelector } from "react-redux";
import { oneAlbumThunk } from "../../redux/album";
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
  const [deleted, setDeleted] = useState(false);

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

  useEffect(() => {
    const getAlbum = async () => {
      await dispatch(oneAlbumThunk(song.album_id))
    }

    getAlbum()
  }, [dispatch, song.album_id])

  console.log("deleted value: ",deleted)
  return !deleted &&(
    <div>
      <p><span>{song.track_num}. </span><span>{song.title}</span><span><audio controls src={song.song_link}>fallback placeholder</audio></span></p>
      <button>Like</button> 
      {checkSource()}
    </div>
  )
}
/*

  Get songs from store

  Render related song data



*/
