import { deletePlaylistThunk } from "../../../redux/playlist";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeletePlaylistModal from "../DeletePlaylistModal";

//todo: still needs work
export default function DeleteAlbum ()  {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {playlistId} = useParams()

  return (
    <>
      <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeletePlaylistModal playlistId={playlistId} />} className={"fake-button"} />
    </>
  )
}
