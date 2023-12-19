import { useDispatch, useSelector } from "react-redux"
import { allAlbumsThunk, deleteSongThunk } from "../../redux/album"
import { useEffect } from "react"

export default function SongCard({ song }) {
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allAlbumsThunk())
  }, [dispatch])

  const handleDeleteButton = async (e) => {
    e.preventDefault()

    await dispatch(deleteSongThunk(song?.id));
    console.log('HANDLE DELETE', song.id)
  }

  return (
    <div>
      <p><span>{song.track_num}. </span><span>{song.title}</span><span><audio controls src={song.song_link}>fallback placeholder</audio></span></p>
      <p><button>Like</button> <button>Add to Playlist</button> <button onClick={handleDeleteButton}>Delete</button></p>
    </div>
  )
}
/*

  Get songs from store

  Render related song data



*/
