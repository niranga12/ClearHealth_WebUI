import React, { useEffect, useState } from "react";
// import "../login/login.scss";
import Logo from "src/reusable/Logo";
import NotificationLayout from "src/_helpers/notification";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getHelp } from "../../../service/userService";
import onError from "src/_helpers/onerror";
import { useDispatch } from "react-redux";

const SingleLayout = ({ children }) => {
  const [help, setHelp] = useState({
    description: "",
    id: "",
    descriptionExt: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getHelpData();
  }, []);

  const getHelpData = () => {
    getHelp()
      .then((res) => {
        setHelp(res.data.data);
      })
      .catch((error) => onError(error, dispatch));
  };

  return (
    <div className="container-fluid bg-login">
      <div className="single-layout-max"> 
      <NotificationLayout />

      <div>
        <div className="row row-equal  ">
          <div className=" col-md-6 col-lg-6 col-sm-12 d-block align-items-center   height-100  ">
            {/* <div className=" h-90vh"> */}
            <div className="row ">
              <div className="col-md-6  pl-4 pt-1 mb-1">
                <Logo />
              </div>
            </div>

            

            {/* form */}
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-8 ">
                {/* pages should load */}
                <main>{children}</main>
              </div>
            </div>
            {/* </div> */}

            <div className=" p-3 login-mt  ">
              <div className="login-footer"> 
              <div className="row   ">
                <div className="col-md-6">
                  <span className="email"></span>{" "}
                  <span className="support-clearhealth pad-20">
                    support@clearhealth.com
                  </span>
                </div>
                <div className="col-md-6 log-foot-phone">
                  <span className="phone"></span>{" "}
                  <span className="support-clearhealth">(800) 229-01528</span>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* blue quote */}
          <div className=" col-md-6 pt-5  d-none d-sm-block">
            <div className="row">
              <div className="col-md-12 mt-5 pt-3 mb-2">
                <div className="first-login-quote float-right"></div>
              </div>

              <div className="col-md-12 pl-5 pr-5 ml-5  ">
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="fa-3x light-green"
                />
              </div>
              <div className="col-md-12 pl-5 pt-3 pr-5 health-is-a-state-of ml-4 mr-4">
                <p className="pl-4 pr-5">
                  {help.description}
                  {/* <FontAwesomeIcon icon={faQuoteLeft} className="fa-2x" /> */}

                  {/* Health is a state of complete mental, social and physical
                  well-being, not merely the absence of disease or infirmity. */}
                </p>
              </div>
              <div className="col-md-12 pl-5 pr-5 ml-4  ">
                <p className="world-health-organiz pl-5">
                  {help.descriptionExt}

                  {/* World Health Organization */}
                </p>
              </div>

              <div className="col-md-12">
                <div className="secound-login-quote float-right"></div>
              </div>
              <div className="col-md-12">
                <div className="secound-login-final"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SingleLayout;
