import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  
  CSidebar,
  
  CSidebarNav,
 
  CLink,
} from "@coreui/react";


// sidebar nav config
import navigation from "./_nav";

const TheSideNavigation = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebar.sidebarShow);

  const navLinks = navigation.map((item, index) => (
    <li className="CUnavi" key={index}>
      <CLink to={item.to} {...item}>
        <div className="p-2 CNradius m-auto">{item.icon}</div>
      </CLink>
    </li>
  ));

  return (
    <CSidebar
      show={show}
      className="c-sidebar-light "
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarNav className="pt-4">
        <ul className="list-unstyled p-0">{navLinks}</ul>
      </CSidebarNav>
 </CSidebar>
  );
};

export default React.memo(TheSideNavigation);

