const GET_LIKES = '/likes/GET_LIKES'

const getLikes = (likes) => ({
  type: GET_LIKES,
  payload: likes
})

export const getLikesThunk = () => async (dispatch) => {
  const res = await fetch('/api/users/likes')
  if (res.ok) {
    const likes = await res.json()
    dispatch(getLikes(likes))
  } else {
    const error = await res.json();
    console.log(error)
    return error
  }
}

function likesReducer(state = {}, action) {
  switch (action.type) {
    case GET_LIKES: {
      return action.payload
    }
    default:
      return state
  }
}

export default likesReducer
