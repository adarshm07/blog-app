import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import swal from 'sweetalert';
export default function SuccessPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  // http://localhost:3000/success
  return (
    <div id="login" class="login_container" onClick={()=> history.push("/")} style={{display: "flex"}}>
      
      <div id="login-box">
        <form
          id="login-form"
          class="form"
          style={{padding : "60px"}}
          // onSubmit={(e) => handleForm(e)}
          method="post"
        >
          <div class="logo">
            <div class="logo_row">
              <img src="images/right.png" alt="" />
              {/* <span class="logo_text">SphereHunt</span> */}
            </div>
          </div>

          <h3 class="forgot_titlle">Password Updated!</h3>
          <p class="forgot_desc">Your password has been changed successfully. Use your new password for login.</p>
         
        
          {/* <div class="form-group">
            <label for="NewPassword" class="txt">
              New Password
            </label>
            <br />
            <input
             type="text"
             name="password"
             id="password"
             value={loginInput.password}
             onChange={handleInput}
             className="form-control input-box"
             placeholder="Enter Password"
            />
          </div>
          <div class="form-group">
            <label for="ConfirmPassword" class="txt">
            Confirm Password
            </label>
            <br />
            <input
             type="text"
             name="conPassword"
             id="conPassword"
             value={loginInput.conPassword}
             onChange={handleInput}
             className="form-control input-box"
             placeholder="Enter Confirm Password"
            />
          </div> */}
          <div class="">
            <button
              onClick={()=> history.push("/")}
              className="btn btn-primary btn_round btn-block instructions_btn"
            >
              Back to Login
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}