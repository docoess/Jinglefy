import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateAlbum from "./OptionButtons/UpdateAlbum";
import DeleteAlbum from "./OptionButtons/DeleteAlbum";
import { oneAlbumThunk } from "../../redux/album";
import { getLikesThunk } from "../../redux/likes";
import { useEffect, useState } from "react";
import SongCard from "../SongCard/SongCard";
import "./OneAlbum.css";

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
    // best solution I've found is x != null/undefined for useSelector variables
        if (album.songs) {
            songs = Object.values(album.songs)
            songs.sort((a, b) => {
                return a.track_num - b.track_num
            });
        }
    }

    const addSongButton = () => {
        navigate(`/albums/${albumId}/new-song`)
    }

    const ownerOptions = () => {
        if (currentUser != null) {
            if(album.artist_id == currentUser.id) {
                return <div className="album-details-button-container">
                    <UpdateAlbum />
                    <DeleteAlbum />
                    <div className="fake-button" onClick={addSongButton}>Add a Song</div>
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
            <div className="album-details-container">
            <img className="album-details-cover-image" src={album.cover_image}/>
                <div className="album-details-text">
                    <h1 className="album-details-title">{album.title}</h1>
                    <p>Made by: {album.artist ? album.artist.username : null}</p>
                    <p>{album.num_songs} songs · {formattedDate(album.release_date)}</p>
                    <p className="album-details-desc">{album.desc}</p>
                    {ownerOptions()}
                </div>
            </div>
            <div className="songs-container">
                {
                    songs?.map(song => (
                        <SongCard song={song} key={song.id} source={"album"} artistId={album.artist_id} />
                    ))
                }
            </div>
            {(currentUser && album.artist_id == currentUser.id)}
        </div>
    )
}
