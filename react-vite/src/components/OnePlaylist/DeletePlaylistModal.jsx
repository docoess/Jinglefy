import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistThunk, allPlaylistsThunk } from "../../redux/playlist";
import { useNavigate } from "react-router-dom";

export default function DeletePlaylistModal( {playlistId} ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleConfirm = async () => {
    await dispatch(deletePlaylistThunk(playlistId))
    await dispatch(allPlaylistsThunk());
    closeModal()
    navigate('/playlists')
  }

  const close = () => {
    closeModal()
  }

  return (
    <div>
      <h1>Are you sure you want to delete this playlist?</h1>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={close}>No</button>
    </div>
  )
}
