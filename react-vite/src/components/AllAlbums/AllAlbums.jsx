import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allAlbumsThunk } from "../../redux/album";

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
            <div className="Testing">
                {errors && <p>{errors}</p>}
                {allAlbums.map(album => (
                    <>
                        <p>{album.title}</p>
                        <img src={album.cover_image}/>
                        <p>{album.num_songs} Songs</p>
                        <p>Released on {formattedDate(album.release_date)}</p>
                    </>
                ))}
            </div>
        </>
    )
}
