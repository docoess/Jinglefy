import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { updatePlaylistThunk } from "../../../redux/playlist";
import { useNavigate } from "react-router-dom";

export default function UpdateAlbum ()  { 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const user = useSelector(state => state.session.user)
    const playlist = useSelector(state => state.playlists[playlistId])

    const handleSubmit = () => {
        navigate(`/playlists/${playlistId}/update`)
      }
      
    

  return (
    <>
      <button onClick={handleSubmit} >Update</button>
    </>
  )
}