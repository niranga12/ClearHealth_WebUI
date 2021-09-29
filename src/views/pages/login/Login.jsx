/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import "./login.scss";
// import Logo from "src/reusable/Logo";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  useDispatch, useSelector } from "react-redux";
import { login } from "src/actions/loginAction";
// import NotificationLayout from "src/_helpers/notification";
// import { notify } from "reapop";
import SingleLayout from "../singlelayout/singleLayout";
// import history from "../../../_helpers/history";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Email required"),
  password: yup.string().required("Password required"),
  keepSignIn:yup.bool()
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const User = useSelector((state) => state.Login);
  const disPatch = useDispatch();
  const history = useHistory();
  let keepMeSignIN = useSelector((state) => state.Login.keepMeSignIn);

  useEffect(() => {
    if(keepMeSignIN){
      history.push("/main");
    }
    
  }, [])

 

  const userLogin = (data) => {
     
    disPatch(login(data,history));
    // disPatch(notify('Welcome to the documentation', 'info'))
  };

  const redirectToPage = () => {
    history.push("/forgotpassword");
  };

  return (
    <SingleLayout>
      {/* // <div className="container-fluid bg-login">
    //   <NotificationLayout/>
    //   <div className="row  ">
    //     <div className=" col-md-3 col-lg-3 col-sm-12 d-block align-items-center   height-100 box-shadow">
    //       <div className="m-auto  pt-5">
    //         <Logo />
    //       </div>

    //       <div className="h-50">
    //         <div className="row login-contact text-lightblue">
    //           <div className="col-md-12 text-center">
    //             <FontAwesomeIcon icon={faEnvelope} className="pr-2 fa-x" />
    //             <span className="text-black-light">
    //               support@clearhealth.com
    //             </span>
    //           </div>
    //           <div className="col-md-12 text-center pt-1">
    //             <FontAwesomeIcon icon={faPhone} className="pr-2 fa-x" />
    //             <span className="text-black-light">800 (229)-01528</span>
    //           </div>
    //         </div>
    //       </div>

    //     
    //       <div> */}
      <h2 className="font-lato-bold">Login</h2>
      <form onSubmit={handleSubmit(userLogin)}>
        <label className="mt-3 pb-2">Email address</label>
        <input
          type="text"
          {...register("username")}
          className="form-control mb-3 "
          placeholder="Enter Email"
          autoComplete="new-off"
        />
        <div className="small text-danger  pb-2   ">{errors.username?.message}</div>

        <label className="pb-2">Password</label>
        <input
          type="password"
          {...register("password")}
          className="form-control mb-3"
          placeholder="Enter Password"
          autoComplete="new"
        />
        <div className="small text-danger pb-2  ">{errors.password?.message}</div>
        <div className="row p-2">
<div className="col-md-6 pl-2 checkbox">
<div className="checkbox-container float-left">
        <label className="checkbox-label">
            <input type="checkbox" name="KeepSign" id=""    {...register("keepSignIn")}/>
            <span className="checkbox-custom"></span>
        </label>
</div>
  {/* <input type="checkbox" className="form-check-input" name="KeepSign" id=""   {...register("keepSignIn")}/> <div className="label  form-check-label ">Keep me signed in</div> */}
  <div className="label  form-check-label pl-2 ml-3 "> Keep me signed in</div>
</div>

<div className="col-md-6 text-right">
<div className=" label  text-right text-loginblue  font-lato-bold cil-cursor cursor-point" onClick={redirectToPage}>
          Forgot Password?
        </div>
</div>

        </div>
       
        <button className="btn btn-primary btn-lg col-md-12 mt-1 p-3">
          Sign in
        </button>
        {/* {process.env.REACT_APP_BASE_URL} */}
      </form>

      {/* </div>
        </div>
        <div className=" col-md-9 d-sm-none border-darken-4"></div>

     
      </div>
    </div> */}
    </SingleLayout>
  );
};

export default Login;
