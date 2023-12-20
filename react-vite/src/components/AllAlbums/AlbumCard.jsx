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

export default function AlbumCard({ album }) {
    const redirect = useNavigate();
    const onClick = () => {
       return redirect(`${album.id}`)
    }
    return (
       <div className="album-card" onClick={onClick}>
            <p className="album-card-title">{album.title}</p>
            <img className="album-card-image" src={album.cover_image}/>
            <p className="album-card-num-songs">{album.num_songs} Songs</p>
            <p className="album-card-release-date">Released on {formattedDate(album.release_date)}</p>
        </div>
    )
}
