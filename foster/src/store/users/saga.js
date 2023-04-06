import { put, takeEvery } from "redux-saga/effects";
import {
  POST_PROMOTION_DATA,
  PUT_PROMOTION_DATA,
  GET_PROMOTION_DATA,
  DELETE_PROMOTION_DATA,
  GET_BY_ID_PROMOTION_DATA,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_BASE64,
  FETCH_COUNTRY_DATA,
  GET_PROMOTION_EXPIRED_DATA,
  UPLOAD_IMAGE_ALERT,
  UPLOAD_IMAGE_BASE64_ALERT,
  FETCH_COUNTRY_DATA_ALERT,
  GET_ALERT_DATA,
  GET_ALERT_INACTIVE_DATA,
  POST_ALERT_DATA,
  PUT_ALERT_DATA,
  DELETE_ALERT_DATA,
  GET_BY_ID_ALERT_DATA,
} from "./actionConstant";
import axios from "axios";
import { apiSuccessPromotion, apiFailPromotion, apiFailAlert, apiSuccessAlert } from "./actions";
import config from "../../helper/token";
import * as url from "./../../helper/auth_helper";


let LoadingSaga;

let LoadingSagaPromotionOngoing;

let LoadingSagaPromotionExpired;


function* getList() {
  try {
    LoadingSagaPromotionOngoing = true;
    let all = yield axios.get(url.GET_PROMO, {
      headers: { "x-token": config },
    }).finally(() => {
      LoadingSagaPromotionOngoing = false;
    });
    yield put(apiSuccessPromotion(GET_PROMOTION_DATA, all));
  } catch (error) {
    yield put(apiFailPromotion(GET_PROMOTION_DATA, error));
  }
}
 
function* getListExpired() {
  try {
    LoadingSagaPromotionExpired = true;
    let all = yield axios.post(url.GET_PROMO_EXPIRED, {
      headers: { "x-token": config },
    }).finally(() => {
      LoadingSagaPromotionExpired = false;
    });
    yield put(apiSuccessPromotion(GET_PROMOTION_EXPIRED_DATA, all));
  } catch (error) {
    yield put(apiFailPromotion(GET_PROMOTION_EXPIRED_DATA, error));
  }
}

function* postData({ payload: inputValue }) {
  console.log(inputValue);
  try {
    let all = yield axios.post(url.ADD_PROMO, inputValue, {
      headers: { "x-token": config },
    });
    yield put(apiSuccessPromotion(POST_PROMOTION_DATA, all));
  } catch (error) {
    yield put(apiFailPromotion(POST_PROMOTION_DATA, error));
  }
}

function* putData({ payload: { inputValue, id } }) {
  try {
    let all = yield axios.put(
      `https://spherehunt.app:5000/api/v1/promotion/${id}`,
      inputValue,
      { headers: { "x-token": config } }
    );
    yield put(apiSuccessPromotion(PUT_PROMOTION_DATA, all));
  } catch (error) {
    yield put(apiFailPromotion(PUT_PROMOTION_DATA, error));
  }
}

function* deleteData({ payload: id }) {
  try {
    let all = yield axios.delete(
      `https://spherehunt.app:5000/api/v1/promotion/${id}`,
      { headers: { "x-token": config } }
    );
    yield put(apiSuccessPromotion(DELETE_PROMOTION_DATA, all));
  } catch (error) {
    yield put(apiFailPromotion(DELETE_PROMOTION_DATA, error));
  }
}

function* getByIdData({ payload: id }) {
  try {
    let all = yield axios.get(`https://spherehunt.app:5000/api/v1/promotion/${id}`, {
      headers: { "x-token": config },
    });
    yield put(apiSuccessPromotion(GET_BY_ID_PROMOTION_DATA, all));
  } catch (error) {
    yield put(apiFailPromotion(GET_BY_ID_PROMOTION_DATA, error));
  }
}

function* uploadData({ payload: file }) {
  try {
    let all = yield axios.post(url.uploadImage, file);
    yield put(apiSuccessPromotion(UPLOAD_IMAGE, all));
  } catch (error) {
    yield put(apiFailPromotion(UPLOAD_IMAGE, error));
  }
}

//for uploading image base64
function* uploadImage({ payload: CropedImage }) {
  try {
    let { data } = yield axios.post(url.base64ToImage, { url: CropedImage });
    yield put(apiSuccessPromotion(UPLOAD_IMAGE_BASE64, data));
  } catch (error) {
    yield put(apiFailPromotion(UPLOAD_IMAGE_BASE64, error));
  }
}

function* fetchCountryDataList({payload:str}){
  try{
    let  string  = { title : str };
    let data  = yield axios.post(url.searchCountry,string,{ headers: { "x-token": config } });
    yield put(apiSuccessPromotion(FETCH_COUNTRY_DATA, data));
  } catch (error) {
    yield put(apiFailPromotion(FETCH_COUNTRY_DATA, error.response));
  }
}


// ALERTS -->

function* getListAlerts() {

  try {
    LoadingSaga = true;
    let all = yield axios.post(url.GET_ALERT, {
      headers: { "x-token": config },
    }).finally(() =>{
       LoadingSaga = false;
    });
    yield put(apiSuccessAlert(GET_ALERT_DATA, all));
  } catch (error) {
    yield put(apiFailAlert(GET_ALERT_DATA, error));
  }
}
 
function* getListAlertsInactive() {
  try {
    let all = yield axios.post(url.GET_ALERT_INACTIVE, {
      headers: { "x-token": config },
    });
    yield put(apiSuccessAlert(GET_ALERT_INACTIVE_DATA, all));
  } catch (error) {
    yield put(apiFailAlert(GET_ALERT_INACTIVE_DATA, error));
  }
}

function* postDataAlert({ payload: inputValue }) {
  console.log(inputValue);
  try {
    let all = yield axios.post(url.ADD_ALERT, inputValue, {
      headers: { "x-token": config },
    });
    yield put(apiSuccessAlert(POST_ALERT_DATA, all));
  } catch (error) {
    yield put(apiFailAlert(POST_ALERT_DATA, error));
  }
}

function* putDataAlert({ payload: { inputValue, id } }) {
  try {
    let all = yield axios.post(
      `https://spherehunt.app:5000/api/v1/alert/update/${id}`,
      inputValue,
      { headers: { "x-token": config } }
    );
    yield put(apiSuccessAlert(PUT_ALERT_DATA, all));
  } catch (error) {
    yield put(apiFailAlert(PUT_ALERT_DATA, error));
  }
}

function* deleteDataAlert({ payload: id }) {
  try {
    let all = yield axios.delete(
      `https://spherehunt.app:5000/api/v1/alert/${id}`,
      { headers: { "x-token": config } }
    );
    yield put(apiSuccessAlert(DELETE_ALERT_DATA, all));
  } catch (error) {
    yield put(apiFailAlert(DELETE_ALERT_DATA, error));
  }
}

function* getByIdDataAlert({ payload: id }) {
  try {
    let all = yield axios.post(`https://spherehunt.app:5000/api/v1/alert/get/${id}`, {
      headers: { "x-token": config },
    });
    yield put(apiSuccessAlert(GET_BY_ID_ALERT_DATA, all));
  } catch (error) {
    yield put(apiFailAlert(GET_BY_ID_ALERT_DATA, error));
  }
}

function* uploadDataAlert({ payload: file }) {
  try {
    let all = yield axios.post(url.uploadImage, file);
    yield put(apiSuccessAlert(UPLOAD_IMAGE_ALERT, all));
  } catch (error) {
    yield put(apiFailAlert(UPLOAD_IMAGE_ALERT, error));
  }
}

//for uploading image base64
function* uploadImageAlert({ payload: CropedImage }) {
  try {
    let { data } = yield axios.post(url.base64ToImage, { url: CropedImage });
    yield put(apiSuccessAlert(UPLOAD_IMAGE_BASE64_ALERT, data));
  } catch (error) {
    yield put(apiFailAlert(UPLOAD_IMAGE_BASE64_ALERT, error));
  }
}

function* fetchCountryDataListAlert({payload:str}){
  try{
    let  string  = { title : str };
    let data  = yield axios.post(url.searchCountry,string,{ headers: { "x-token": config } });
    yield put(apiSuccessAlert(FETCH_COUNTRY_DATA_ALERT, data));
  } catch (error) {
    yield put(apiFailAlert(FETCH_COUNTRY_DATA_ALERT, error.response));
  }
}


function* userSaga() {
  yield takeEvery(GET_PROMOTION_DATA, getList);
  
  yield takeEvery(GET_PROMOTION_EXPIRED_DATA, getListExpired);

  yield takeEvery(POST_PROMOTION_DATA, postData);

  yield takeEvery(PUT_PROMOTION_DATA, putData);

  yield takeEvery(DELETE_PROMOTION_DATA, deleteData);

  yield takeEvery(GET_BY_ID_PROMOTION_DATA, getByIdData);

  yield takeEvery(UPLOAD_IMAGE, uploadData);

  yield takeEvery(UPLOAD_IMAGE_BASE64, uploadImage);
  
  yield takeEvery(FETCH_COUNTRY_DATA, fetchCountryDataList);

  // ALERTS -->

  yield takeEvery(GET_ALERT_DATA, getListAlerts);
  
  yield takeEvery(GET_ALERT_INACTIVE_DATA, getListAlertsInactive);

  yield takeEvery(POST_ALERT_DATA, postDataAlert);

  yield takeEvery(PUT_ALERT_DATA, putDataAlert);

  yield takeEvery(DELETE_ALERT_DATA, deleteDataAlert);

  yield takeEvery(GET_BY_ID_ALERT_DATA, getByIdDataAlert);

  yield takeEvery(UPLOAD_IMAGE_ALERT, uploadDataAlert);

  yield takeEvery(UPLOAD_IMAGE_BASE64_ALERT, uploadImageAlert);
  
  yield takeEvery(FETCH_COUNTRY_DATA_ALERT, fetchCountryDataListAlert);

}

export  {userSaga, LoadingSaga, LoadingSagaPromotionExpired, LoadingSagaPromotionOngoing};
