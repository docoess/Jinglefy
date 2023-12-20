import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allPlaylistsThunk } from "../../redux/playlist";
import PlaylistCard from "./PlaylistCard";

//todo: add playlist button
export default function AllPlaylists() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null)
    const allPlaylists = useSelector(state => Object.values(state.playlists))
    console.log("playlist:",allPlaylists)

    useEffect(() => {
        const getPlaylists = async () => {
           setErrors(await dispatch(allPlaylistsThunk()))
        }

        getPlaylists()
    }, [dispatch])


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