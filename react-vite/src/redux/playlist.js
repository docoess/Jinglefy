const GET_ALL_PLAYLIST = 'playlist/GET_ALL_PLAYLIST'
const GET_ONE_PLAYLIST = '/playlist/GET_ONE_PLAYLIST'


const getAllPlaylists = (playlists) => ({
    type: GET_ALL_PLAYLIST,
    payload: playlists
})

const getOnePlaylist = (playlistId) => ({
    type: GET_ONE_PLAYLIST,
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


function playlistReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_PLAYLIST: {
            const newState = {...state}
            console.log('REDUCER: ',action.payload)
            action.payload.forEach(playlist => {
                newState[playlist.id] = playlist
            });
            return newState
        }

        case GET_ONE_PLAYLIST: {
            return {...state, [action.payload.id]: action.payload}
        }

        default:
            return state
    }
}

export default playlistReducer