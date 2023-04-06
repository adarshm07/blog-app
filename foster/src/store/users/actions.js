import {
  PROMOTION_SUCCESS,
  PROMOTION_FAILED,
  POST_PROMOTION_DATA,
  PUT_PROMOTION_DATA,
  GET_PROMOTION_DATA,
  DELETE_PROMOTION_DATA,
  GET_BY_ID_PROMOTION_DATA,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_BASE64,
  CLEAR_STATE,
  FETCH_COUNTRY_DATA,
  GET_PROMOTION_EXPIRED_DATA,
  

  ALERT_SUCCESS,
  ALERT_FAILED,
  POST_ALERT_DATA,
  PUT_ALERT_DATA,
  GET_ALERT_DATA,
  DELETE_ALERT_DATA,
  GET_BY_ID_ALERT_DATA,
  UPLOAD_IMAGE_ALERT,
  UPLOAD_IMAGE_BASE64_ALERT,
  CLEAR_STATE_ALERT,
  FETCH_COUNTRY_DATA_ALERT,
  GET_ALERT_INACTIVE_DATA
} from "./actionConstant";

export const apiSuccessPromotion = (actionType, data) => ({
  type: PROMOTION_SUCCESS,
  payload: { actionType, data },
});

export const apiFailPromotion = (actionType, data) => ({
  type: PROMOTION_FAILED,
  payload: { actionType, data },
});

export const uploadImage = (CropedImage) => ({
  type: UPLOAD_IMAGE,
  payload: CropedImage,
});

export const uploadImageBase64 = (CropedImage) => ({
  type: UPLOAD_IMAGE_BASE64,
  payload: CropedImage,
});

export const addPromotion = (inputValue) => ({
  type: POST_PROMOTION_DATA,
  payload: inputValue,
});

export const cleanReducer = () => ({
  type: CLEAR_STATE,
  payload: { actionConstant: CLEAR_STATE },
});

export const getAllPromotion = () => ({
  type: GET_PROMOTION_DATA,
});


export const getAllPromotionExpried = () => ({
  type: GET_PROMOTION_EXPIRED_DATA,
});


export const getByIdPromotion = (id) => ({
  type: GET_BY_ID_PROMOTION_DATA,
  payload: id,
});

export const editPromotion = (inputValue, id) => ({
  type: PUT_PROMOTION_DATA,
  payload: { inputValue, id },
});

export const deletePromotion = (id) => ({
  type: DELETE_PROMOTION_DATA,
  payload: id,
});

export const countryFetch = (str) =>({
  type: FETCH_COUNTRY_DATA,
  payload: str
})

// ALERT -->


export const apiSuccessAlert = (actionType, data) => ({
  type: ALERT_SUCCESS,
  payload: { actionType, data },
});

export const apiFailAlert = (actionType, data) => ({
  type: ALERT_FAILED,
  payload: { actionType, data },
});

export const uploadImageAlert = (CropedImage) => ({
  type: UPLOAD_IMAGE_ALERT,
  payload: CropedImage,
});

export const uploadImageBase64ALert = (CropedImage) => ({
  type: UPLOAD_IMAGE_BASE64_ALERT,
  payload: CropedImage,
});

export const addAlert = (inputValue) => ({
  type: POST_ALERT_DATA,
  payload: inputValue,
});

export const cleanReducerAlert = () => ({
  type: CLEAR_STATE_ALERT,
  payload: { actionConstant: CLEAR_STATE },
});

export const getAllAlert = () => ({
  type: GET_ALERT_DATA,
});


export const getAllAlertInactive = () => ({
  type: GET_ALERT_INACTIVE_DATA,
});


export const getByIdAlert = (id) => ({
  type: GET_BY_ID_ALERT_DATA,
  payload: id,
});

export const editAlert = (inputValue, id) => ({
  type: PUT_ALERT_DATA,
  payload: { inputValue, id },
});

export const deleteAlert = (id) => ({
  type: DELETE_ALERT_DATA,
  payload: id,
});

export const countryFetchALert = (str) =>({
  type: FETCH_COUNTRY_DATA_ALERT,
  payload: str
})
