import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allAlbumsThunk } from "../../redux/album";

export default function AllAlbums() {
    const dispatch = useDispatch();
    const allAlbums = useSelector(state => Object.values(state.albums))
    console.log("albums:",allAlbums)

    useEffect(() => {
        const getAlbums = async () => {
           await dispatch(allAlbumsThunk())

        }

        getAlbums()
    }, [dispatch])

    //todo: no rerender so data is not showing up

    return (
        <>
        <h1>Hi</h1>
        <div className="Testing">
        {allAlbums.map(album => {
            <p>{album.artist_id}</p>
        })}
        </div>
        </>
    )
}