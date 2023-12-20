const GET_ALL_PLAYLIST = 'playlist/GET_ALL_PLAYLIST'
const GET_ONE_PLAYLIST = '/playlist/GET_ONE_PLAYLIST'
const REMOVE_ONE_PLAYLIST = '/playlist/REMOVE_ONE_PLAYLIST'


const getAllPlaylists = (playlists) => ({
    type: GET_ALL_PLAYLIST,
    payload: playlists
})

const getOnePlaylist = (playlist) => ({
    type: GET_ONE_PLAYLIST,
    payload: playlist
})

const removeOnePlaylist = (playlistId) => ({
    type: REMOVE_ONE_PLAYLIST,
    payload: playlistId
})



export const allPlaylistsThunk = () => async (dispatch) => {
    const res = await fetch("/api/playlists/");
    if(res.ok) {
        const playlists = await res.json();
        dispatch(getAllPlaylists(playlists))
    } else {
        const error = await res.json();
        console.log(error)
        return error
    }
}


export const onePlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`)
    if(res.ok) {
        const playlist = await res.json();
        dispatch(getOnePlaylist(playlist))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


export const postPlaylistThunk = (formData) => async (dispatch) => {
    const res = await fetch('/api/playlists/new', {
        method: 'POST',
        body: formData
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(getOnePlaylist(data))
    } else {
        const error = await res.json();
        console.log(error)
        return error
    }
}


export const updatePlaylistThunk = (playlistId, formData) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/update`, {
        method: 'PUT',
        body: formData
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(getOnePlaylist(data))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/delete`, {
        method: 'DELETE'
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(removeOnePlaylist(playlistId))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


function playlistReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_PLAYLIST: {
            const newState = {...state}
            action.payload.forEach(playlist => {
                newState[playlist.id] = playlist
            });
            return newState
        }

        case GET_ONE_PLAYLIST: {
            return {...state, [action.payload.id]: action.payload}
        }

        case REMOVE_ONE_PLAYLIST: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }

        default:
            return state
    }
}

export default playlistReducer
