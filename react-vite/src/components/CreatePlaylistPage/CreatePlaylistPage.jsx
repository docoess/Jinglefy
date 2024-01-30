import { postPlaylistThunk } from "../../redux/playlist";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./CreatePlaylistPage.css";

export default function CreatePlaylistPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [hasSubmitted,setHasSubmitted] = useState(false)
    const [validationErrors,setValidationErrors] = useState({})

    useEffect(() => {
        const errors = {}
        if (title.length < 3) {
            errors.title = 'Title is required and must be at least 3 characters'
        }
        if (!cover || cover?.length < 1) {
            errors.cover = 'An image file is required'
        }
        setValidationErrors(errors)
    },[title,cover])



    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("cover_image", cover);
        formData.append("title", title)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let data = await dispatch(postPlaylistThunk(formData))
        // console.log("UPLOAD COMPLETE", data)
        navigate(`/playlists/${data.id}`)
    }

    return (
        <div className="new-playlist-container">
            <h1 className="new-playlist-header">Create a new playlist!</h1>
            <form
            className="new-playlist-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
                <label className="new-playlist-input">
                   <span>What is the title for your playlist?</span>
                    <input
                    type="text"
                    value={title}
                    placeholder="Playlist Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={50}
                    />
                     {hasSubmitted && validationErrors.title && (
                        <span className="error">{validationErrors.title}</span>
                    )}
                </label>
                <label className="new-playlist-input">
                   <span>Upload a cover image for your playlist!</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                      {hasSubmitted && validationErrors.cover && (
                        <span className="error">{validationErrors.cover}</span>
                    )}
                </label>

                <button className="new-playlist-submit-button" type="submit">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}
