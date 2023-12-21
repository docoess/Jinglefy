import { useEffect, useState } from "react";
import { onePlaylistThunk, updatePlaylistThunk } from "../../redux/playlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from 'react-router-dom';


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
        let data = await dispatch(updatePlaylistThunk(playlistId,formData))

        console.log("UPLOAD COMPLETE",data)
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
                    What is the title for your playlist?
                    <input
                    type="text"
                    value={title}
                    placeholder="Playlist Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                        {hasSubmitted && validationErrors.title && (
                        <span className="error">{validationErrors.title}</span>
                    )}
                </label>
                <label className="new-playlist-input">
                    Upload a cover image for your playlist!
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                       {hasSubmitted && validationErrors.cover && (
                        <span className="error">{validationErrors.cover}</span>
                    )}
                </label>
                <button type="submit" className="new-playlist-submit-button">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}
