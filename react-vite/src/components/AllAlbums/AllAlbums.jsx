import { useDispatch, useSelector } from "react-redux";
import { allAlbumsThunk } from "../../redux/album";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";

export default function AllAlbums() {
    const redirect = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null)
    const allAlbums = useSelector(state => Object.values(state.albums))
    const currentUser = useSelector((state) => state.session.user)
    // console.log("allAlbums: ", allAlbums)

    useEffect(() => {
        const getAlbums = async () => {
           setErrors(await dispatch(allAlbumsThunk()))
        }

        getAlbums()
    }, [dispatch])

    const onClick = () => {
        return redirect(`/albums/new`)
     }

    return (
        <div className="all-albums">
            <h1 className="all-albums-header">Browse all of our Jingle Albums!</h1>
            <div className="all-albums-container">
                {errors && <p>{errors}</p>}
                {allAlbums.map(album => (
                    <AlbumCard album={album} key={album.id}/>
                ))}
            </div>
            {currentUser != null && (<button onClick={onClick} className="all-albums-new-album-button">Create a new Jingle Album!</button>)}
        </div>
    )
}
