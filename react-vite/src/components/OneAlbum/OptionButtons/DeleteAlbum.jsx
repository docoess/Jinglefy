import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
// import { deleteAlbumThunk } from "../../../redux/album";

export default function DeleteAlbum ()  { 
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumId])

//todo: add delete functionality (just a button right now)
    const handleSubmit = () => {
      if (user.id == album.artist_id) {  
        // dispatch(deleteAlbumThunk(albumId))
      }
    }
    


  return (
    <>
      <button onClick={handleSubmit} >Delete</button>
    </>
  )
}