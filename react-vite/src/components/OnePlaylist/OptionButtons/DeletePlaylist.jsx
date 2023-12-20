import { deletePlaylistThunk } from "../../../redux/playlist";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

//todo: still needs work
export default function DeleteAlbum ()  {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {playlistId} = useParams()

  const handleSubmit = async () => {
      await dispatch(deletePlaylistThunk(playlistId))
      navigate('/playlists')
  }

  return (
    <>
      <button onClick={handleSubmit} >Delete</button>
    </>
  )
}
