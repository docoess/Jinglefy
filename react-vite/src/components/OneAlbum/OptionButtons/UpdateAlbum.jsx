import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
// import { updateAlbumThunk } from "../../../redux/album";

export default function UpdateAlbum ()  { 
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumId])

//todo: add update functionality (just a button right now)
    const handleSubmit = () => {
      if (user.id == album.artist_id) {  
        // dispatch(UpdateAlbumThunk(albumId))
      }
    }
    


  return (
    <>
      <button onClick={handleSubmit} >Update</button>
    </>
  )
}