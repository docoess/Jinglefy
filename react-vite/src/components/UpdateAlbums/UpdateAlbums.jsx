import { useEffect, useState } from "react";
import { oneAlbumThunk, updateALbumThunk } from "../../redux/album";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from 'react-router-dom';

//todo: Does not update when you submit without a new image

export default function NewAlbum() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums[albumId])
    const [title, setTitle] = useState(album?.title)
    const [cover, setCover] = useState(album?.cover_image)
    const [desc, setDesc] = useState(album?.desc)
    const [imageLoading, setImageLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        dispatch(oneAlbumThunk(albumId))

    },[dispatch,albumId])

    useEffect(() => {
        const errors = {}

        if (title.length < 3) {
            errors.title = 'Title is required and must be at least 3 characters'
        }

        if (desc.length < 10) {
            errors.desc = 'Description needs to be at least 10 characters'
        }

        setValidationErrors(errors)
    }, [title, desc])

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
        console.log('COVER', cover)
        await dispatch(updateALbumThunk(albumId,formData))
        setHasSubmitted(false)
        navigate(`/albums/${albumId}`)
    }

    return (

        <div className="new-album-container">
            <h1 className="new-album-header">Update your album!</h1>
            <form
            className="new-album-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
                <label className="new-album-input">
                    What is the title for your album?
                    <input
                    type="text"
                    value={title}
                    placeholder="Album Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                    {hasSubmitted && validationErrors.title && (
                        <span className="error">{validationErrors.title}</span>
                    )}
                </label>
                <label className="new-album-input">
                    Give a brief description of your Album
                    <textarea
                    className="new-album-desc"
                    type="text"
                    value={desc}
                    placeholder="Album Description"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    />
                    {hasSubmitted && validationErrors.desc && (
                        <span className="error">{validationErrors.desc}</span>
                    )}
                </label>
                <label className="new-album-input">
                    Upload a cover image for your album!
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                </label>
                <button className="new-album-submit-button" type="submit">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}
