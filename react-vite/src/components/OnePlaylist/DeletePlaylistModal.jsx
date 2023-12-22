import { deletePlaylistThunk, allPlaylistsThunk } from "../../redux/playlist";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../DeleteModal.css';

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
    <div className="delete-modal">
      <h1>Are you sure you want to delete this playlist?</h1>
      <button onClick={handleConfirm} className="delete-modal-button">Yes</button>
      <button onClick={close} className="delete-modal-button">No</button>
    </div>
  )
}
