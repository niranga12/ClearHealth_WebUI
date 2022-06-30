const { LOADER_SHOW, LOADER_HIDE } = require('src/constansts')

const initialState = {
  isLoader: false
}

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_SHOW:
      return {
        ...state,
        isLoader: true
      }
    case LOADER_HIDE:
      return {
        ...state,
        isLoader: false
      }
    default: {
      return state
    }
  }
}

export default loaderReducer
