import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSongThunk, oneAlbumThunk } from "../../redux/album";

export default function DeleteSongModal({song}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();



    const handleConfirm = async () => {
        const albumID = song.album_id
       await dispatch(deleteSongThunk(song.id))
       await dispatch(oneAlbumThunk(albumID))

       closeModal()
    }

    let close = function(){
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h1>Are you sure you want to delete this song?</h1>
            <button onClick={handleConfirm} className="delete-modal-button">Yes</button>
            <button onClick={close }className="delete-modal-button">No</button>
        </div>
    )
}
