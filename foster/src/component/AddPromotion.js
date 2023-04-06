import React, { useState, useEffect, useRef , useReducer} from "react";
// import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import SideBar from "../commonComponent/sideBar";
import Header from "../commonComponent/header";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImageCropper from "./ImageCropper";
import "react-image-crop/dist/ReactCrop.css";
import DropDown from "./DropDown";

import {
  uploadImage,
  addPromotion,
  cleanReducer,
  uploadImageBase64,
  countryFetch,
} from "../store/users/actions";
import $ from "jquery";
import getCroppedImg from "../helper/getImage";

const initState = {
  selectedCountry: '',
};

const Reducer = (state, action) => {
  switch (action.type) {
      case 'ONCHANGE': {
          const { target } = action.payload;
          return {
              ...state,
              [target.name]: target.value,
              loading: false
          };
      }
      case 'ONCHANGE_CHECKBOX': {
          const { target } = action.payload;
          return {
              ...state,
              [target.name]: target.checked,
              loading: false
          };
      }
      case 'SETDATA': {
          const target = action.payload;
          return {
              ...state,
              [target.name]: target.value,
          };
      }
      case 'VALIDATE': {
          return {
              ...state,
              validate: action.payload
          };
      }
      case 'VALIDATECHECK': {
          const target = action.payload;
          return {
              ...state,
              [target.name]: target.value,
          };
      }
      case 'LOAD': {
          return {
              ...state,
              loading: action.payload
          };
      }
      default: {
          return { ...state };
      }
  }
};

export default function Promotion() {
  const [state, dispatch1] = useReducer(Reducer, initState);
  const [validation, setValidation] = useState("");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const [imgData, setImgData] = useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [textBoxClicked, setTextBoxClicked] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);
  const history = useHistory();
  const [nextButtonActive, setNextButtonActive] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    imageURL: "",
    countries: [],
    duration: 1,
    km: 0,
  });
  const [countries, setCountries] = useState([]);
  const [value, setvalue] = useState("");
  const [tabIndex, setTabIndex] = useState(1);

  var countriesArray = $.map(countries, function (value, key) {
    return { value: value, label: value };
  });
  const inputRef = useRef();

  const handleOnchange = (val) => {
    if (val.split(",").length < 7) {
      setvalue(val);
      setValidation("");
    } else {
      setValidation("Country limit over max select 5 country");
    }
  };

  const handleInput = (e) => {
    if(e.target.name == 'title' && e.target.value.length === 1){
      e.target.value = e.target.value.toUpperCase();
    }
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
   const [ collectionCountry, setCollectionCountry ] = useState([])

   console.log(collectionCountry)
  const getDataByName = (e, val) =>{
    let data = collectionCountry && collectionCountry.length>0 ? [ ...collectionCountry ] : []
    let checking = false;
    let ReverseChecking = false;
    let sameCountry = false;
    if(collectionCountry && collectionCountry.length>0){
      checking = collectionCountry.find((li)=> val.description.includes(li.description));
      ReverseChecking = collectionCountry.find((li)=> li.description.includes(val.description));
      collectionCountry.map((li)=> {
        if(((val.description.includes("USA") && li.description.includes("United States")) || ((val.description.includes("USA") && li.description.includes("USA") && val.description.length === 3 && li.description.length === 3)))
        ||(li.description.includes("USA") && val.description.includes("United States"))
        || (li.description.includes("CA") && val.description.includes("California")) 
        || (val.description.includes("CA") && li.description.includes("California"))){
            sameCountry = true;
        }
        if((val.description.includes("UAE") && li.description.includes("United Arab Emirates"))
        ||(li.description.includes("UAE") && val.description.includes("United Arab Emirates"))){
             sameCountry = true;
        }
        if((val.description.includes("UK") && li.description.includes("United Kingdom"))
        ||(li.description.includes("UK") && val.description.includes("United Kingdom"))){
            sameCountry = true;
           }
        
      });
    }
    console.log(checking)
    if((checking && checking.description) || (ReverseChecking && ReverseChecking.description) || sameCountry){
      // alert('1')
      setErrors('There are overlapping locations')
    }else{
      // alert('2')
      data.push({
        description: val.description,
        locationType: val.locationType
  
      })
      setCollectionCountry(data)
      // setTimeout(clearFun, 3000)
      setSearches('')
      dispatch(countryFetch(''))
    }
    
  }
  useEffect(() => {
    
      setInputValue({ ...inputValue, countries: collectionCountry });
      // inputValue.countries = collectionCountry; 
    

}, [ collectionCountry ])
console.log(inputValue)

  const deleteRemoveCountry = (e,index) => {
    console.log(index)
    var array = [...collectionCountry]
    if (index !== -1) {
      array.splice(index, 1)
      setCollectionCountry(array)
    }
  }


  const collectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
    }
  };

  const onCrop = async () => {
    const CropedImage = await getCroppedImg(imgData, croppedArea);
    setImgData(null);
    dispatch(uploadImageBase64(CropedImage));
  };

  const { dataImage, addPost,predictions } = useSelector((state) => {
    console.log(state)
    return {
      dataImage:
        state.promotion.upload && state.promotion.upload.data
          ? state.promotion.upload.data.data
          : [],
      addPost:
        state.promotion.proPost && state.promotion.proPost.data
          ? state.promotion.proPost.data
          : [],
      predictions:
        state.promotion.fetchCntyData && state.promotion.fetchCntyData.data
          ? state.promotion.fetchCntyData.data.result
          : [],
    };
  });

  const perviewImage = useSelector(
    (state) => state.promotion.uploadImagePerviewUrl
  );

  useEffect(() => {
    if (dataImage.path) {
      inputValue.imageURL = dataImage.path;
    }
  }, [dataImage]);
  useEffect(() => {
    if (perviewImage !== "") {
      setInputValue((perv) => ({
        ...perv,
        imageURL: perviewImage,
      }));
    }
  }, [perviewImage]);

  useEffect(() => {
    if (addPost.status) {
      history.push("/promotion");
      dispatch(cleanReducer());
    }
  }, [addPost]);

  //nextButton active
  useEffect(() => {
    if (tabIndex === 1) {
      inputValue.title === "" || inputValue.imageURL === ""
        ? setNextButtonActive(false)
        : setNextButtonActive(true);
    } else {
      collectionCountry.length > 0
        ? setNextButtonActive(true)
        : setNextButtonActive(false);
    }
  }, [inputValue, tabIndex]);

  const removePreview = (e) => {
    // setImgData(null);
    setInputValue((perv) => ({ ...perv, imageURL: "" }));
  };

  const submitAppList = (e) => {
    e.preventDefault();
    const values = inputValue;
    values.imageURL = perviewImage;
    dispatch(addPromotion(values));
  };

  const changeTab = () => {
    console.log(tabIndex)
    if (tabIndex == 1) {
      if (inputValue.title != "" && inputValue.imageURL !== "") {
        setTabIndex(tabIndex + 1);
        setValidation("");
      } else {
        setValidation("");
      }
    }
    if (tabIndex == 2) {
      if (inputValue.countries.length > 0) {
        setTabIndex(tabIndex + 1);
        setValidation("");
      } else {
        setValidation("");
      }
    }
  };
  const changeTabDes = () => {
    if (tabIndex <= 1) history.push("/promotion");
    setTabIndex(tabIndex - 1);
  };
  const [searchText, setSearches] = useState('');
  console.log(searchText)
  const fetchCountry = (event) =>{
    console.log(event.target.value)
    setErrors('')
    dispatch(countryFetch(event.target.value))
    setSearches(event.target.value)
  }

  
  const clearFun = () =>{
    dispatch(cleanReducer())
  }


  const CountryRef = useRef(null);

  useEffect(() => {
    if(textBoxClicked){
      document.addEventListener('click', handleClickOutside, true);
    }
  }, [textBoxClicked])
  
  const handleClickOutside = (e) => {
    setTextBoxClicked(false);
    if(!CountryRef.current.contains(e.target)){
      setShowPredictions(false);
    }else{
      console.log("On");
    }
  }

   

  return (
    <>
      <div class="content_wrapper">
        <SideBar />
        <Header />

        {/* <ReactCrop src="images/1.png" /> */}

        <div class="main">
          {imgData && (
            <ImageCropper
              image={imgData}
              onCrop={onCrop}
              setImgData={setImgData}
              setCroppedArea={setCroppedArea}
            />
          )}
          <div class="title_bar title_breaadcrumb">
            <div class="left">
              <h4 class="page_title">Add Promotion</h4>
              <ul class="page_breaadcrumb">
                <li>
                  <a href="/promotion">Promotions</a>
                </li>
                <li>
                  <span>Add Promotion</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="container">
            <div class="promotions-background">
              <div
                id="appListForm"
              >
                <div class="">
                  {/* <div class="mobile_back d-block d-md-none"> <button
                          type="button"
                          onClick={changeTabDes}
                          class="btn text-dark btn-transparent p-0 mt-3"
                        >
                          <i class="fa fa-angle-left"></i>
                          Back
                        </button></div> */}
                  <div class="tab-content">
                    {tabIndex == 1 && (
                      <div id="step-1" class="tab-pane active" role="tabpanel">
                          <div className="container" style={{padding:"0"}}>
                        <div className="row">
                        <div className="tag-divider col-lg-6">
                        <div class="add_promotion_form_wrap">
                          <div class="form-group input count">
                            <input
                              type="text"
                              name="title"
                              class="form-control what_new input_title_count"
                              id="input_title_count"
                              placeholder="Whats New?"
                              maxlength="50"
                              value={inputValue.title}
                              onChange={handleInput}
                            />
                            <p
                              class="count_pos"
                              id="count_title"
                              style={{ display: "none",marginTop:"3.35rem" }}
                            >
                              <span id="title_count">0</span>/50
                            </p>
                          </div>
                          <div class="form-group text_area count"style={{marginBottom:"1.5rem"}}>
                            <textarea
                              class="form-control txt_ar"
                              id="input_message_count"
                              placeholder="Narrate More..."
                              maxlength="150"
                              name="description"
                              value={inputValue.description}
                              onChange={handleInput}
                            ></textarea>
                            <p
                              class="count_pos"
                              id="count_content"
                              style={{ display: "none",marginTop:"4.6rem" }}
                            >
                              <span id="message_count">0</span>/150
                            </p>
                          </div>
                          {inputValue.imageURL === "" ? (
                            <div class="drug-drop">
                              <div class="dg_dr" id="dg_dr">
                                <img
                                  src="images/cloud_icon.svg"
                                  class="cloud"
                                />
                                <p class="drop_title">
                                  Drag and drop your image or
                                </p>
                                <label
                                  class="btn btn-primary"
                                  for="image_upload"
                                >
                                  Choose File
                                </label>
                                <input
                                  type="file"
                                  class="item-img file center-block"
                                  accept="image/*"
                                  name="file_photo"
                                  id="image_upload"
                                  onChange={collectFile}
                                />
                              </div>
                            </div>
                          ) : (
                            <div class="upload_preview">
                              <div
                                class="cross_icon"
                                id="cross_icon"
                                onClick={removePreview}
                              >
                                <i
                                  class="las la-times"
                                  onClick={removePreview}
                                ></i>
                              </div>
                              <img
                                className="playerProfilePic_home_tile rounded"
                                src={inputValue.imageURL}
                                style={{ width: "20rem" }}
                              />
                            </div>
                          )}
                          {inputValue.imageURL === "" &&
                          <div class="mobile_preview">
                            <label for="image_upload" id="mobile_upload">
                              <img src="/images/add_image.svg" alt="" />
                            </label>
                          </div>}
                          {inputValue.imageURL === "" && (
                            <div
                              class="war upload_info"
                              style={{ width: "254px" }}
                            >
                              <p>
                                <i class="las la-info-circle"></i>&nbsp;Promotion
                                requires an image
                              </p>
                            </div>
                          )}
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="col-lg-6" style={{padding:"0"}} />
                      </div>
                  
                    )}
                    {tabIndex == 2 && (
                      <div id="step-2" class="tab-pane active" role="tabpanel">
                        <div class="add_promotion_form_wrap location_step">
                          <div class="location_duration">
                            Location & Duration
                          </div>
                          <span class="We-suggest-to-add-maximum-locations-to-get-best-results">
                            We suggest to add maximum locations to get best results.
                          </span>
                          <div class="form-group reg">
                            <div className="left-label-with-rg-error-msg">
                            <label class="regional">Regional</label>
                            {errors &&
                              <div class="cstom-text-alert cstom-text-alert-danger" >
                              {errors && errors}
                                    </div>
                            }
                            </div>
                            <div class="search_input_icon">
                              <i class="fa fa-search"></i>
                              <input type="text" 
                              value={searchText} 
                              class="form-control location" 
                              id="searchText" 
                              placeholder="Add Locations" 
                              name="searchText" 
                              onClick={() => {setTextBoxClicked(true); setShowPredictions(true);}}
                              onChange={fetchCountry} 
                              disabled={collectionCountry.length <=4 ? false: true}/>
                            </div>
                            
                            {predictions && showPredictions?
                            <div class="autocomplete-suggestions" ref={CountryRef}>
                            {predictions && predictions.map((ele,index) =>{
                              return (
                                <div class="autocomplete-suggestion" data-index={index} data-value={ele.description} onClick={(e)=> getDataByName(e, ele)} style={{
                                  cursor: collectionCountry.length <=4 ? '' : 'no-drop'
                                }}>
                                  <strong data-value={ele.description} style={{
                                      cursor: collectionCountry.length <=4 ? '' : 'no-drop'
                                    }}>{ele.description} </strong>
                                    <span >{ele.locationType === 'city' ? 'region' : ele.locationType}</span>
                                     {/* - {ele.locationType} */}
                                  </div>
                              //     <div class="overlap">
                              //     <span class="address">Kottayam, India</span> <span class="city">City</span>
                              // </div>
                              )
                            })}
                            </div>
                            :
                            null
                            }

                            <div className="my-3">
                            {collectionCountry.length >0 &&
                                <p class="lo_sel">Selected</p>}
                                <table class="tb_lo selected_country" id="selction-ajax">
                                    <tbody>
                                  
                                    {collectionCountry && collectionCountry.map((ele,index) =>{
                                      return (
                                        <tr id={index}>
                                          <td class="tb_lo_cr">{ele.description}</td>
                                          <td class="tb_lo_cd">{ele.locationType === 'city' ? 'region' : ele.locationType}
                                            <span class="delete" onClick={(e) =>{deleteRemoveCountry(e,index)}}>
                                              <img src="../images/times_round.svg"/>
                                            </span>
                                            </td>
                                          </tr>
                                          
                                          
                                    
                                      )
                                    })}
                                    {collectionCountry.length >=6 && (
                                       <tr class="no_data_tr">
                                        <td class="no_data">
                                            You may add maximum of five locations
                                        </td>
                                      </tr>
                                      )
                                    }
                                    </tbody></table>
                            </div>
                            
                            {collectionCountry.length === 0  &&
                            <div class="We-suggest-to-add-maximum-locations-to-get-best-results mt-5 mb-5">
                                You may add maximum number of five location.
                              </div>}
                          </div>
                          <hr />
                          <div class="range_section">
                            <p class="duration_day ">Duration (Day)</p>
                            <div class="range_points justify-content-between">
                              <span id="sliderStatusMin">{inputValue.duration}</span>
                              <input
                                type="range"
                                id="vol"
                                name="duration"
                                min="1"
                                max="30"
                                value={inputValue.duration}
                                onChange={handleInput}
                                class="w-100"
                              />
                              <span>30</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {tabIndex == 3 && (
                      <div id="step-3" class="tab-pane active" role="tabpanel">
                        <div class="promotion_preview">
                          <div class="prom_item">
                          <h1 className="mb-4" style={{fontFamily: "Inter", fontSize: "18px", fontWeight: "600", fontStretch: "normal", fontStyle: "normal", lineHeight: '1.17', letterSpacing: "normal", textAlign: "left", color: "#000"}}>
                              Review Promotion
                            </h1>
                            <h1 class="promo-title rev_prmm text-capitalize">
                              {inputValue.title}
                            </h1>
                            {/* <h3 class="promo-subtitle">
                                   Chocolate available in Kottayam
                               </h3> */}
                              <p class="promo-content" style={{fontSize:"14px",wordWrap:"break-word"}}>
                              {inputValue.description}
                            </p>
                            <div class="promo-image">
                              <img src={perviewImage} alt="image 1" />
                            </div>
                          </div>
                          <div class="prom_item">
                            <div class="promo-region">
                              <h4>Selected Regions</h4>
                              <ul className="">
                                {inputValue.countries &&
                                  inputValue.countries.map((ele) => {
                                    return <li>{ele.description} - {ele.locationType === 'city' ? 'region' : ele.locationType}</li>;
                                  })}
                              </ul>
                            </div>
                            <div class="promo-region">
                              <h4>Duration</h4>
                              {inputValue.duration>1?
                                <p style={{fontSize:"14px"}}>{inputValue.duration} Days</p>
                                :
                                <p style={{fontSize:"14px"}}>{inputValue.duration} Day</p>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div class="promo-sec-footer actionBar">
                      <p className="text-danger">{validation}</p>
                      <div class="msgBox"></div>

                      {/* {tabIndex != 3 ? ( */}
                      <div className="d-flex justify-content-between align-item-center w-100">
                      <div></div>
                        {/* ) : ( */}
                        <div className="d-md-bock w-md-auto w-100 d-flex justify-content-between align-item-center">
                          <button
                            type="button"
                            class="discard btn btn-default btn_round"
                            data-toggle="modal"
                            data-target="#discard_modal"
                          >
                            Discard
                          </button>
                          {/* )} */}
                          {tabIndex === 3 ? (
                            <button
                              type="submit"
                              class="btn btn-primary btn_round"
                              onClick={submitAppList}
                            >
                              Promote
                            </button>
                          ) : (
                            <span
                              onClick={changeTab}
                              class={`btn btn-primary btn_round ${
                                !nextButtonActive && "disabled"
                              } `}
                            >
                              Next
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="cropImagePop"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">
                <span class="crop_icon">
                  <img src="images/crop.svg" alt="" />
                </span>
                Crop Image
              </h4>
            </div>
            <div class="modal-body">
              <div id="upload-demo" class="center-block"></div>

              <div class="crop_actions">
                <div class="zoom_slide"></div>
                <div class="action_buttons">
                  <button
                    type="button"
                    class="btn btn-default btn_round"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    id="cropImageBtn"
                    class=" btn btn-primary btn_round"
                    style={{padding: "5px 30px"}}
                  >
                    Crop
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="discard_modal">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-body">
              <h5 class="modal-title modal_title_sm">
                You have made changes. Do you want to discard changes?
              </h5>
              <div class="text-right delete_modal_btns">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={()=> history.push("/promotion")}
                  class="btn btn-danger delete-btn"
                  data-dismiss="modal"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}