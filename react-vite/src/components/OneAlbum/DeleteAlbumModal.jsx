import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAlbumThunk, allAlbumsThunk } from "../../redux/album";
import { useNavigate } from "react-router-dom";
import '../DeleteModal.css'

export default function DeleteAlbumModal( {albumId} ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleConfirm = async () => {
    await dispatch(deleteAlbumThunk(albumId))
    await dispatch(allAlbumsThunk());
    closeModal()
    navigate('/albums')
  }

  const close = () => {
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h1>Are you sure you want to delete this album?</h1>
      <button onClick={handleConfirm} className="delete-modal-button">Yes</button>
      <button onClick={close} className="delete-modal-button">No</button>
    </div>
  )
}
