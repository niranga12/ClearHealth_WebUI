import { LOADER_HIDE, LOADER_SHOW } from 'src/constansts'

export const loaderShow = () => {
  return function (dispatch) {
    dispatch({
      type: LOADER_SHOW
    })
  }
}

export const loaderHide = () => {
  return function (dispatch) {
    dispatch({
      type: LOADER_HIDE
    })
  }
}
