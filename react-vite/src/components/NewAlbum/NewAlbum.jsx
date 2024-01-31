import { postAlbumThunk } from "../../redux/album";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './NewAlbum.css';


export default function NewAlbum() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState('')
    const [desc, setDesc] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        const errors = {}

        if (title.length < 3) {
            errors.title = 'Title is required and must be at least 3 characters'
        }

        if (desc.length < 10) {
            errors.desc = 'Description needs to be at least 10 characters'
        }

        if (!cover || cover?.length < 1) {
            errors.cover = 'An image file is required'
        }

        setValidationErrors(errors)
    }, [title, desc, cover])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("cover_image", cover);
        formData.append("title", title)
        formData.append("description", desc)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let album = await dispatch(postAlbumThunk(formData))
        setHasSubmitted(false)
        navigate(`/albums/${album.id}`)
    }

    return (
        <div className="new-album-container">
            <h1 className="new-album-header">Create a new album!</h1>
            <form
            className="new-album-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
                <label className="new-album-input">
                   <span>What is the title for your album?</span>
                    <input
                    type="text"
                    value={title}
                    placeholder="Album Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={50}
                    />
                    <span className="error">{hasSubmitted && validationErrors.title}</span>
                </label>
                <label className="new-album-input">
                   <span>Give a description of your Album!</span>
                    <textarea
                    className="new-album-desc"
                    type="text"
                    value={desc}
                    placeholder="Album Description"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    maxLength={500}
                    />
                    <span className="error">{hasSubmitted && validationErrors.desc}</span>
                </label>
                <label className="new-album-input">
                   <span>Upload a cover image for your album!</span>
                    <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                    <span className="error">{hasSubmitted && validationErrors.cover}</span>
                </label>
                <button className="new-album-submit-button" type="submit">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}
