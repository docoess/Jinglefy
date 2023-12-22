import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeletePlaylistModal from "../DeletePlaylistModal";
import { useParams } from "react-router-dom";

export default function DeleteAlbum ()  {
  const {playlistId} = useParams()

  return (
    <>
      <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeletePlaylistModal playlistId={playlistId} />} className={"fake-button"} />
    </>
  )
}
