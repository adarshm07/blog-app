import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postResetFormData } from "../store/actions";
import swal from 'sweetalert';
import axios  from "axios";
import * as url from "../helper/auth_helper"

//http://localhost:3000/resetPassword?id=5
export default function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginInput, setLoginInput] = useState({
    conPassword: "",
    password: "",
  });

  const [id, setId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let skey = window && window.location && window.location.search ? window.location.search : ''
    let key = '';
    if (skey) {
       key = skey.split('?id=')[1]
       setId(key)
    }
    console.log(key)
 }, [history, history.location]);

 console.log(id)
  

  const handleForm = async (e) => {
    e.preventDefault();
    if(loginInput.conPassword === loginInput.password){
      let payload = {
        id: id, 
        password: loginInput.password
      }
      // /${ids}
      await axios.post(`${url.RESET_URL}`, payload)
        .then(
           res => {
              console.log(res)
              if(res.data.status){
                history.push(`/success`)
              }
           })
        .catch(error => {
           console.log(error);
           
        })
      // dispatch(postResetFormData( payload, id ));
    }else{
      setError('Password and Confirm Password must be match.')
    }
    
  };

  const handleInput = (e) => {
    setError('')
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const { logoutSuccess,logoutError } = useSelector((state) => {
    return {
        logoutSuccess:
        state.Auth && state.Auth.logoutSuccess
          ? state.Auth.logoutSuccess
          : null,
          logoutError:
          state.Auth.logoutError && state.Auth.logoutError
            ? state.Auth.logoutError
            : null
    };
  });
  
  useEffect(() => {
    if (logoutSuccess) {
      swal("Reset Password Successfully !");
      history.push("/");
    }
  }, [logoutSuccess]);

  return (
    <div id="login" class="login_container">
      <div id="login-box">
        <form
          id="login-form"
          class="form"
          onSubmit={(e) => handleForm(e)}
          method="post"
        >
          <div class="logo">
            <div class="logo_row">
              <img src="images/logo/logo_icon.svg" alt="" />
              <span class="logo_text">SphereHunt</span>
            </div>
          </div>

          <h3 class="forgot_titlle">Reset Password</h3>
          {error &&
          <div class="alert alert-danger" >
          {error && error}
                </div>}
          {/* <p class="forgot_desc">
            Enter the email address associated with your account. We will send
            an email with instructions to reset your password.
          </p> */}
        
          <div class="form-group">
            <label for="NewPassword" class="txt">
              New Password
            </label>
            <br />
            <input
             type="password"
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
             type="password"
             name="conPassword"
             id="conPassword"
             value={loginInput.conPassword}
             onChange={handleInput}
             className="form-control input-box"
             placeholder="Enter Confirm Password"
            />
          </div>
          <div class="">
            <button
              type="submit"
              className="btn btn-primary btn_round btn-block instructions_btn"
            >
              Reset
            </button>

            {/* <span className="btn btn-default btn-block login_back_btn">
              Back
            </span> */}
          </div>
        </form>
      </div>
    </div>
  );
}