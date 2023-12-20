import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { onePlaylistThunk } from "../../redux/playlist";
import { useParams } from "react-router-dom";
import SongCard from "../SongCard/SongCard";
import UpdatePlaylist from "./OptionButtons/UpdatePlaylist"

const formattedDate = (date) => {
    const d = new Date(date);
    const cd = (num) => num.toString().padStart(2, 0);
    return (
        d.getFullYear() +
        "-" +
        cd(d.getMonth() + 1) +
        "-" +
        cd(d.getDate())
    );
};

export default function OnePlaylist() {
    const dispatch = useDispatch();

    let { playlistId } = useParams()
    const playlist = useSelector((state) => state.playlists[playlistId]);
    const currentUser = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState(null)

    const ownerOptions = () => {
        if (currentUser != null) {
            if(playlist.owner_id == currentUser.id) {
                return <div>
                    <UpdatePlaylist />
                    {/* <DeletePlaylist /> */}
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
    console.log(playlist)
    return playlist && (
        <div>
            <p>Title: {playlist.title}</p>
            <img src={playlist.cover_image}/>
            <p>Number of Songs: {playlist.songs ? playlist.songs.length: null}</p>
            {ownerOptions()}
            {
                playlist.songs?.map(song => (
                    <SongCard song={song} key={song.id} />
                ))
            }
        </div>
    )
}