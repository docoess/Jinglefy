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
       <div onClick={onClick}>
            <p>{album.title}</p>
            <img src={album.cover_image}/>
            <p>{album.num_songs} Songs</p>
            <p>Released on {formattedDate(album.release_date)}</p>
        </div>
    )
}