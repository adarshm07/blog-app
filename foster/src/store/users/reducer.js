import {
  PROMOTION_SUCCESS,
  PROMOTION_FAILED,
  POST_PROMOTION_DATA,
  PUT_PROMOTION_DATA,
  GET_PROMOTION_DATA,
  DELETE_PROMOTION_DATA,
  GET_BY_ID_PROMOTION_DATA,
  UPLOAD_IMAGE,
  CLEAR_STATE,
  UPLOAD_IMAGE_BASE64,
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
  CLEAR_STATE_ALERT,
  UPLOAD_IMAGE_BASE64_ALERT,
  FETCH_COUNTRY_DATA_ALERT,
  GET_ALERT_INACTIVE_DATA,
  CHANGE_STATUS,
  
} from "./actionConstant";

const INIT_STATE = {
  proGet: [],
  proGetErr: [],
  proExpiredGet: [],
  proExpiredGetErr: [],

  proPost: [],
  proPostErr: [],

  proPut: [],
  proPutErr: [],

  proDel: [],
  proDelErr: [],

  proGetId: [],
  proGetIdErr: [],

  upload: {},

  fetchCntyData: [],
  fetchCntyDataErr:[],

  uploadImagePerviewUrl: "",

  alertGet: [],
  alertGetErr: [],
  alertExpiredGet: [],
  alertExpiredGetErr: [],

  alertPost: [],
  alertPostErr: [],

  alertPut: [],
  alertPutErr: [],

  alertDel: [],
  alertDelErr: [],

  alertGetId: [],
  alertGetIdErr: [],

  upload: {},

  fetchCntyData: [],
  fetchCntyDataErr:[],

  uploadImagePerviewUrl: "",
};




export const promotion = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROMOTION_SUCCESS:
      switch (action.payload.actionType) {
        case GET_PROMOTION_DATA:
          return {
            ...state,
            proGet: action.payload.data,
          };
          case GET_PROMOTION_EXPIRED_DATA:
          return {
            ...state,
            proExpiredGet: action.payload.data,
          };
        case POST_PROMOTION_DATA:
          console.log(action.payload.data);
          return {
            ...state,
            proPost: action.payload.data,
          };
        case PUT_PROMOTION_DATA:
          return {
            ...state,
            proPut: action.payload.data,
          };
        case DELETE_PROMOTION_DATA:
          return {
            ...state,
            proDel: action.payload.data,
          };
        case GET_BY_ID_PROMOTION_DATA:
          return {
            ...state,
            proGetId: action.payload.data,
          };
        case UPLOAD_IMAGE:
          return {
            ...state,
            upload: action.payload.data,
          };
        case UPLOAD_IMAGE_BASE64:
          return {
            ...state,
            uploadImagePerviewUrl: action.payload.data.fileUrl,
          };
        case FETCH_COUNTRY_DATA:
          return {
            ...state,
            fetchCntyData: action.payload.data,
          };
        default:
          return state;
      }

    case PROMOTION_FAILED:
      switch (action.payload.actionType) {
        case GET_PROMOTION_DATA:
          return {
            ...state,
            proGetErr: action.payload.error,
          };
          case GET_PROMOTION_EXPIRED_DATA:
          return {
            ...state,
            proExpiredGetErr: action.payload.data,
          };
        case POST_PROMOTION_DATA:
          return {
            ...state,
            proPostErr: action.payload.error,
          };
        case PUT_PROMOTION_DATA:
          return {
            ...state,
            proPutErr: action.payload.error,
          };
        case DELETE_PROMOTION_DATA:
          return {
            ...state,
            proDelErr: action.payload.error,
          };
        case GET_BY_ID_PROMOTION_DATA:
          return {
            ...state,
            proGetIdErr: action.payload.error,
          };
          case FETCH_COUNTRY_DATA:
          return {
            ...state,
            fetchCntyDataErr: action.payload.data,
          };
        default:
          return state;
      }
    case CLEAR_STATE:
      return {
        ...state,
        proGet: [],
        proGetErr: [],

        proPost: [],
        proPostErr: [],

        proPut: [],
        proPutErr: [],

        proDel: [],
        proDelErr: [],

        proGetId: [],
        proGetIdErr: [],

        fetchCntyData: [],
        fetchCntyDataErr:[],

        upload: {},
      };
    default:
      return state;
  }
};


export const alert = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ALERT_DATA:
          console.log(action.payload.data);
          return {
            ...state,
            alertGet: action.payload.data,
          };
          case GET_ALERT_INACTIVE_DATA:
          return {
            ...state,
            alertExpiredGet: action.payload.data,
          };
        case POST_ALERT_DATA:
          console.log(action.payload.data);
          return {
            ...state,
            alertPost: action.payload.data,
          };
        case PUT_ALERT_DATA:
          return {
            ...state,
            alertPut: action.payload.data,
          };
        case DELETE_ALERT_DATA:
          return {
            ...state,
            alertDel: action.payload.data,
          };
        case GET_BY_ID_ALERT_DATA:
          return {
            ...state,
            alertGetId: action.payload.data,
          };
        case UPLOAD_IMAGE_ALERT:
          return {
            ...state,
            upload: action.payload.data,
          };
        case UPLOAD_IMAGE_BASE64_ALERT:
          return {
            ...state,
            uploadImagePerviewUrl: action.payload.data.fileUrl,
          };
        case FETCH_COUNTRY_DATA_ALERT:
          return {
            ...state,
            fetchCntyData: action.payload.data,
          };
        default:
          return state;
      }

    case ALERT_FAILED:
      switch (action.payload.actionType) {
        case GET_ALERT_DATA:
          return {
            ...state,
            alertGetErr: action.payload.error,
          };
          case GET_ALERT_INACTIVE_DATA:
          return {
            ...state,
            alertExpiredGetErr: action.payload.data,
          };
        case POST_ALERT_DATA:
          return {
            ...state,
            alertPostErr: action.payload.error,
          };
        case PUT_ALERT_DATA:
          return {
            ...state,
            alertPutErr: action.payload.error,
          };
        case DELETE_ALERT_DATA:
          return {
            ...state,
            alertDelErr: action.payload.error,
          };
        case GET_BY_ID_ALERT_DATA:
          return {
            ...state,
            alertGetIdErr: action.payload.error,
          };
          case FETCH_COUNTRY_DATA_ALERT:
          return {
            ...state,
            fetchCntyDataErr: action.payload.data,
          };
        default:
          return state;
      }
    case CLEAR_STATE_ALERT:
      return {
        ...state,
        alertGet: [],
        alertGetErr: [],

        alertPost: [],
        alertPostErr: [],

        alertPut: [],
        alertPutErr: [],

        alertDel: [],
        alertDelErr: [],

        alertGetId: [],
        alertGetIdErr: [],

        fetchCntyData: [],
        fetchCntyDataErr:[],

        upload: {},
      };
    default:
      return state;
  }
};

