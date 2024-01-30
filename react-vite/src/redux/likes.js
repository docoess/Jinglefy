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
    return error
  }
}

export const addLikeThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/like`, {
    method: 'POST'
  })
  if (res.ok) {
    const likes = await res.json()
    dispatch(getLikes(likes))
  } else {
    const error = await res.json();
    return error
  }
}

export const removeLikeThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/unlike`, {
    method: 'PATCH'
  })
  if (res.ok) {
    const likes = await res.json()
    dispatch(getLikes(likes))
  } else {
    const error = await res.json();
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
