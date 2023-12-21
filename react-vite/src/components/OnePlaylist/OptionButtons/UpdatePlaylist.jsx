import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UpdateAlbum ()  { 
    const navigate = useNavigate();
    const { playlistId } = useParams();

    const handleSubmit = () => {
        navigate(`/playlists/${playlistId}/update`)
      }
      
  return (
    <>
      <button className="fake-button" onClick={handleSubmit} >Update</button>
    </>
  )
}