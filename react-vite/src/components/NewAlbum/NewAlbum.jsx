import { useState } from "react"
import { postAlbumThunk } from "../../redux/album"
import { useDispatch } from "react-redux"



export default function NewAlbum() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState(null)
    const [desc, setDesc] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("cover_image", cover);
        formData.append("title", title)
        formData.append("description", desc)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        let data = await dispatch(postAlbumThunk(formData))
        console.log("UPLOAD COMPLETE",data)
    }

    return (
        <>
            <h1>Create a new album!</h1>
            <form
            onSubmit={handleSubmit}
            encType="multipart/form-data">
                <label>
                    What is the title for your album?
                    <input
                    type="text"
                    value={title}
                    placeholder="Album Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Give a brief description of your Album, it can be about whatever aspect of it that you want!
                    <input
                    type="text"
                    value={desc}
                    placeholder="Album Description"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Upload a cover image for your album!
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    />
                </label>
                <button type="submit">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </>
    )
}
