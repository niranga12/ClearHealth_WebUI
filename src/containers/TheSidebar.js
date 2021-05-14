import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { changeHeadToggle } from "src/actions/changeAction";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebar.sidebarShow);

  return (
    <CSidebar
      show={show}
      className="c-sidebar-light "
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none box-shadow-bottom" to="/">
      {/* <div className="logo-image-panel"></div> */}
        <CIcon
          className="c-sidebar-brand-full ml-3"
          name="logo-negative"
          height={55}
        />
        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>

      <CSidebarNav>
        <div className="card boxshadow-contain h-97 text-black-50 m-2">
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </div>
      </CSidebarNav>
      <div className="row">
        <div className="col-md-12 pb-2">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="pl-2 fa-X text-lightblue text-icon-footer"
          />
          <span className="mb-1"> support@clearhealth.com</span>
        </div>
      </div>
      {/* <CSidebarMinimizer className="c-d-md-down-none" name="fdasfdsa"/> */}
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
