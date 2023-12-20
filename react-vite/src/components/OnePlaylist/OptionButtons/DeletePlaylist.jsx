import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { deletePlaylistThunk } from "../../../redux/album";

//todo: still needs work
export default function DeleteAlbum ()  { 
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const {playlistId} = useParams()
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumId])

    const handleSubmit = async () => {
        await dispatch(deletePlaylistThunk(playlistId))
        // navigate('/albums')
    }
    


  return (
    <>
      <button onClick={handleSubmit} >Delete</button>
    </>
  )
}