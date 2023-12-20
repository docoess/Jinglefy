import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { allAlbumsThunk, deleteAlbumThunk } from "../../../redux/album";

export default function DeleteAlbum ()  { 
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumId])

    const handleSubmit = async () => {
        await dispatch(deleteAlbumThunk(albumId))
        
        navigate(`/albums`)
    }
    


  return (
    <>
      <button onClick={handleSubmit} >Delete</button>
    </>
  )
}