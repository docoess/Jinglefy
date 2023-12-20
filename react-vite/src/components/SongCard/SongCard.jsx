import { useDispatch, useSelector } from "react-redux";
import { oneAlbumThunk, deleteSongThunk } from "../../redux/album";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddToPlaylistModal from "./AddRemovePlaylistModal/AddToPlaylistModal";
import DeleteSongModal from "./DeleteSongModal";

export default function SongCard({ song }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const likedSongs = useSelector(state => state.likes)
  const [liked, setLiked] = useState(false)
  const [numLikes, setNumLikes] = useState(song.likes)

  if (likedSongs.includes(song.id) && !liked) {
    setLiked(true)
  }

  const addLike = async () => {
    setLiked(!liked);
    setNumLikes(numLikes + 1);
  }

  const removeLike = async () => {
      setLiked(!liked)
      setNumLikes(numLikes - 1);
  }



  useEffect(() => {
    const getAlbum = async () => {
      await dispatch(oneAlbumThunk(song.album_id))
    }

    getAlbum()
  }, [dispatch, song.album_id])


  const handleDeleteButton = async (e) => {
    e.preventDefault()

    await dispatch(deleteSongThunk(song.id));
    console.log('HANDLE DELETE', song.id)
  }

  console.log("SONG IN SONGCARD: ", song)
  return (
    <div>
      <p>{numLikes} likes</p>
      <p><span>{song.track_num}. </span><span>{song.title}</span><span><audio controls src={song.song_link}>fallback placeholder</audio></span></p>
      <p>
        {
          liked ?
            <span onClick={removeLike}>
              LIKED
            </span> :
            <span onClick={addLike}>
              UNLIKED
            </span>

        }
      </p>
      <button>Like</button> <OpenModalMenuItem itemText={'Add to playlist'} modalComponent={<AddToPlaylistModal song={song} />} />

        <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteSongModal />} />


    </div>
  )
}
/*

  Get songs from store

  Render related song data



*/
