import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ playlist }) {
    const redirect = useNavigate();
    const onClick = () => {
       return redirect(`${playlist.id}`)
    }
    return (
       <div className="playlist-card" onClick={onClick}>
            <p className="playlist-card-title">{playlist.title}</p>
            <img className="playlist-card-image" src={playlist.cover_img}/>
            <p className="playlist-card-num-songs">{playlist.num_songs} Songs</p>
        </div>
    )
}