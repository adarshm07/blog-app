import React, { useEffect, useState } from "react";
import SideBar from "../commonComponent/sideBar";
import Header from "../commonComponent/header";
import PromotionCard from "./PromotionCard";
import ExpiredPromotion from "./ExpiredPromotion";
import AlertDetail from "./AlertDetail";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPromotion,
  getAllPromotionExpried,
  deletePromotion,
  cleanReducer,
  getAllAlert,
  getAllAlertInactive,
  deleteAlert,
  cleanReducerAlert
} from "../store/users/actions";
import AlertCard from "./AlertCard";
import Select from '@mui/material/Select';
import InactiveAlert from "./InactiveAlert";
import axios from "axios";
import config from '../helper/token';
import FormHelperText from '@mui/material/FormHelperText';
import NoAlert from "./NoActiveAlert";
import NoInactiveAlert from "./NoInactiveAlert";
import {LoadingSaga} from '../store/users/saga';

export default function Alerts() {
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [detail, setDetail] = useState(null);

  const [active, setActive] = useState("active");
  const [statusChange, setStatusChange] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedType, setSelectedType] = useState("ALL");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    dispatch(getAllAlert());
    dispatch(getAllAlertInactive());
  }, [statusChange]);

  const { proGet, proDel,proExpiredGet } = useSelector((state) => {
    return {
      proGet:
        state.promotion.proGet && state.promotion.proGet.data
          ? state.promotion.proGet.data.Post
          : [],
      proExpiredGet:
          state.promotion.proExpiredGet && state.promotion.proExpiredGet.data
            ? state.promotion.proExpiredGet.data.Post
            : [],          
      proDel:
        state.promotion.proDel && state.promotion.proDel.data
          ? state.promotion.proDel.data
          : [],
    };
  });

  const { alertGet, alertDel, alertExpiredGet } = useSelector((state) => {
    return {
      alertGet:
        state.alert.alertGet && state.alert.alertGet.data
          ? state.alert.alertGet.data.Post
          : [],
      alertExpiredGet:
          state.alert.alertExpiredGet && state.alert.alertExpiredGet.data
            ? state.alert.alertExpiredGet.data.Post
            : [],            
      alertDel:
        state.alert.alertDel && state.alert.alertDel.data
          ? state.alert.alertDel.data
          : [],
    };
  });

  const deleteFunction = () => {
    deleteAlert(deleteId);
  };

  const deleteAlert = async () => {
    await axios.post(`https://spherehunt.app:5000/api/v1/alert/delete/${deleteId}`,{
      headers: { "x-token": config },
    }).then((res) => {
      console.log(res.data);
      setStatusChange(!statusChange);
    }).catch((e) => {
      console.log(e);
    })
  }
  

  useEffect(() => {
    if (alertDel.status) {
      dispatch(cleanReducerAlert());
      dispatch(getAllAlert());
      dispatch(getAllAlertInactive());
    }
  }, [alertDel]);



  const renderAlertTypes = async (e) => {
    setLoading(true);
    await axios.post(`https://spherehunt.app:5000/api/v1/alert/${selectedType.toUpperCase()}`,{
      headers: { "x-token": config },
    }).then((res) => {
      console.log(res.data);
      setPosts(res.data.Post);
    }).finally(() => {
      setLoading(false);
    }).catch((e) => {
      console.log(e);
    })
  }

  useEffect(async () => {
    renderAlertTypes();
   }, [selectedType,statusChange]);
 
  


  const showDetailHandler = (data) => {
    setDetail(data);
  };

  {console.log(alertExpiredGet)}



  const changeStatus = async (e) => {
    e.preventDefault();
    const data = {id : statusId, status: "INACTIVE"}
    await axios.post('https://spherehunt.app:5000/api/v1/alert/change/status',data,{
      headers: { "x-token": config },
    }).then((res) => {
      console.log(res.data);
      setStatusChange(!statusChange);
    }).catch((e) => {
      console.log(e);
    })
  }

  const changeStatusActive = async (e) => {
    e.preventDefault();
    const data = {id : statusId, status: "ACTIVE"}
    await axios.post('https://spherehunt.app:5000/api/v1/alert/change/status',data,{
      headers: { "x-token": config },
    }).then((res) => {
      console.log(res.data);
      setStatusChange(!statusChange);
    }).catch((e) => {
      console.log(e);
    })
  }

  console.log(LoadingSaga);

  return (
    <>
      <div class="content_wrapper">
        <SideBar />
        <Header />

        <div class="main">
          <div class="title_bar">
            <div class="left">
              <h4 class="page_title">Alerts</h4>
            </div>
            <div class="right d-md-block d-none">
            {alertGet.length > 0 && active === "active"?
              <a href="/addAlert" class="btn btn-primary btn_round">
                <i class="las la-plus"></i> Add Alert
              </a>
              :
              null
            }
            {active === "inactive"?
              <a href="/addAlert" class="btn btn-primary btn_round">
                <i class="las la-plus"></i> Add Alert
              </a>
              :
              null
            }
            </div>
          </div>
          <div class="container">

            <ul class="nav nav-tabs promo_tabs" style={{justifyContent:"space-between"}}>
              
              <div style={{display:"flex",maxWidth:"12rem"}}>
              <li onClick={() => setActive("active")}>
                <a data-toggle="tab" href="#ongoing" class={active === "active"? "active" : ""}>
                  Active
                </a>
              </li>
     
              
              <li onClick={() => setActive("inactive")}>
                <a data-toggle="tab" href="#expired" class={active === "inactive"? "active" : ""}>
                  Inactive
                </a>
              </li>
              </div>

            {active === "inactive"?
              <li>
                  <div className="filter-section" style={{display:"flex"}}>

                  <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     label="Filter"
                     value={selectedType}
                     onChange={(e) => {setSelectedType(e.target.value)}}
                     style={{width:"7rem",height:"2.25rem"}}
                   >
                     <MenuItem value={"ALL"}>All</MenuItem>
                     <MenuItem value={"Inactive"}>Inactive</MenuItem>
                     <MenuItem value={"Expired"}>Expired</MenuItem>
                   </Select>
                  </FormControl>
                  </div>

              </li>
              :
              null
            }

            </ul>


            {detail && (
              <AlertDetail
                data={detail}
                onClose={() => setDetail(null)}
                setDeleteId={setDeleteId}
              />
            )}
            {console.log(alertGet)}
            <div class="tab-content">
              
              {active==="active"?

              <div id="ongoing" class="tab-pane fade in active show">
                <div class="row">
                  {LoadingSaga?
                    null
                    :
                    alertGet.length>0?
                    alertGet.map((data) => {
                      return (
                        <AlertCard
                          data={data}
                          setDeleteId={setDeleteId}
                          setStatusId={setStatusId}
                          statusChange={statusChange}
                          setStatusChange= {setStatusChange}
                          showDetail={(data) => showDetailHandler(data)}
                        />
                      );
                    })
                    :
                    <NoAlert />
                  }
                </div>
              </div>
              :
              <div id="expired" class="tab-pane fade in active show">
              <div class="row">
                  {loading?
                   null
                   :
                    posts.length>0?
                    posts.map((data) => {
                      return (
                        <InactiveAlert
                        data={data}
                        setDeleteId={setDeleteId}
                        setStatusId={setStatusId}
                        statusChange={statusChange}
                        setStatusChange= {setStatusChange}
                        showDetail={(data) => showDetailHandler(data)}
                      />
                      )
                    })
                    : 
                    <NoInactiveAlert type={selectedType}/>
                  }
                </div>
              </div>
              }

             
            </div>
            
            {(alertGet.length === 0 && active==="active") || (posts.length === 0 && active === "inactive")?
            null
            :
            <div class="mobile add_promotion">
              <a  class="btn btn-primary btn_round" href="/addAlert">
                <i class="las la-plus"></i> Add Alert
              </a>
            </div>
            }

            <div
              class="modal fade delete_modal "
              id="inactiveModal"
              style={{ zIndex: 10000000 }}
            >
              <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                  <div class="modal-body">
                    <h4 class="modal-title">
                      <span>Inactive this alert?</span>
                    </h4>
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
                        class="btn btn-danger delete-btn"
                        data-dismiss="modal"
                        onClick={(e) => {
                          changeStatus(e);
                        }}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade delete_modal "
              id="activeModal"
              style={{ zIndex: 10000000 }}
            >
              <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                  <div class="modal-body">
                    <h4 class="modal-title">
                      <span>Active this alert?</span>
                    </h4>
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
                        class="btn btn-primary delete-btn"
                        data-dismiss="modal"
                        onClick={(e) => {
                          changeStatusActive(e);
                        }}
                      >
                        Active
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade delete_modal "
              id="deleteModal"
              style={{ zIndex: 10000000 }}
            >
              <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                  <div class="modal-body">
                    <h4 class="modal-title">
                      <i class="fa fa-trash"></i>
                      <span>Delete this alert?</span>
                    </h4>
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
                        class="btn btn-danger delete-btn"
                        data-dismiss="modal"
                        onClick={(e) => {
                          deleteFunction(e);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         

            <div id="preview_one" class="preview_modal">
              <div class="prv_inner">
                <h2>Preview Alert</h2>
                <span class="close" id="close_preview">
                  <i class="las la-times"></i>
                </span>
                <h5>Chocolate available in kottayam</h5>
                <p>
                  Generally cloudy sky with a few spells of rain or
                  thunderstorms is the forecast of September 10, said Regional
                  Meteorological Centre.
                </p>
                <img src="images/img36.png" class="promotion-img" />
                <div class="prev-other-sec">
                  <div class="prev-other-sec sec12">
                    <div class="preview_action">
                      <a href="edit-promotion.html" class="action_link edit">
                        <i class="las la-edit"></i>
                      </a>
                      <a
                        href=""
                        data-toggle="modal"
                        data-target="#deleteModal"
                        class="action_link delete"
                      >
                        <img src="images/trash.svg" class="trash" />
                      </a>
                      <span class="days">10 Days</span>
                    </div>
                    <div class="o_sec">
                      <p class="pr_tit">Selected Regions</p>
                      <p class="pr">India</p>
                      <p class="pr">Ohio, United states</p>
                    </div>
                    <div class="o_sec">
                      <p class="pr_tit">Duration</p>
                      <p class="pr">25 Days</p>
                    </div>
                    <div class="o_sec">
                      <p class="pr_tit">Promoted On</p>
                      <p class="pr">12 Sep 2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          
          </div>
        </div>
      </div>
    </>
  );
}
