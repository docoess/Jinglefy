import { useDispatch, useSelector } from "react-redux"
import {useModal} from "../../../context/Modal"
import { allPlaylistsThunk, addSongToPlaylistThunk } from "../../../redux/playlist"
import { useEffect, useState } from "react"


export default function AddToPlaylistModal({ song }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const playlists = useSelector((state) => state.playlists)
    const [targetPlaylist, setTargetPlaylist] = useState()

    useEffect(() => {
        const getPlaylists = async () => {
            await dispatch(allPlaylistsThunk())
        }

        getPlaylists()
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addSongToPlaylistThunk(targetPlaylist, song.id))
        closeModal()
    }

    return playlists && (
        <div>
            <h1>What playlist would you like to add "{ song.title }" to?</h1>
            <form onSubmit={handleSubmit}>
                {
                    playlists && Object.keys(playlists).length ? (
                        <select onChange={e => setTargetPlaylist(e.target.value)}>
                            <option value="" disabled selected key="0">Select your option</option>
                            {Object.values(playlists).map(playlist => (
                                <option value={playlist.id}  key={playlist.id}>{playlist.title}</option>
                            ))}
                        </select>
                    ) : <p>No playlists yet!</p>
                }
                <button onClick={console.log("TARGET PLAYLIST: ", targetPlaylist)}>Submit</button>
            </form>
            <button onClick={closeModal}>Close</button>
        </div>
    )

}
