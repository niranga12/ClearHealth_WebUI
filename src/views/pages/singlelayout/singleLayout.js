import React from "react";

// import "../login/login.scss";
import Logo from "src/reusable/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import NotificationLayout from "src/_helpers/notification";

const SingleLayout=({children})=>{
    return (
    
        <div className="container-fluid bg-login">
          <NotificationLayout/>
          <div className="row  ">
            <div className=" col-md-3 col-lg-3 col-sm-12 d-block align-items-center   height-100 box-shadow">
              <div className="m-auto  pt-5">
                <Logo />
              </div>
    
              <div className="h-50">
                <div className="row login-contact text-lightblue">
                  <div className="col-md-12 text-center">
                    <FontAwesomeIcon icon={faEnvelope} className="pr-2 fa-x" />
                    <span className="text-black-light">
                      support@clearhealth.com
                    </span>
                  </div>
                  <div className="col-md-12 text-center pt-1">
                    <FontAwesomeIcon icon={faPhone} className="pr-2 fa-x" />
                    <span className="text-black-light">800 (229)-01528</span>
                  </div>
                </div>
              </div>
    
              {/* form */}
              <div>
                {/* pages should load */}

                <main>{children}</main>


              </div>
            </div>
            <div className=" col-md-9 d-sm-none border-darken-4"></div>
    
          
          </div>
        </div>
      );
}

export default SingleLayout;