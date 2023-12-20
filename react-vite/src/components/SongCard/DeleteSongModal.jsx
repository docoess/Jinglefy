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
        <div>
            <h1>Are you sure you want to delete this song?</h1>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={close}>No</button>
        </div>
    )
}
