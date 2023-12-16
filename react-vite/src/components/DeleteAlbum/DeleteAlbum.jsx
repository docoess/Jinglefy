import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { deleteAlbumThunk } from "../../redux/album";

export default function  DeleteAlbum ()  { 
    const dispatch = useDispatch()
    const {albumId} = useParams()
    const [error,setError] = useState(null)
    const user = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumId])
    console.log('albummsssss',)
    console.log('delete in react ', user)
    
    // const currentUser = useState(state => state.session)
    // console.log('curent userssss',currentUser)

    const handleSubmit = () => {
        
     if (user.id == album.artist_id) {  
        
   
       dispatch(deleteAlbumThunk(albumId))
      
     }
    }
    


return (
 <>
   
   <button onClick={handleSubmit} >Delete</button>

</>
)



}