import { onePlaylistThunk, updatePlaylistThunk } from "../../redux/playlist";
import { useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function UpdatePlaylist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const playlist = useSelector(state => state.playlists[playlistId])
    const [title, setTitle] = useState(playlist?.title)
    const [cover, setCover] = useState(playlist?.cover_image)
    const [imageLoading, setImageLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = {}
        if (title.length < 3) {
            errors.title = 'Title is required and must be at least 3 characters'
        }
        setValidationErrors(errors)
    },[title])

    useEffect(() => {

        dispatch(onePlaylistThunk(playlistId))

    },[dispatch,playlistId])




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
        await dispatch(updatePlaylistThunk(playlistId,formData))
        navigate(`/playlists/${playlistId}`)
    }

    return (

        <div className="new-playlist-container">
            <h1 className="new-playlist-header">Update a new playlist!</h1>
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
                    <span className="error">{hasSubmitted && validationErrors.title}</span>
                </label>
                <label className="new-playlist-input">
                <span>Upload a cover image for your playlist!</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                    <span className="error">{hasSubmitted && validationErrors.cover}</span>
                </label>
                <button type="submit" className="new-playlist-submit-button">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}
