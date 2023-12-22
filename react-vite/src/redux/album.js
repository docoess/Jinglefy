// ACTION
const GET_ALBUMS = "/albums/GET_ALBUMS"
const GET_ONE_ALBUM = "/albums/GET_ONE_ALBUM"
const POST_ALBUM = '/albums/POST_ALBUM'
const DELETE_ALBUM = '/albums/DELETE_ALBUM'
const UPDATE_ALBUM = '/albums/UPDATE_ALBUM'
const DELETE_SONG = "/songs/DELETE_SONG"
const POST_SONG = "/songs/POST_SONG"

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

const updateAlbum = (albumId) => ({
    type: UPDATE_ALBUM,
    payload: albumId
})

const deleteSong = (songId) => ({
    type: DELETE_SONG,
    payload: songId
  })

const postSong = (song, albumId) => ({
    type: POST_SONG,
    payload: {song, albumId}
})


export const allAlbumsThunk = () => async (dispatch) => {
    const res = await fetch("/api/albums");
    if(res.ok) {
        const albums = await res.json();
        if(albums.errors) {
            // console.log(albums.errors)
            return albums.errors;
        }
        dispatch(getAllAlbums(albums))
        return null
    }
}


export const oneAlbumThunk = (albumId) => async dispatch => {
    try{
        const res = await fetch (`/api/albums/${albumId}`)
        if(res.ok) {
            const album = await res.json()
            if(album.errors) {
                // console.log(album.errors)
                return album.errors
            }
            dispatch(getOneAlbum(album))
            return null
        }
    } catch(error) {
        console.log('catch error', error)
        return error
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
        // console.log('post album thunk',album)
        return album
    } else {
        const album = await res.json()
        console.log('post,thunk',album)
        return album
    }

}


export const updateALbumThunk = (albumId,formData) => async dispatch => {
    console.log('update thunk ', albumId, formData)
    try {
        const res = await fetch(`/api/albums/${albumId}/update`, {
            method: "PUT",
            body: formData
        })

        if (res.ok) {
            const album = await res.json()
            dispatch(updateAlbum(albumId))
            // console.log('update album in fetch',album)
        }
        else {
            const album = await res.json()
            return album
        }
    } catch(error) {
        console.log('catch error: ', error)
        return error
    }

}


export const deleteAlbumThunk = (albumId) => async dispatch => {
    try {
        const res = await fetch(`/api/albums/${albumId}/delete`, {
            method: 'DELETE'
        })

        if (res.ok) {
            const album = await res.json();
            dispatch(deleteAlbum(albumId))
        } else {
            const error = await res.json()
            console.log(error)
            return null
        }

    } catch (error) {
        console.log('catch error: ',error)
        return error
    }
}


export const deleteSongThunk = (songId) => async dispatch => {
    console.log(songId)
    try {
      const res = await fetch(`/api/songs/${songId}/delete`, {
        method: 'DELETE'
      })

      if (res.ok) {
        const song = await res.json()
        // console.log(song)
        dispatch(deleteSong(songId))
      } else {
        const err = await res.json()
        console.log(err)
        return null
      }
    } catch (error) {
      console.log('catch error:', error)
      return error
    }
  }

  export const postSongThunk = (song, albumId) => async dispatch => {
    try {
        const res = await fetch(`/api/songs/new`, {
            method: 'POST',
            body: song
        })

        if (res.ok) {
            const newSong = await res.json()
            // console.log('NEW SONG', newSong)
            dispatch(postSong(newSong, albumId))
        } else {
            const err = await res.json()
            console.log(err)
            return null
        }
      } catch (error) {
        console.log('catch error:', error)
        return error
      }
  }



function albumsReducer(state = {}, action) {
    switch (action.type) {

        case GET_ALBUMS: {
            const newState = {...state}
            action.payload.forEach(album => {
                newState[album.id] = album
            });

            return newState
        }

        case GET_ONE_ALBUM: {
            return {...state, [action.payload.id]: action.payload}
        }

        case POST_ALBUM: {
            const newState = {...state}
            return {...newState, [action.payload.id]: action.payload}
        }

        case DELETE_ALBUM:
            // console.log('made it to reducer')
            const newStateDelete = {...state}
            delete newStateDelete[action.payload.id]
            return newStateDelete

        case UPDATE_ALBUM: {
            const newState = {...state, [action.payload]:{...state[action.payload]}}
            return newState
        }

        case DELETE_SONG: {
            const newState = {...state}
            // console.log('NEW STATE IN DELETE SONG REDUCER', newState)
            delete newState.songs[action.payload]
            return newState
        }

        case POST_SONG: {
            const newState = {...state}
            // console.log('NEW STATE IN POST SONG', newState)
            newState[action.payload.albumId]['songs'] = {}
            newState[action.payload.albumId]['songs'][action.payload.song.id] = action.payload.song
            return newState
        }

        default:
            return state
    }
}

export default albumsReducer
