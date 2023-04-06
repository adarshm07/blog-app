import React, { useState, useEffect, useRef } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import SideBar from "../commonComponent/sideBar";
import Header from "../commonComponent/header";
import ImageCropper from "./ImageCropper";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  editPromotion,
  cleanReducer,
  getByIdPromotion,
  uploadImageBase64ALert,
  countryFetch,
  getByIdAlert,
  editAlert
} from "../store/users/actions";

import '../component/DropDown.css';

import $ from "jquery";
import getCroppedImg from "../helper/getImage";

import WeatherAlert from '../assests/weather-alert.svg';
import WeatherAlertClicked from '../assests/weather-alert-clicked.svg';
import PublicAlert from '../assests/public-alert.svg';
import PublicAlertClicked from '../assests/public-alert-clicked.svg';
import EmergencyAlert from '../assests/emergency-alert.svg';
import EmergencyAlertClicked from '../assests/emergency-alert-clicked.svg';
import LawAlert from '../assests/law-enforcement-alert.svg';
import LawAlertClicked from '../assests/law-enforcement-alert-clicked.svg';

export default function EditAlert() {
  var countries = {
    Country: "India",
    Region: "Ohio, United State",
    AD: "Andorra",
    A2: "Andorra Test",
    AE: "United Arab Emirates",
    AF: "Afghanistan",
    AG: "Antigua and Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AN: "Netherlands Antilles",
    AO: "Angola",
    AQ: "Antarctica",
    AR: "Argentina",
    AS: "American Samoa",
    AT: "Austria",
    AU: "Australia",
    AW: "Aruba",
    AX: "\u00c5land Islands",
    AZ: "Azerbaijan",
    BA: "Bosnia and Herzegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgium",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint Barth\u00e9lemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "British Antarctic Territory",
    BR: "Brazil",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Bouvet Island",
    BW: "Botswana",
    BY: "Belarus",
    BZ: "Belize",
    CA: "Canada",
    CC: "Cocos [Keeling] Islands",
    CD: "Congo - Kinshasa",
    CF: "Central African Republic",
    CG: "Congo - Brazzaville",
    CH: "Switzerland",
    CI: "C\u00f4te d\u2019Ivoire",
    CK: "Cook Islands",
    CL: "Chile",
    CM: "Cameroon",
    CN: "China",
    CO: "Colombia",
    CR: "Costa Rica",
    CS: "Serbia and Montenegro",
    CT: "Canton and Enderbury Islands",
    CU: "Cuba",
    CV: "Cape Verde",
    CX: "Christmas Island",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DD: "East Germany",
    DE: "Germany",
    DJ: "Djibouti",
    DK: "Denmark",
    DM: "Dominica",
    DO: "Dominican Republic",
    DZ: "Algeria",
    EC: "Ecuador",
    EE: "Estonia",
    EG: "Egypt",
    EH: "Western Sahara",
    ER: "Eritrea",
    ES: "Spain",
    ET: "Ethiopia",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falkland Islands",
    FM: "Micronesia",
    FO: "Faroe Islands",
    FQ: "French Southern and Antarctic Territories",
    FR: "France",
    FX: "Metropolitan France",
    GA: "Gabon",
    GB: "United Kingdom",
    GD: "Grenada",
    GE: "Georgia",
    GF: "French Guiana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Greenland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Equatorial Guinea",
    GR: "Greece",
    GS: "South Georgia and the South Sandwich Islands",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hong Kong SAR China",
    HM: "Heard Island and McDonald Islands",
    HN: "Honduras",
    HR: "Croatia",
    HT: "Haiti",
    HU: "Hungary",
    ID: "Indonesia",
    IE: "Ireland",
    IL: "Israel",
    IM: "Isle of Man",
    IN: "India",
    IO: "British Indian Ocean Territory",
    IQ: "Iraq",
    IR: "Iran",
    IS: "Iceland",
    IT: "Italy",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordan",
    JP: "Japan",
    JT: "Johnston Island",
    KE: "Kenya",
    KG: "Kyrgyzstan",
    KH: "Cambodia",
    KI: "Kiribati",
    KM: "Comoros",
    KN: "Saint Kitts and Nevis",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KY: "Cayman Islands",
    KZ: "Kazakhstan",
    LA: "Laos",
    LB: "Lebanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Lithuania",
    LU: "Luxembourg",
    LV: "Latvia",
    LY: "Libya",
    MA: "Morocco",
    MC: "Monaco",
    MD: "Moldova",
    ME: "Montenegro",
    MF: "Saint Martin",
    MG: "Madagascar",
    MH: "Marshall Islands",
    MI: "Midway Islands",
    MK: "Macedonia",
    ML: "Mali",
    MM: "Myanmar [Burma]",
    MN: "Mongolia",
    MO: "Macau SAR China",
    MP: "Northern Mariana Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldives",
    MW: "Malawi",
    MX: "Mexico",
    MY: "Malaysia",
    MZ: "Mozambique",
    NA: "Namibia",
    NC: "New Caledonia",
    NE: "Niger",
    NF: "Norfolk Island",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Netherlands",
    NO: "Norway",
    NP: "Nepal",
    NQ: "Dronning Maud Land",
    NR: "Nauru",
    NT: "Neutral Zone",
    NU: "Niue",
    NZ: "New Zealand",
    OM: "Oman",
    PA: "Panama",
    PC: "Pacific Islands Trust Territory",
    PE: "Peru",
    PF: "French Polynesia",
    PG: "Papua New Guinea",
    PH: "Philippines",
    PK: "Pakistan",
    PL: "Poland",
    PM: "Saint Pierre and Miquelon",
    PN: "Pitcairn Islands",
    PR: "Puerto Rico",
    PS: "Palestinian Territories",
    PT: "Portugal",
    PU: "U.S. Miscellaneous Pacific Islands",
    PW: "Palau",
    PY: "Paraguay",
    PZ: "Panama Canal Zone",
    QA: "Qatar",
    RE: "R\u00e9union",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russia",
    RW: "Rwanda",
    SA: "Saudi Arabia",
    SB: "Solomon Islands",
    SC: "Seychelles",
    SD: "Sudan",
    SE: "Sweden",
    SG: "Singapore",
    SH: "Saint Helena",
    SI: "Slovenia",
    SJ: "Svalbard and Jan Mayen",
    SK: "Slovakia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Suriname",
    ST: "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
    SU: "Union of Soviet Socialist Republics",
    SV: "El Salvador",
    SY: "Syria",
    SZ: "Swaziland",
    TC: "Turks and Caicos Islands",
    TD: "Chad",
    TF: "French Southern Territories",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tajikistan",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Turkey",
    TT: "Trinidad and Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ukraine",
    UG: "Uganda",
    UM: "U.S. Minor Outlying Islands",
    US: "United States",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Vatican City",
    VC: "Saint Vincent and the Grenadines",
    VD: "North Vietnam",
    VE: "Venezuela",
    VG: "British Virgin Islands",
    VI: "U.S. Virgin Islands",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis and Futuna",
    WK: "Wake Island",
    WS: "Samoa",
    YD: "People's Democratic Republic of Yemen",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "South Africa",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    ZZ: "Unknown or Invalid Region",
  };

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [validation, setValidation] = useState("");
  const [errors, setErrors] = useState('');
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState('');
  const [imgData2, setImgData2] = useState('');
  const [checkImg, setCheckImg] = useState(false);
  const [nextButtonActive, setNextButtonActive] = useState(false);
  const [textBoxClicked, setTextBoxClicked] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    imageURL: "",
    countries: [],
    duration: 1,
    km: 0,
    tag: ""
  });

  useEffect(() => {
    dispatch(getByIdAlert(params.id));
  }, []);


  const { alertGetId, alertPut, dataImage, addPost,predictions } = useSelector((state) => {
    console.log(state);
    return {
      alertGetId:
        state.alert.alertGetId && state.alert.alertGetId.data
          ? state.alert.alertGetId.data
          : [],
      alertPut:
        state.alert.alertPut && state.alert.alertPut.data
          ? state.alert.alertPut.data
          : [],

      dataImage:
      state.alert.upload && state.alert.upload.data
        ? state.alert.upload.data.data
        : [],
      addPost:
        state.alert.alertPost && state.alert.alertPost.data
          ? state.alert.alertPost.data
          : [],
          predictions:
          state.promotion.fetchCntyData && state.promotion.fetchCntyData.data
            ? state.promotion.fetchCntyData.data.result
            : [],
    };
  });
  const perviewImage = useSelector(
    (state) => state.alert.uploadImagePerviewUrl
  );

  useEffect(() => {
    if (dataImage.path) {
      imgData = dataImage.path;
    }
  }, [dataImage]);
  useEffect(() => {
    if (perviewImage !== "") {
      setImgData(perviewImage)
      setInputValue((perv) => ({
        ...perv,
        imageURL: perviewImage,
      }));
    }
  }, [perviewImage]);
  console.log(alertGetId)
  useEffect(() => {
    if (alertGetId.Posts) {
      setInputValue({
        title: alertGetId.Posts.title,
        description: alertGetId.Posts.description,
        imageURL: alertGetId.Posts.image,
        countries: alertGetId.Posts.countries,
        duration: alertGetId.Posts.duration,
        tag: alertGetId.Posts.tag,
        km: 0,
      });
      setImgData(alertGetId.Posts.image);
      setCollectionCountry(alertGetId.Posts.countries)
    }
  }, [alertGetId]);

  const [value, setvalue] = useState("");
  const [tabIndex, setTabIndex] = useState(1);

  const [search, setSearch] = useState('');
  console.log(search)

  var countriesArray = $.map(countries, function (value, key) {
    return { value: value, label: value };
  });

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

  // inputValue.countries = value.split(",");

  const collectFile = (e) => {
    if (e.target.files[0]) {
      
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImgData2(reader.result);
      });
      setCheckImg(true)
      // reader.readAsDataURL(e.target.files[0]);
      // const formData = new FormData();
      // formData.append("upload", e.target.files[0]);
      // dispatch(uploadImage(formData));
    }
  };
  const onCrop = async () => {
    const CropedImage = await getCroppedImg(imgData2, croppedArea);
    setImgData2(null);
    setCheckImg(false)
    dispatch(uploadImageBase64ALert(CropedImage));
  };

  // useEffect(() => {
  //   if (dataImage.path) {
  //     inputValue.imageURL = dataImage.path;
  //   }
  // }, [dataImage]);

  useEffect(() => {
    if (alertPut.status) {
      history.push("/alert");
      dispatch(cleanReducer());
    }
  }, [alertPut]);

  const removePreview = (e) => {
    console.log("fs");
    setImgData('');
    setInputValue({...inputValue,imageURL : ""})
  };

  const changeTab = () => {
    if (tabIndex == 1) {
      if (inputValue.title != "" && inputValue.tag != "") {
        setTabIndex(tabIndex + 1);
        setValidation("");
      } else {
        setValidation("Please fill all values");
      }
    }
    if (tabIndex == 2) {
      setTabIndex(tabIndex + 1);
      setValidation("");
    }
  };
  //nextButton active
useEffect(() => {
  if (tabIndex === 1) {
    inputValue.title === "" || inputValue.tag === ""
      ? setNextButtonActive(false)
      : setNextButtonActive(true);
  } else {
    collectionCountry && collectionCountry.length > 0
      ? setNextButtonActive(true)
      : setNextButtonActive(false);
  }
}, [inputValue, tabIndex]);
  const changeTabDes = () => {
    if (tabIndex <= 1) history.push("/alert");
    setTabIndex(tabIndex - 1);
  };

  const submitAppList = (e) => {
    e.preventDefault();
    let payload = {
      "title": inputValue.title,
      "description": inputValue.description,
      "image": inputValue.imageURL,
      "countries": inputValue.countries,
        "duration": inputValue.duration,
        "km": inputValue.km,
        "tag": inputValue.tag
    }
    dispatch(editAlert( payload , params.id));
  };

  const fetchCountry = (event) =>{
    setErrors('')
    dispatch(countryFetch(event.target.value))
    setSearch(event.target.value)
  }
  
  const [ collectionCountry, setCollectionCountry ] = useState([])

  // const getDataByName = (e, val) =>{
  //   let data = collectionCountry && collectionCountry.length>0 ? [ ...collectionCountry ] : []
  //   let checking = false
  //   if(collectionCountry && collectionCountry.length>0){
  //     checking = collectionCountry.find((li)=> li.description.includes(val.description))
  //   }
  //   console.log(checking)
  //   data.push({
  //     description: val.description,
  //     locationType: val.locationType

  //   })
  //   console.log(data)
  //   setCollectionCountry(data)
  //   setSearch('')
  //   // setTimeout(clearFun, 3000)
  //   dispatch(countryFetch(''))
  // }
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
        if(((val.description.includes("USA") && li.description.includes("United States")) 
        || ((val.description.includes("USA") && li.description.includes("USA") && val.description.length === 3 && li.description.length === 3)))
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
      // setNextButtonActive(true)
      // setTimeout(clearFun, 3000)
      setSearch('')
      dispatch(countryFetch(''))
    }
    
  }
  
  useEffect(() => {
    
    setInputValue({ ...inputValue, countries: collectionCountry });
    // inputValue.countries = collectionCountry; 
  

}, [ collectionCountry ])
  // inputValue.countries = collectionCountry; 

  const deleteRemoveCountry = (e,index) => {
    var array = [...collectionCountry]
    if (index !== -1) {
      array.splice(index, 1)
      setCollectionCountry(array)
    }
  }

  const clearFun = () =>{
    dispatch(cleanReducer())
  }

  console.log(imgData, imgData2)

  console.log(inputValue);

  const SelectTag = (id) => {
    setInputValue({ ...inputValue, tag : id });
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
        <div class="main">
        {checkImg && imgData2 && (
            <ImageCropper
              image={imgData2}
              onCrop={onCrop}
              setImgData={setImgData2}
              setCroppedArea={setCroppedArea}
            />
          )}
          <div class="title_bar title_breaadcrumb">
            <div class="left">
              <h4 class="page_title">Edit Alert</h4>
              <ul class="page_breaadcrumb">
                <li>
                  <a href="/alert">Alerts</a>
                </li>
                <li>
                  <span>Edit Alert</span>
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
                        <div class="add_alert_form_wrap">
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
                              style={{ display: "block",marginTop:"3.35rem" }}
                            >
                              <span id="title_count">{inputValue.title.length}</span>/50
                            </p>
                          </div>
                          <div class="form-group text_area count" style={{marginBottom:"1.5rem",overflow:"hidden",height:"max-content"}}>
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
                              style={{ display: "block", marginTop:"4.5rem" }}
                            >
                              <span id="message_count">{inputValue.description.length}</span>/150
                            </p>
                          </div>
                          {imgData ? (
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
                                src={imgData}
                                style={{ width: "20rem" }}
                              />
                            </div>
                          ) : (
                            <div class="drug-drop">
                              <div class="dg_dr" id="dg_dr">
                                <img
                                  src="../images/cloud_icon.svg"
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
                          )}

                          {!imgData &&
                          <div class="mobile_preview">
                            <label for="image_upload" id="mobile_upload">
                              <img src="/images/add_image.svg" alt="" />
                            </label>
                          </div>
                          }
                          
                        </div>
                        </div>
                       
                        <div className="col-lg-6 col xs-12" style={{padding:"0"}}>
                        <div style={{display:"flex",justifyContent:"center",height:"max-content",marginLeft:"2rem"}}>
                          <div className="tags-wrapper" style={{display:"flex",width:"25rem",height:"max-content",marginTop:"10rem",display:"flex",flexDirection:"column"}}>
                             <div className="tag-title" style={{display:"flex",flexDirection:"column"}}>
                              <span class="Tag-your-Alert"  style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "600",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: "#0e0f0f"}}>
                               Tag your Alert
                              </span>
                              <span class="Select-a-tag-related-to-your-alert" style={{ fontFamily: "Inter",fontSize: "12px",fontWeight: "600",fontStretch: "normal",fontStyle: "normal",lineHeight: "2",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                               Select a tag related to your alert
                              </span>
                             </div>
                              <div className="row" style={{marginTop:"1rem",marginBottom:"0.9rem"}}>
                                <div className="col-xl-5 col-sm-12">
                                <div className="tag-btns" onClick={() =>  SelectTag("1")} style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: inputValue.tag=="1"? "none" : "solid 1px #797e80", backgroundColor: inputValue.tag=="1"? "#e56a6a" : "#fff",display:"flex",alignItems:"center",cursor:"pointer"}}>
                                  {inputValue.tag == "1"?
                                  <img src={WeatherAlertClicked} style={{marginRight:"0.4rem"}}/>
                                  :
                                  <img src={WeatherAlert} style={{marginRight:"0.4rem"}}/>
                                  }   
                                  <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: inputValue.tag=="1"? "#fff" : "#797e80"}}>Weather Alert</span>
                                </div>
                                </div>

                                <div className="col-xl-5 col-sm-12">
                                <div onClick={() => SelectTag("2")} style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: inputValue.tag=="2"? "none" : "solid 1px #797e80", backgroundColor: inputValue.tag=="2"? "#e56a6a" : "#fff",display:"flex",alignItems:"center",cursor:"pointer"}}>
                                  {inputValue.tag === "2"?
                                  <img src={PublicAlertClicked} style={{marginRight:"0.4rem"}}/>
                                  :
                                  <img src={PublicAlert} style={{marginRight:"0.4rem"}}/>
                                  }   
                                  <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: inputValue.tag=="2"? "#fff" : "#797e80"}}>Public Advisory Alert</span>
                                </div>
                                </div>

                              </div>

                              <div className="row">
                                <div className="col-xl-6 col-sm-12">
                                <div className="tag-btns" onClick={() => SelectTag("3")} style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: inputValue.tag=="3"? "none" : "solid 1px #797e80",backgroundColor: inputValue.tag=="3"? "#e56a6a" : "#fff",display:"flex",alignItems:"center",cursor:"pointer"}}>
                                  {inputValue.tag=="3"?
                                  <img src={EmergencyAlertClicked} style={{marginRight:"0.4rem"}}/>
                                  :
                                  <img src={EmergencyAlert} style={{marginRight:"0.4rem"}}/>
                                  }   
                                  <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: inputValue.tag=="3"? "#fff" : "#797e80"}}>Emergency Alert</span>
                                </div>
                                </div>

                                <div className="col-xl-5 col-sm-12">
                                <div onClick={() => SelectTag("4")} style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: inputValue.tag=="4"? "none" : "solid 1px #797e80",backgroundColor: inputValue.tag=="4"? "#e56a6a" : "#fff",display:"flex",alignItems:"center",marginRight:"1rem",cursor:"pointer"}}>
                                {inputValue.tag=="4"?
                                  <img src={LawAlertClicked} style={{marginRight:"0.4rem"}}/>
                                  :
                                  <img src={LawAlert} style={{marginRight:"0.4rem"}}/>
                                }
                                  <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: inputValue.tag=="4"? "#fff" : "#797e80"}}>Law Enforcement Alert</span>
                                </div>
                                </div>

                              </div>
                              
                          </div>
                        </div>
                        </div>
                        </div>
                         </div>
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
                              <input type="text" onClick={() => {setTextBoxClicked(true); setShowPredictions(true);}} value={search} class="form-control location" id="autocomplete" placeholder="Add Locations" autocomplete="off" name="countries" onChange={fetchCountry}  disabled={collectionCountry.length <=4 ? false: true}/>
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
                                            <span class="delete" onClick={(e) =>{deleteRemoveCountry(e, index)}}>
                                              <img src="../images/times_round.svg"/>
                                              
                                            </span>
                                            </td>
                                            {/* {predictions && predictions.find((data)=> data.description === ele) && predictions.find((data)=> data.description === ele).locationType} */}
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
      
                          {/* <div>
                               <p class="lo_sel">Selected</p>
                               <table class="tb_lo selected_country" id="selction-ajax">
                                   <tr class="no_data_tr" >
                                       <td class="no_data">
                                           You may add maximum of five locations
                                       </td>
                                   </tr>
                                   <tr id="India"><td class="tb_lo_cr">India</td><td class="tb_lo_cd">Country<span class="delete" onclick="removeItem(this)"><img src="images/times_round.svg"/></span></td></tr>
                                   <tr id="India"><td class="tb_lo_cr">Ohio, United States</td><td class="tb_lo_cd">Region<span class="delete" onclick="removeItem(this)"><img src="images/times_round.svg"/></span></td></tr>
                               </table>
                           </div> */}
                          <hr />
                          <div class="range_section">
                            <p class="duration_day">Duration (Day)</p>
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
                              Review Alert
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
                            {inputValue.imageURL?
                            <div class="promo-image">
                              <img style={{ width: "20rem" }} src={inputValue.imageURL} />
                            </div>
                            :
                            null
                            }
                          </div>
                          <div class="prom_item">
                          <div class="promo-region">
                              <h4>Selected Tag</h4>
                              {inputValue.tag ==1?
                               <div style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: "none", backgroundColor: "#e56a6a", display:"flex",alignItems:"center",cursor:"pointer"}}>
                                 <img src={WeatherAlertClicked} style={{marginRight:"0.4rem"}}/>
                                 <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: "#fff"}}>Weather Alert</span>
                               </div>
                               :
                               inputValue.tag ==2?
                               <div style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: "none", backgroundColor: "#e56a6a", display:"flex",alignItems:"center",cursor:"pointer"}}>
                               <img src={PublicAlertClicked} style={{marginRight:"0.4rem"}}/>
                               <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: "#fff"}}>Public Advisory Alert</span>
                             </div>
                             :
                             inputValue.tag  ==3?
                             <div style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: "none", backgroundColor: "#e56a6a", display:"flex",alignItems:"center",cursor:"pointer"}}>
                             <img src={EmergencyAlertClicked} style={{marginRight:"0.4rem"}}/>
                             <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: "#fff"}}>Emergency Alert</span>
                             </div>
                             :
                             inputValue.tag  ==4?
                             <div style={{width:"max-content",height:"2.4rem",padding:"0.4rem 0.75rem",borderRadius: "16px",border: "none", backgroundColor: "#e56a6a", display:"flex",alignItems:"center",cursor:"pointer"}}>
                             <img src={LawAlertClicked} style={{marginRight:"0.4rem"}}/>
                             <span style={{ fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.67",letterSpacing: "normal",textAlign: "left",color: "#fff"}}>Law Enforcement Alert</span>
                             </div>
                              :null
                              }
                          </div>
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
                      {/* <p className="text-danger">{validation}</p> */}
                      <div class="msgBox"></div>
                      <div className="d-flex justify-content-between align-item-center w-100">
                      <div></div>
                        {/* <button
                          type="button"
                          onClick={changeTabDes}
                          class="btn btn-light btn_round me-2 d-md-inline-block d-none"
                        >
                          <i class="fa fa-angle-left"></i>
                          Back
                        </button> */}

                        <div className="d-md-bock w-md-auto w-100 d-flex justify-content-between align-item-center">
                          <button
                            type="button"
                            class="discard btn btn-default btn_round"
                            data-toggle="modal"
                            data-target="#discard_modal"
                          >
                            Discard
                          </button>

                          {tabIndex === 3 ? (
                            <button
                              type="submit"
                              class="btn btn-primary btn_round"
                              onClick={submitAppList}
                            >
                              Issue
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
                    class="btn btn-primary btn_round"
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
                  onClick={()=> history.push("/alert")}
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
