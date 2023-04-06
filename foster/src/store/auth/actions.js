import {GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  ADD_LOGIN_FORM,
  FORGET_USER_FORM,
  RESET_USER_FORM
} from "./actionConstant";
  
  export const apiSuccessAuth = (actionType , data) =>({
    type: GET_AUTH_SUCCESS,
    payload: { actionType, data }
  });
  
  export const apiFailAuth = (actionType , data) =>({
    type: GET_AUTH_FAILED,
    payload: { actionType, data }
  });
  
  export const postLoginFormData = (input) => ({
    type: ADD_LOGIN_FORM,
    payload:input
  });

  export const postForgetFormData = (input) => ({
    type: FORGET_USER_FORM,
    payload:input
  });

  export const postResetFormData = (input, id) => ({
    type: RESET_USER_FORM,
    payload:input,
    ids: id
  });

 
  