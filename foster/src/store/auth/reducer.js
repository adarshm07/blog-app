import {
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  ADD_LOGIN_FORM,
  FORGET_USER_FORM
} from "./actionConstant";

const INIT_STATE = {
  login: [],
  error: [],
  logoutSuccess: null,
  logoutError:null,
  regs: [],
};

const auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_AUTH_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_LOGIN_FORM:
          return {
            ...state,
            login: action.payload.data,
          };
          case FORGET_USER_FORM:
          return {
            ...state,
            logoutSuccess: action.payload.data,
          };
       
        default:
          return state;
      }

    case GET_AUTH_FAILED:
      switch (action.payload.actionType) {
        case ADD_LOGIN_FORM:
          return {
            ...state,
            error: action.payload.error,
          };
          case FORGET_USER_FORM:
            return {
              ...state,
              logoutError: action.payload.error,
            };
        default:
          return state;
      }
    default:
      return state;
  }
};
export default auth;