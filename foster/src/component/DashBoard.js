import React from "react";
import SideBar from "../commonComponent/sideBar";
import Header from "../commonComponent/header";

export default function dashBoard() {
  return (
    <div class="content_wrapper">
      <SideBar />
      {/* <Header /> */}

      <div class="main">
        <div class="title_bar">
          <div class="left">
            <h4 class="page_title">Dashboard</h4>
          </div>
        </div>
        <div class="container">
          <div class="maintanence_section">
            <img
              src="images/Under_construction.svg"
              class="under_maintanence"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
