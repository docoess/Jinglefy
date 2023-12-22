import { allPlaylistsThunk } from "../../redux/playlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";
import './AllPlaylists.css';

export default function AllPlaylists() {
    const redirect = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null)
    const allPlaylists = useSelector(state => Object.values(state.playlists))
    const currentUser = useSelector(state => state.session.user)
    // console.log("allPlaylist: ",allPlaylists)

    useEffect(() => {
        const getPlaylists = async () => {
            setErrors(await dispatch(allPlaylistsThunk()))
        }

        getPlaylists()
    }, [dispatch])

    const onClick = () => {
        return redirect(`/playlists/new`)
     }
    if(currentUser == null){
        return (
            <h1>Please sign in to view playlists!</h1>
        )
    }

    return (
        <div className="all-playlists">
            <h4 className="all-playlists-header">Browse all of your Jingle Playlists!</h4>
            <div className="all-playlists-container">
                {errors && <p>{errors}</p>}
                {allPlaylists.map(playlist => (
                    <PlaylistCard playlist={playlist} key={playlist.id}/>
                ))}
            </div>
            <button onClick={onClick} className="all-playlists-new-playlist-button">Create a new Jingle Playlist!</button>
        </div>
    )
}
