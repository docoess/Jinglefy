import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAlbumThunk } from "../../../redux/album";
import { useDispatch } from "react-redux";
import DeleteAlbumModal from "../DeleteAlbumModal";

export default function DeleteAlbum ()  {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { albumId } = useParams();


  return (
    <>
      <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteAlbumModal albumId={albumId}  />} />
    </>
  )
}
