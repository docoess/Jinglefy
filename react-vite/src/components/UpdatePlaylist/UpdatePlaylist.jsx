import { useEffect, useState } from "react";
import { onePlaylistThunk, updatePlaylistThunk } from "../../redux/playlist";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from 'react-router-dom';


export default function UpdatePlaylist() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();

    const playlist = useSelector(state => state.playlists[playlistId])

    const [title, setTitle] = useState(playlist?.title)
    const [cover, setCover] = useState(playlist?.cover_image)
    const [imageLoading, setImageLoading] = useState(false)
    // const [errors, setErrors] = useState({})


    useEffect(() => { 

        dispatch(onePlaylistThunk(playlistId))

    },[dispatch,playlistId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("cover_image", cover);
        formData.append("title", title)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let data = await dispatch(updatePlaylistThunk(playlistId,formData))
        
        console.log("UPLOAD COMPLETE",data)
    }

    return (

        <>
            <h1>Update a new playlist!</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data">
                <label>
                    What is the title for your playlist?
                    <input
                    type="text"
                    value={title}
                    placeholder="Playlist Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Upload a cover image for your playlist!
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                </label>
                <button type="submit">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </>
    )
}