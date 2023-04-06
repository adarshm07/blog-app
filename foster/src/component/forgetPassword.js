import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postForgetFormData } from "../store/actions";
import swal from 'sweetalert';
import Axios from 'axios';

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [passwordReset, setPasswordReset] = useState(false);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "111111",
  });

  const [error, setError] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    loginInput.email ?
   await Axios.post(`https://spherehunt.app:5000/api/v1/admin/forgetPassword/${loginInput.email}`)
   .then((res) => {
    if(res.data.status){
    setPasswordReset(true);
    console.log(res.data);
    }else{
      setError('Invalid Email Address')
    }
    }).catch((e) => {
      console.log(e);
    })
    :
    setError('Please enter email')
  };

  const handleInput = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    setError('')
  };

  // const { logoutSuccess,logoutError } = useSelector((state) => {
  //   return {
  //       logoutSuccess:
  //       state.Auth && state.Auth.logoutSuccess
  //         ? state.Auth.logoutSuccess
  //         : null,
  //         logoutError:
  //         state.Auth.logoutError && state.Auth.logoutError
  //           ? state.Auth.logoutError
  //           : null
  //   };
  // });

  useEffect(() => {
    if (passwordReset) {
      swal("Password reset request was sent successfully. Please check your email to reset your password");
      history.push("/");
    }
  }, [passwordReset]);

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

          <h3 class="forgot_titlle">Forgot Password?</h3>

          {error &&
            <div class="alert alert-danger" >
                    {error}
                </div>}

          <p class="forgot_desc">
            Enter the email address associated with your account. We will send
            an email with instructions to reset your password.
          </p>

          <div class="form-group">
            <label for="email" class="txt">
              Email Address
            </label>
            <br />
            <input
             type="text"
             name="email"
             id="email"
             value={loginInput.email}
             onChange={handleInput}
             className="form-control input-box"
             placeholder="Enter email address"
            />
          </div>
          <div class="">
            <button
              type="submit"
              className="btn btn-primary btn_round btn-block instructions_btn"
            >
              Send Instructions
            </button>

            <span className="btn btn-default btn-block login_back_btn" onClick={()=> history.push("/")}>
              Back
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}