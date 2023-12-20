import { useNavigate, useParams } from "react-router-dom";
import { deleteAlbumThunk } from "../../../redux/album";
import { useDispatch } from "react-redux";

export default function DeleteAlbum ()  { 
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { albumId } = useParams();

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