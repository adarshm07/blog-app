import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import sphereHuntIcon from '../assests/logo_icon.svg';
import toggleOff from '../assests/toggle_off.svg';
import toggleOn from '../assests/toggle_on.svg';
import brand from '../assests/logo_icon.svg';

export default function SideBar(){
  const history = useHistory();
  const [addClasss, setAddclasses] = useState(false)
  const [addClasss2, setAddclasses2] = useState(false)
  return (
    <>
      <div  className={addClasss ? "menu_dropshadow show" : "menu_dropshadow"} onClick={()=> setAddclasses(false)}></div>

      <div id="navigation" className={addClasss ? addClasss2 ? "sidebar off" : "sidebar mobileOn" : addClasss2 ? "sidebar off" : "sidebar"}>
        <div class="logo">
          <a hef="dashboard.html">
            <img src={sphereHuntIcon} alt="" class="logo_icon" />
            <span class="logo_text">SphereHunt</span>
          </a>
          <button className="toggle for-desktop-btn" onClick={()=> {setAddclasses(!addClasss); setAddclasses2(!addClasss2)}}>
            <img src={addClasss && addClasss2? toggleOff : toggleOn} alt="" />
          </button>
          <button class="toggle for-mobile-btn" onClick={()=> setAddclasses(!addClasss)}>
            <img src={toggleOff} alt="" />
          </button>
        </div>
        <div class="navi">
          <ul>
            <li
              class={
                window.location.pathname.toLowerCase().includes("dashboard") &&
                "active"
              }
            >
              <a href="javascript:;" onClick={()=> history.push("/Dashboard")}>
                <i class="las la-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li
              class={
                window.location.pathname.toLowerCase().includes("promotion") &&
                "active"
              }
            >
              <a href="javascript:;" onClick={()=> history.push("/promotion")} >
                <i class="las la-bullhorn"></i>
                <span>Promotions</span>
              </a>
            </li>
            <li
              class={
                window.location.pathname.toLowerCase().includes("alert") &&
                "active"
              }
            >
            <a href="javascript:;" onClick={()=> history.push("/alert")} >
                <i class="las la-exclamation-triangle"></i>
                <span>Alerts</span>
              </a>
            </li>
          </ul>
          <a href="/logout" class="logout">
            <i class="las la-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </div>
      </div>
      <div class="mobile_menu">
    <button class="toggle" onClick={()=> setAddclasses(!addClasss)} >
        <i class="las la-bars"></i>
    </button>
    <div class="brand">
        <img src={brand} alt="" class="logo_icon" />
        <span class="logo_text">SphereHunt</span>
    </div>
</div>
    </>
  );
}
