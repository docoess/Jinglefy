import { useModal } from "../../context/Modal"


export default function DeleteSongModal() {
    const {history} = useHistory()
// todo: ASK about why { closeModal } = useModal(); throws an error 
    // const modalInvoked = useModal();
    // let closeModal = modalInvoked.closeModal

    let close = function(){
        history.push('/albums')
    }

    return (
        <div>
            <h1>Are you sure you want to delete this song?</h1>
            <button>Yes</button>
            <button onClick={close}>No</button>
        </div>
    )
}
