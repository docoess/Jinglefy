import { useState } from "react"
import { postPlaylistThunk } from "../../redux/playlist"
import { useDispatch } from "react-redux"



//todo: Error handling 
export default function CreatePlaylistPage() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("cover_image", cover);
        formData.append("title", title)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let data = await dispatch(postPlaylistThunk(formData))
        console.log("UPLOAD COMPLETE",data)
    }

    return (
        <div className="new-playlist-container">
            <h1 className="new-playlist-header">Create a new playlist!</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="new-playlist-form">
                <label className="new-playlist-input">
                   <span>What is the title for your playlist?</span>
                    <input
                    type="text"
                    value={title}
                    placeholder="Playlist Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <label className="new-playlist-input">
                   <span>Upload a cover image for your playlist!</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                </label>
                <button type="submit" className="new-playlist-submit-button">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}