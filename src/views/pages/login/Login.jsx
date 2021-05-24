import React from "react";
// import { Link, useHistory } from "react-router-dom";
// import "./login.scss";
// import Logo from "src/reusable/Logo";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { login } from "src/actions/loginAction";
// import NotificationLayout from "src/_helpers/notification";
// import { notify } from "reapop";
import SingleLayout from "../singlelayout/singleLayout";
import history from "../../../_helpers/history";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const User = useSelector((state) => state.Login);
  const disPatch = useDispatch();

  const userLogin = (data) => {
    // console.log(data);
    disPatch(login(data));
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
      <h3>Login</h3>
      <form onSubmit={handleSubmit(userLogin)}>
        <label className="mt-3">Email address</label>
        <input
          type="text"
          {...register("username")}
          className="form-control mb-2 "
          placeholder="Email"
          autoComplete="new-off"
        />
        <div className="small text-danger  ">{errors.username?.message}</div>

        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className="form-control"
          placeholder="Enter password"
          autoComplete="new"
        />
        <div className="small text-danger  ">{errors.password?.message}</div>
        <div className="row p-2">
<div className="col-md-6 pl-3">
  <input type="checkbox" name="KeepSign" id="" /> <span className="label  pt-1">Keep me signed in</span>
</div>
<div className="col-md-6 text-right">
<div className=" label  text-right text-lightblue pt-1" onClick={redirectToPage}>
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
