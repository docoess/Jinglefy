import UpdatePlaylist from "./OptionButtons/UpdatePlaylist";
import DeletePlaylist from "./OptionButtons/DeletePlaylist"
import { onePlaylistThunk } from "../../redux/playlist";
import { useDispatch, useSelector } from "react-redux";
import { getLikesThunk } from "../../redux/likes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SongCard from "../SongCard/SongCard";
import "./OnePlaylist.css"

export default function OnePlaylist() {
    const dispatch = useDispatch();
    let { playlistId } = useParams();
    const playlist = useSelector((state) => state.playlists[playlistId]);
    const currentUser = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState(null)

    const ownerOptions = () => {
        if (currentUser != null) {
            if(playlist.owner_id == currentUser.id) {
                return <div className="playlist-details-button-container">
                    <UpdatePlaylist />
                    <DeletePlaylist />
                </div>
            }
        }
    }


    useEffect(() => {
        const getPlaylists = async () => {
           setErrors(await dispatch(onePlaylistThunk(playlistId)))
           await dispatch(getLikesThunk())
        }

        getPlaylists()
    }, [dispatch, playlistId])

    return playlist && (
        <div>
            <div className="playlist-details-container">
            <img className="playlist-details-cover-image" src={playlist.cover_img}/>
                <div className="playlist-details-text">
                    <h1 className="playlist-details-title">{playlist.title}</h1>
                    <p>Number of Songs: {playlist.songs ? playlist.songs.length: null}</p>
                    {ownerOptions()}
                </div>
            </div>
            <div className="songs-container">
                {
                    playlist.songs?.map(song => (
                        <SongCard song={song} key={song.id} source={"playlist"} playlistId={playlistId} />
                    ))
                }
            </div>
        </div>
    )
}
