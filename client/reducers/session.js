// import { ADD_ITEM, REMOVE_ITEM } from '../actions/cart'

const initialState = { token: null }

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        token: action.token
      }

    default:
      return state
  }
}

export default sessionReducer
