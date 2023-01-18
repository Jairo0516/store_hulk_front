import { SET_DATA_CHECKOUT } from './actions'

const initialState = {
  cart: []
}

export const checkout = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
      case SET_DATA_CHECKOUT:
          return {
              ...state,
              cart: payload
          }
      default:
          return state
  }
}