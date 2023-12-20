import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateAlbum from "./OptionButtons/UpdateAlbum";
import DeleteAlbum from "./OptionButtons/DeleteAlbum";
import { oneAlbumThunk } from "../../redux/album";
import { useEffect, useState } from "react";
import SongCard from "../SongCard/SongCard";
import { getLikesThunk } from "../../redux/likes";

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
    const navigate = useNavigate();
    const { albumId } = useParams();
    const album = useSelector((state) => state.albums[albumId]);
    const currentUser = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState(null)



    let songs;
    if(album != undefined) {
    // ? ^ trying to key into undefined in ANY way throws an error
    // best solution I've found is != null/undefined
        if (album.songs) {
             songs = Object.values(album.songs)

        }
    }

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
           await dispatch(getLikesThunk())
        }

        getAlbums()
    }, [dispatch, albumId])


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
                songs?.map(song => (
                    <SongCard song={song} key={song.id} source={"album"} />
                ))
            }
        </div>
    )
}
