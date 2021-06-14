import { FETCHING_USER, LOG_OUT, SET_FETCHING_FALSE, USER_LOGIN } from "src/constansts";

const initialState = {
  username: null,
  isLogin:false
  // isLogin: localStorage.getItem("token")? true: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER: {
      return {
        ...state,
        fetching: true,
      };
    }
    case USER_LOGIN: {
      return (state = action.payload);
    }

    case LOG_OUT: {
      return initialState;
    }
    case SET_FETCHING_FALSE: {
        return {
          ...state,
          fetching: false
        };
      }
    default: {
      return state;
    }
  }
};
export default loginReducer;
