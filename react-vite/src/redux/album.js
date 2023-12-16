// ACTION
const GET_ALBUMS = "/albums/GET_ALBUMS"
// const GET_AN_ALBUM = "/allAlbums/GET_AN_ALBUM"


const getAllAlbums = (albums) => ({
    type: GET_ALBUMS,
    payload: albums
})


export const allAlbumsThunk = () => async (dispatch) => {
    const res = await fetch("/api/albums");
    if(res.ok) {
        const albums = await res.json();
        if(albums.errors) {
            console.log(albums.errors)
            return;
        }
        dispatch(getAllAlbums(albums))
        return albums
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

        default:
            return state
    }
}

export default albumsReducer