import { allPlaylistsThunk } from "../../redux/playlist";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";

//todo: add create playlist button

export default function AllPlaylists() {
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

    if(currentUser == null){
        return (
            <h1>Please sign in to view playlists!</h1>
        )
    }

    return (
        <>
            <h1 className="">Browse all of your Jingle Playlists!</h1>
            <div className="">
                {errors && <p>{errors}</p>}
                {allPlaylists.map(playlist => (
                    <PlaylistCard playlist={playlist} key={playlist.id}/>
                ))}
            </div>
        </>
    )
}
