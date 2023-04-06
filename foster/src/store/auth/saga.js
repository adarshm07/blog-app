import { call, put, takeEvery } from "redux-saga/effects"
import {
  ADD_LOGIN_FORM,
  FORGET_USER_FORM,
  RESET_USER_FORM
} from "./actionConstant";
import { useHistory } from "react-router";
import axios from "axios";
import { apiSuccessAuth, apiFailAuth } from "./actions"
import * as url from "./../../helper/auth_helper"

function* postLoginDetails({ payload: input }) {
  try {
    let response = yield axios.post(url.LOGIN_URL,input);
    localStorage.setItem("x-token", JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWZhNmRhYmE1ZTJmY2RkZjgxOGUzNTIiLCJkYXRlIjoiMjAyMi0wMi0wNVQxMzo1MDozNS4yNTVaIiwiaWF0IjoxNjQ0MDY5MDM1fQ.OsDWi5MMW2QhzBF6CRDryTpbw90bLS6PiPlW6rLvsOc'))
    
    yield put(apiSuccessAuth(ADD_LOGIN_FORM, response));
  }
  catch (error) {
    yield put(apiFailAuth(ADD_LOGIN_FORM, error));
  }
}

function* postForgetDetails({ payload: input }) {
  try {
    let response = yield axios.post(url.FORGET_URL,input);
    yield put(apiSuccessAuth(FORGET_USER_FORM, response));
  }
  catch (error) {
    yield put(apiFailAuth(FORGET_USER_FORM, error));
  }
}
function* postResetFormData({ payload: input, ids: ids }) {
  // const history = useHistory();
  try {
    // /${ids}
    let response = yield axios.post(`${url.RESET_URL}`,input);
    yield put(apiSuccessAuth(RESET_USER_FORM, response));
    console.log(response)
    if(response.data.status){
      // history.pushState(`/success`)
    }
  }
  catch (error) {
    yield put(apiFailAuth(RESET_USER_FORM, error));
  }
}


function* authSaga() {
  
  yield takeEvery(ADD_LOGIN_FORM, postLoginDetails);
  yield takeEvery(FORGET_USER_FORM, postForgetDetails);
  yield takeEvery(RESET_USER_FORM, postResetFormData);
}

export default authSaga