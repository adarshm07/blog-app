import React, { useEffect, useState } from "react";
import SideBar from "../commonComponent/sideBar";
import Header from "../commonComponent/header";
import PromotionCard from "./PromotionCard";
import ExpiredPromotion from "./ExpiredPromotion";
import PromotionDetail from "./PromotionDetail";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllPromotion,
  getAllPromotionExpried,
  deletePromotion,
  cleanReducer,
} from "../store/users/actions";
import NoOngoingPromotion from "./NoOngoingPromotion";
import NoExpiredPromotion from "./NoExpiredPromotion";

import { LoadingSagaPromotionExpired, LoadingSagaPromotionOngoing } from "../store/users/saga";

export default function Promotion() {
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [active, setActive] = useState("ongoing")

  useEffect(() => {
    dispatch(getAllPromotion());
    dispatch(getAllPromotionExpried());
  }, []);

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

  const deleteFunction = () => {
    dispatch(deletePromotion(deleteId));
  };

  useEffect(() => {
    if (proDel.status) {
      dispatch(cleanReducer());
      dispatch(getAllPromotion());
      dispatch(getAllPromotionExpried());
    }
  }, [proDel]);

  const showDetailHandler = (data) => {
    setDetail(data);
  };

  console.log(LoadingSagaPromotionOngoing);

  return (
    <>
      <div class="content_wrapper">
        <SideBar />
        <Header />

        <div class="main">
          <div class="title_bar">
            <div class="left">
              <h4 class="page_title">Promotions</h4>
            </div>
            <div class="right d-md-block d-none">
            {proGet.length > 0 && active==="ongoing"?
              <a href="/addPromotion" class="btn btn-primary btn_round">
                <i class="las la-plus"></i> Add Promotion
              </a>
              :
              null
            }
            {active === "expired"?
              <a href="/addPromotion" class="btn btn-primary btn_round">
                <i class="las la-plus"></i> Add Promotion
              </a>
              :
              null
            }
            </div>
          </div>
          <div class="container">
            <ul class="nav nav-tabs promo_tabs">
              <li>
                <a data-toggle="tab" href="#ongoing" class="active" onClick={() => setActive("ongoing")}>
                  Ongoing
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#expired" onClick={() => setActive("expired")}>
                  Expired
                </a>
              </li>
            </ul>
            {detail && (
              <PromotionDetail
                data={detail}
                onClose={() => setDetail(null)}
                setDeleteId={setDeleteId}
              />
            )}
            {console.log(proGet)}
            <div class="tab-content">
              <div id="ongoing" class="tab-pane fade in active show">
                <div class="row">
                  {LoadingSagaPromotionOngoing?
                  null
                  :
                  proGet.length !== 0?
                    proGet.map((data) => {
                      return (
                        <PromotionCard
                          data={data}
                          setDeleteId={setDeleteId}
                          showDetail={(data) => showDetailHandler(data)}
                        />
                      );
                    })
                    :
                    <NoOngoingPromotion />
                  }
                </div>
              </div>
              <div id="expired" class="tab-pane fade">
                <div class="row">
                  {LoadingSagaPromotionExpired?
                  null
                  :
                  proExpiredGet.length !== 0?
                    proExpiredGet.map((data) => {
                      return (
                        <ExpiredPromotion
                          data={data}
                          setDeleteId={setDeleteId}
                          showDetail={(data) => showDetailHandler(data)}
                        />
                      );
                    })
                    :
                    <NoExpiredPromotion />
                  }
                    
                </div>
              </div>
            </div>

            {(proGet.length === 0 && active==="ongoing") || (proExpiredGet.length === 0 && active === "expired")?
            null
            :
            <div class="mobile add_promotion">
              <a  class="btn btn-primary btn_round" href="/addPromotion">
                <i class="las la-plus"></i> Add Promotion
              </a>
            </div>
            }

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
                      <span>Delete this promotion?</span>
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
                <h2>Preview Promotion</h2>
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
