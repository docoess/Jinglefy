import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
// import { updateAlbumThunk } from "../../../redux/album";
import { useNavigate } from "react-router-dom";

export default function UpdateAlbum ()  { 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumId])

//todo: add update functionality (just a button right now)
    const handleSubmit = () => {
      if (user.id == album.artist_id) {  
        // dispatch(UpdateAlbumThunk(albumId))
        navigate(`/albums/${albumId}/update`)
      }
      
    }
    


  return (
    <>
      <button onClick={handleSubmit} >Update</button>
    </>
  )
}