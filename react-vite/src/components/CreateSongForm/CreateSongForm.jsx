import { postSongThunk, oneAlbumThunk } from "../../redux/album";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './CreateSongForm.css';

export default function CreateSongForm() {
  const [title, setTitle] = useState('')
  const [song, setSong] = useState(null)
  const [audioLoading, setAudioLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const dispatch = useDispatch()
  const { albumId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getAlbum = async () => {
      await dispatch(oneAlbumThunk(albumId))
    }

    getAlbum()
}, [dispatch,albumId])

  useEffect(() => {
    const errors = {}

    if (title.length < 3) {
      errors.title = 'Title is required and must be at least 3 characters'
    }

    if (!song || song?.length < 1) {
      errors.song = 'A song file is required'
    }

    setValidationErrors(errors)
  }, [title, song])


  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)

    if (Object.values(validationErrors).length) {
      return;
    }


    const formData = new FormData();
    formData.append("title", title)
    formData.append("song_file", song)
    formData.append("album_id", albumId)
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setAudioLoading(true);
    let data = await dispatch(postSongThunk(formData, albumId))
    console.log("UPLOAD COMPLETE",data)
    setHasSubmitted(false)
    navigate(`/albums/${albumId}`)
  }

  return (
    <div className="new-song-container">
      <h1>Add a new song!</h1>
      <form
      className="new-song-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      >
        <label className="new-song-input">
          <h3 className="h4-text">What is the song title?</h3>
          <input
          className="inner-input"
          type="text"
          value={title}
          placeholder="Song Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          />
          {hasSubmitted && validationErrors.title && (
              <span className="error-message">{validationErrors.title}</span>
          )}
        </label>
        <label className="new-song-input">
          <h3 className="h4-text">Upload your song file!</h3>
          <input
          className="inner-input"
          type="file"
          accept=".wav,.ogg,.mp3"
          onChange={(e) => setSong(e.target.files[0])}
          />
          {hasSubmitted && validationErrors.song && (
              <span className="error-message">{validationErrors.song}</span>
          )}
        </label>
        <button className="new-song-submit-button">Submit</button>
      </form>
    </div>
  )
}
