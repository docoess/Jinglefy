// ACTION
const GET_ALBUMS = "/albums/GET_ALBUMS"
const GET_ONE_ALBUM = "/albums/GET_ONE_ALBUM"
const POST_ALBUM = '/albums/POST_ALBUM'


const getAllAlbums = (albums) => ({
    type: GET_ALBUMS,
    payload: albums
})

const getOneAlbum = (album) => ({
    type: GET_ONE_ALBUM,
    payload: album
})

const postAlbum = (album) => ({
    type: POST_ALBUM,
    payload: album
})


export const allAlbumsThunk = () => async (dispatch) => {
    const res = await fetch("/api/albums");
    if(res.ok) {
        const albums = await res.json();
        if(albums.errors) {
            console.log(albums.errors)
            return albums.errors;
        }
        dispatch(getAllAlbums(albums))
        return null
    }
}

export const oneAlbumThunk = (albumId) => async dispatch => {
    const res = await fetch (`/api/albums/${albumId}`)
    if(res.ok) {
        const album = await res.json()
        if(album.errors) {
            console.log(album.errors)
            return album.errors
        }
        dispatch(getOneAlbum(album))
        return null
    }
}

export const postAlbumThunk = (formData) => async dispatch => {
    const res = await fetch(`/api/albums`, {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        const album = await res.json();
        dispatch(postAlbum(album))
        console.log('post album thunk',album)
    } else {
        const album = await res.json()
        console.log('post,thunk',album)
        return album
    }

}


function albumsReducer(state = {}, action) {
    switch (action.type) {

        case GET_ALBUMS:
            // console.log(action.payload)
            // console.log(state)
            const newState = {...state}
            action.payload.forEach(album => {
                newState[album.id] = album
            });

            return newState

        case GET_ONE_ALBUM:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state
    }
}

export default albumsReducer
