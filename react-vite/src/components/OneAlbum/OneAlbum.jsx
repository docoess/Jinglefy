import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { oneAlbumThunk } from "../../redux/album";
import { useParams } from "react-router-dom";

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

export default function OneAlbum() {
    const dispatch = useDispatch();

    let { albumId } = useParams()
    const album = useSelector((state) => state.albums[albumId]);
    const [errors, setErrors] = useState(null)
    const allAlbums = useSelector(state => Object.values(state.albums))
    console.log("albums:",allAlbums)

    useEffect(() => {
        const getAlbums = async () => {
           setErrors(await dispatch(oneAlbumThunk(albumId)))
        }

        getAlbums()
    }, [dispatch])

    return album && (
        <>
            <p>Title: {album.title}</p>
            <img src={album.cover_image}/>
            <p>Number of Songs: {album.num_songs}</p>
            <p>Description: {album.desc}</p>
            <p>Release Date: {formattedDate(album.release_date)}</p>
            <p>Made by: {album.artist.username}</p>
        </>
    )
}
