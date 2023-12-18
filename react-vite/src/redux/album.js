// ACTION
const GET_ALBUMS = "/albums/GET_ALBUMS"
const GET_ONE_ALBUM = "/albums/GET_ONE_ALBUM"
const POST_ALBUM = '/albums/POST_ALBUM'
const DELETE_ALBUM = '/albums/DELETE_ALBUM'


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

const deleteAlbum = (albumId) => ({
    type: DELETE_ALBUM,
    payload: albumId
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
    const res = await fetch(`/api/albums/new`, {
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

export const deleteAlbumThunk = (albumId) => async dispatch => {
    try {

        console.log('Top of Thunk')
        const res = await fetch(`/api/albums/${albumId}/delete`, {
            method: 'DELETE'
        })
        
        if (res.ok) {
            const album = await res.json();
            console.log(album)
            dispatch(deleteAlbum(albumId))
        } else {
            const err = await res.json()
            console.log('HERE:',err)
            return null
        }
        console.log('bottom')
    } catch (error) {
        console.log('catch error:',error)
        return error
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

        case DELETE_ALBUM:
            console.log('made it to reducer')
            const newStateDelete = {...state}
            delete newStateDelete[action.payload.id]
            return newStateDelete


        default:
            return state
    }
}

export default albumsReducer
