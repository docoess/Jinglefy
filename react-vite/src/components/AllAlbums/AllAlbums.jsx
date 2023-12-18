import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allAlbumsThunk } from "../../redux/album";
import AlbumCard from "./AlbumCard";

export default function AllAlbums() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null)
    const allAlbums = useSelector(state => Object.values(state.albums))
    console.log("albums:",allAlbums)

    useEffect(() => {
        const getAlbums = async () => {
           setErrors(await dispatch(allAlbumsThunk()))
        }

        getAlbums()
    }, [dispatch])


    return (
        <>
            <div>
                {errors && <p>{errors}</p>}
                {allAlbums.map(album => (
                    <AlbumCard album={album} />
                ))}
            </div>
        </>
    )
}
