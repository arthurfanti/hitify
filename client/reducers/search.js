const initialState = {
  entity: 'artist',
  results: [],
  artist: {},
  album: {}
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        loading: true,
        errors: null
      }

    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        entity: action.entity,
        results: action.results
      }

    case 'SEARCH_FAILURE':
      return {
        ...state,
        loading: false,
        errors: action.errors,
        entity: action.entity
      }

    case 'GET_ARTIST':
      return {
        ...state,
        artist: {
          loading: true,
          errors: null
        }
      }

    case 'GET_ARTIST_SUCCESS':
      return {
        ...state,
        artist: {
          loading: false,
          results: action.results
        }
      }

    case 'GET_ARTIST_FAILURE':
      return {
        ...state,
        artist: {
          loading: false,
          errors: action.errors
        }
      }

    case 'GET_ALBUM':
      return {
        ...state,
        album: {
          loading: true,
          errors: null
        }
      }

    case 'GET_ALBUM_SUCCESS':
      return {
        ...state,
        album: {
          loading: false,
          results: action.results
        }
      }

    case 'GET_ALBUM_FAILURE':
      return {
        ...state,
        album: {
          loading: false,
          errors: action.errors
        }
      }

    default:
      return state
  }
}

export default searchReducer
