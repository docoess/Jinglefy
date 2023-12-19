import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postSongThunk, oneAlbumThunk } from "../../redux/album";

export default function CreateSongForm() {
  const [title, setTitle] = useState('')
  const [song, setSong] = useState(null)
  const [audioLoading, setAudioLoading] = useState(false)
  const dispatch = useDispatch()
  const { albumId } = useParams()

  useEffect(() => {
    const getAlbum = async () => {
      await dispatch(oneAlbumThunk(albumId))
    }

    getAlbum()
}, [dispatch,albumId])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title)
    formData.append("song_file", song)
    formData.append("album_id", albumId)
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setAudioLoading(true);
    let data = await dispatch(postSongThunk(formData, albumId))
    console.log("UPLOAD COMPLETE",data)
  }

  return (
    <>
      <h1>Add a new song!</h1>
      <form
      onSubmit={handleSubmit}
      encType="multipart/form-data">
        <label>
          What is the song title?
          <input
          type="text"
          value={title}
          placeholder="Song Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          />
        </label>
        <label>
          Upload your song file!
          <input
          type="file"
          accept=".wav,.ogg,.mp3"
          onChange={(e) => setSong(e.target.files[0])}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}
