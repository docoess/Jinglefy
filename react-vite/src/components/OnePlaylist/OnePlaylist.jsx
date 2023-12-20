import UpdatePlaylist from "./OptionButtons/UpdatePlaylist";
import DeletePlaylist from "./OptionButtons/DeletePlaylist"
import { onePlaylistThunk } from "../../redux/playlist";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SongCard from "../SongCard/SongCard";

export default function OnePlaylist() {
    const dispatch = useDispatch();
    let { playlistId } = useParams();
    const playlist = useSelector((state) => state.playlists[playlistId]);
    const currentUser = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState(null)

    const ownerOptions = () => {
        if (currentUser != null) {
            if(playlist.owner_id == currentUser.id) {
                return <div>
                    <UpdatePlaylist />
                    <DeletePlaylist />
                </div>
            }
        }
    }


    useEffect(() => {
        const getPlaylists = async () => {
           setErrors(await dispatch(onePlaylistThunk(playlistId)))
        }

        getPlaylists()
    }, [dispatch, playlistId])

    return playlist && (
        <div>
            <p>Title: {playlist.title}</p>
            <img src={playlist.cover_img}/>
            <p>Number of Songs: {playlist.songs ? playlist.songs.length: null}</p>
            {ownerOptions()}
            {
                playlist.songs?.map(song => (
                    <SongCard song={song} key={song.id} source={"playlist"} playlistId={playlistId} />
                ))
            }
        </div>
    )
}
