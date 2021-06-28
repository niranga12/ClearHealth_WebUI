import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";
import React from "react";
import { useHistory } from "react-router-dom";

const CardWidget = ({ title = "", logoName = "", url = "/main" }) => {
  let history = useHistory();
  const handleRouteUrl = () => {
    history.push(url);
  };

  return (
    <div
      className="card bg-white box-shadow p-2 border-radius-dashboard"
      onClick={handleRouteUrl}
    >
      <div className="card-body text-center">
        <div className="float-left bg-gray-dashboard p-3">
          {/* <img src={logoHealthSystem} alt="Logo" className="sm-logo-setting"/>    */}

          {/* <CImg
                  src ={logoHealthSystem}
                  className=" float-left"
                 
                /> */}
          <CIcon
            name={logoName}
            color="blue"
            height="50"
            alt="Logo"
            className="blue-ico"
          />
          <span className="c-avatar-status bg-success"></span>
        </div>
        <div className="clearfix"></div>
        <div className="text-capitalize font-weight-bold h3 pt-5 mt-5 text-left main-dashboard-text">
          {title}
        </div>
      </div>
    </div>
  );
};

export default CardWidget;
