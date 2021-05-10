import React from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import Logo from "src/reusable/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
let schema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().required()
  
});

const Login = () => {
const {register,handleSubmit, errors} = useForm();
const userLogin=(data)=>{
console.log(data);
}

  return (
    <div className="container-fluid bg-login">
      <div className="row  ">
        <div className=" col-md-3 col-lg-3 col-sm-12 d-block align-items-center   height-100 box-shadow">
          <div className="m-auto  pt-5">
            <Logo />
          </div>

          <div className="h-50">
            <div className="row login-contact text-lightblue">
              <div className="col-md-12 text-center">
                <FontAwesomeIcon icon={faEnvelope} className="pr-2 fa-x" />
                <span className="text-black-light">support@clearhealth.com</span>
              </div>
              <div className="col-md-12 text-center pt-1">
                <FontAwesomeIcon icon={faPhone} className="pr-2 fa-x" />
                <span className="text-black-light">800 (229)-01528</span>
              </div>
            </div>
          </div>

          {/* form */}
          <div>
            <form onSubmit={handleSubmit(userLogin)}>
              <input
                type="text"
                {...register("userName")}
                className="form-control mb-3 mt-1 form-shadow"
                placeholder="Email"
                autoComplete="new-off"
               
              />
              <input
                type="text"
                {...register("password")}
                className="form-control form-shadow"
                placeholder="Password"
                autoComplete="new"
                
              />
              <label className=" label text-lightblue pt-1">
                Forgot Password?
              </label>
              <button className="btn btn-primary col-md-12 mt-1">Login</button>
              {/* {process.env.REACT_APP_BASE_URL} */}
            </form>
          </div>
        </div>
        <div className=" col-md-9 d-sm-none border-darken-4"></div>

        {/* <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer> */}
      </div>
    </div>
  );
};

export default Login;
