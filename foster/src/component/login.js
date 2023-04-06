import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postLoginFormData } from "../store/actions";
const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [ loginInput, setLoginInput ] = useState({
    email: "",
    password:""
    // email: "spherehuntapp@gmail.com",
    // password:"111111"
  })

  const handleForm = (e) =>{
    e.preventDefault();
    console.log(loginInput)
    dispatch(postLoginFormData(loginInput));
  }

  

  const { loginStatus } = useSelector((state) => {
    console.log(state)
    return {
      loginStatus:
        state.Auth.login && state.Auth.login.data 
          ? state.Auth.login.data.status ? 'success' : 'error'
          : '',
    };
  });
  const handleInput = (e) => {
    
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };
  console.log(loginStatus)

  useEffect(() => {
    if (loginStatus && loginStatus === 'success') {
      history.push("/Dashboard");
    }
  }, [loginStatus]);
  
  return (
    <div>
      <div id="login" className="login_container">
        <div id="login-box">
          <form id="login-form" className="form" onSubmit={(e)=>handleForm(e)} method="post">
            <div className="logo">
              <div className="logo_row">
                <img src="images/logo/logo_icon.svg" alt="" />
                <span className="logo_text">SphereHunt</span>
              </div>
            </div>

            <h3 className="text-center login_title">Login</h3>
            {loginStatus && loginStatus === 'error' &&
            <div class="alert alert-danger" >
                    Invalid username or password
                </div>}
            <div className="form-group">
              <label for="email" className="txt">
                Email Address
              </label>
              <br />
              <input
                type="text"
                name="email"
                id="email"
                value={loginInput.email}
                onChange={handleInput}
                className={loginStatus && loginStatus === 'error' ? "form-control input-box is-invalid" : "form-control input-box "} 
                placeholder="Enter email address"
              />
            </div>
            <div className="form-group">
              <label for="password" className="txt">
                Password
              </label>
              <div className="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={loginInput.password}
                  onChange={handleInput}
                  className={loginStatus && loginStatus === 'error' ? "form-control input-box is-invalid" : "form-control input-box "} 
                  placeholder="Enter password"
                />
                <i className="fa fa-eye-slash passShowHide"></i>
              </div>
            </div>
            <label for="remember-me" className="remember_me">
              <input id="remember-me" name="remember-me" type="checkbox" />
              &nbsp;
              <span>Remember me</span>
            </label>
            <div id="forgot-password" className="text-right">
              <a href="/forgetPassword">Forgot Password?</a>
            </div>
            <div className="login_btn">
              <button type="submit" className="btn btn-info btn-md n_btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;