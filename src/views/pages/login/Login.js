import React from "react";
// import { Link, useHistory } from "react-router-dom";
// import "./login.scss";
// import Logo from "src/reusable/Logo";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector,useDispatch } from "react-redux";
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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const User=useSelector(state=>state.Login);
  const disPatch =useDispatch();
  


  const userLogin = (data) => {
    // console.log(data);
    disPatch(login(data))
    // disPatch(notify('Welcome to the documentation', 'info'))
    
  };

  const redirectToPage=()=>{
    history.push("/forgotpassword")

  }

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
            <form onSubmit={handleSubmit(userLogin)}>
              <input
                type="text"
              
                {...register("username")}
                className="form-control mb-2 mt-3 form-shadow"
                placeholder="Email"
                autoComplete="new-off"
              />
              <div className="small text-danger  ">{errors.username?.message}</div>
              <input
                type="password"
                {...register("password")}
               
                className="form-control form-shadow"
                placeholder="Password"
                autoComplete="new"
              />
               <div className="small text-danger  ">{errors.password?.message}</div>
              <label className=" label text-lightblue pt-1" onClick={redirectToPage}>
                Forgot Password?
              </label>
              <button className="btn btn-primary col-md-12 mt-1">Login</button>
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
