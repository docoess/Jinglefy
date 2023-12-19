import { useState } from "react"
import { postAlbumThunk } from "../../redux/album"
import { useDispatch } from "react-redux"
import './NewAlbum.css'



export default function NewAlbum() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState(null)
    const [desc, setDesc] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("cover_image", cover);
        formData.append("title", title)
        formData.append("description", desc)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let data = await dispatch(postAlbumThunk(formData))
        console.log("UPLOAD COMPLETE",data)
    }

    return (
        <div className="new-album-container">
            <h1 className="new-album-header">Create a new album!</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="new-album-form">
                <label className="new-album-input">
                   <span>What is the title for your album?</span>
                    <input
                    type="text"
                    value={title}
                    placeholder="Album Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <label className="new-album-input">
                   <span>Give a description of your Album!</span> 
                    <textarea
                    type="text"
                    value={desc}
                    placeholder="Album Description"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    className="new-album-desc"
                    />
                </label>
                <label className="new-album-input">
                   <span>Upload a cover image for your album!</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                </label>
                <button type="submit" className="new-album-submit-button">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}
