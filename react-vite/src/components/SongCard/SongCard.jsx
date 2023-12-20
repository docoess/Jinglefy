import { useDispatch, useSelector } from "react-redux";
import { oneAlbumThunk, deleteSongThunk } from "../../redux/album";
import { useEffect } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddToPlaylistModal from "./AddRemovePlaylistModal/AddToPlaylistModal";
import DeleteSongModal from "./DeleteSongModal";

export default function SongCard({ song }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)



  useEffect(() => {
    const getAlbum = async () => {
      await dispatch(oneAlbumThunk(song.album_id))
    }

    getAlbum()
  }, [dispatch, song.album_id])


  const handleDeleteButton = async (e) => {
    e.preventDefault()

    await dispatch(deleteSongThunk(song.id));
    console.log('HANDLE DELETE', song.id)
  }

  console.log("SONG IN SONGCARD: ", song)
  return (
    <div>
      <p><span>{song.track_num}. </span><span>{song.title}</span><span><audio controls src={song.song_link}>fallback placeholder</audio></span></p>
      <p><button>Like</button> <OpenModalMenuItem itemText={'Add to playlist'} modalComponent={<AddToPlaylistModal song={song} />} />

        <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteSongModal />} />

       </p>
    </div>
  )
}
/*

  Get songs from store

  Render related song data



*/
