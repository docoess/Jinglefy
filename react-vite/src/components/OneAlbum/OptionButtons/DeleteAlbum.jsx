import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteAlbumModal from "../DeleteAlbumModal";
import { useParams } from "react-router-dom";
import '../../SongCard/SongCard.css';

export default function DeleteAlbum ()  {
    const { albumId } = useParams();

  return (
    <>
      <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteAlbumModal albumId={albumId} />} className={"fake-button"} />
    </>
  )
}
