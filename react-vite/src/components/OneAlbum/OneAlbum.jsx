import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { oneAlbumThunk } from "../../redux/album";
import { useParams } from "react-router-dom";
import UpdateAlbum from "./OptionButtons/UpdateAlbum";
import DeleteAlbum from "./OptionButtons/DeleteAlbum";
import SongCard from "../SongCard/SongCard";

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
    const currentUser = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState(null)

    const ownerOptions = () => {
        if (currentUser != null) {
            if(album.artist_id == currentUser.id) {
                return <div>
                    <UpdateAlbum />
                    <DeleteAlbum />
                </div>
            }
        }
    }


    useEffect(() => {
        const getAlbums = async () => {
           setErrors(await dispatch(oneAlbumThunk(albumId)))
        }

        getAlbums()
    }, [dispatch,albumId])

    return album && (
        <div>
            <p>Title: {album.title}</p>
            <img src={album.cover_image}/>
            <p>Number of Songs: {album.num_songs}</p>
            <p>Description: {album.desc}</p>
            <p>Release Date: {formattedDate(album.release_date)}</p>
            <p>Made by: {album.artist ? album.artist.username : null}</p>
            {ownerOptions()}
            {
                album.songs?.map(song => (
                    <SongCard song={song} key={song.id} />
                ))
            }
        </div>
    )
}
