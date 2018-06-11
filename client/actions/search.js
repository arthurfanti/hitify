import axios from 'axios'

export const fetchResults = (term, entity) => async (dispatch, getState) => {
  dispatch({ type: 'SEARCH' })
  const { token } = getState().session

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: { q: term, type: entity },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      const results = response.data[`${entity}s`] // artist -> artists

      dispatch({ type: 'SEARCH_SUCCESS', results, entity })
    }
  } catch (e) {
    console.error(e)
    dispatch({ type: 'SEARCH_FAILURE', errors: e })
  }
}

export const fetchArtist = id => async (dispatch, getState) => {
  dispatch({ type: 'GET_ARTIST' })
  const { token } = getState().session

  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      params: { limit: 5 },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      const results = response.data

      dispatch({ type: 'GET_ARTIST_SUCCESS', results })
    }
  } catch (e) {
    console.error(e)
    dispatch({ type: 'GET_ARTIST_FAILURE', errors: e })
  }
}

export const fetchAlbum = id => async (dispatch, getState) => {
  dispatch({ type: 'GET_ALBUM' })
  const { token } = getState().session

  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      const results = response.data

      dispatch({ type: 'GET_ALBUM_SUCCESS', results })
    }
  } catch (e) {
    console.error(e)
    dispatch({ type: 'GET_ALBUM_FAILURE', errors: e })
  }
}
