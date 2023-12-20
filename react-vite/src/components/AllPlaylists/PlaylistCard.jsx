import { useNavigate } from "react-router-dom";

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

export default function PlaylistCard({ playlist }) {
    const redirect = useNavigate();
    const onClick = () => {
       return redirect(`${playlist.id}`)
    }


    return (
       <div onClick={onClick} className="playlist-card">
            <p className="playlist-card-title">{playlist.title}</p>
            <img src={playlist.cover_image} className="playlist-card-image"/>
            <p className="playlist-card-num-songs">{playlist.num_songs} Songs</p>
        </div>
    )
}