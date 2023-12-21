import AddToPlaylistModal from "./AddRemovePlaylistModal/AddToPlaylistModal";
import { oneAlbumThunk, deleteSongThunk } from "../../redux/album";
import { deleteSongFromPlaylistThunk } from "../../redux/playlist";
import { addLikeThunk, removeLikeThunk } from "../../redux/likes";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useDispatch, useSelector } from "react-redux";
import DeleteSongModal from "./DeleteSongModal";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./SongCard.css"

// import { FaBeer } from 'react-icons/fa';

// class Question extends React.Component {
//   render() {
//     return <h3> Lets go for a <FaBeer />? </h3>
//   }
// }

export default function SongCard({ song, source, playlistId, artistId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const likedSongs = useSelector(state => state.likes)
  const [liked, setLiked] = useState(false)
  const [numLikes, setNumLikes] = useState(song.likes)

  const addLike = async () => {
    await dispatch(addLikeThunk(song.id))
    setLiked(!liked);
    setNumLikes(numLikes + 1);
  }

  const removeLike = async () => {
    await dispatch(removeLikeThunk(song.id))
    setLiked(!liked)
    setNumLikes(numLikes - 1);
  }
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getAlbum = async () => {
      await dispatch(oneAlbumThunk(song.album_id))
    }

    getAlbum()
  }, [dispatch, song.album_id])

  if (currentUser) {
    if (!Object.keys(likedSongs).length) {
      return null
    }

    if (likedSongs.includes(song.id) && !liked) {
      setLiked(true)
    }
  }

  const removeFromPlaylist = async () => {
   const response = await dispatch(deleteSongFromPlaylistThunk(playlistId, song.id))
   if(!response) {
    setDeleted(true)
   }
  }

// todo: owner auth check for delete button

 
  const checkSource = () => {
    if (source == 'album') {
      return (
        <>
          <OpenModalMenuItem itemText={'Add to playlist'} modalComponent={<AddToPlaylistModal song={song} />} className={"fake-button"}/>
          {(currentUser != null && currentUser.id == artistId) && (<OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteSongModal song={song} />}  className={"fake-button"}/>)}
        </>

      )
    }

    if (source == 'playlist') {
      return (
        <>
          <div className="fake-button" onClick={removeFromPlaylist}>Remove from playlist</div>
        </>
      )
    }
  }


  console.log("deleted value: ",deleted)
  return !deleted &&(
    <div className="song-card">
        <div className="song-card-upper">
          <div className="song-card-song-title">
            {source == "album" && song.track_num + ". "}{song.title}:
            <audio controls src={song.song_link} className="song-card-song">fallback placeholder</audio>
          </div>
          { currentUser != null && (
          liked ?
              <FaHeart onClick={removeLike} className="like-button"/>
                :
              <FaRegHeart onClick={addLike} className="like-button" />
        )}
        </div>


      {/* <button>Like</button> <OpenModalMenuItem itemText={'Add to playlist'} modalComponent={<AddToPlaylistModal song={song} />} />

        <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteSongModal />} /> */}
      <div className="song-card-buttons-likes-container"><div className="like-count">{numLikes} Likes </div> <div className="song-card-buttons-container">{checkSource()}</div></div>
    </div>
  )
}
/*

  Get songs from store

  Render related song data



*/
