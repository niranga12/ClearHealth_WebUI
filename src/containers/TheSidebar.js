import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  
  CSidebarNavDropdown,
  CSidebarNavItem,
  CLink,
  
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { changeHeadToggle } from "src/actions/changeAction";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebar.sidebarShow);

 const navLinks=navigation.map((item,index)=>
  <li className="CUnavi" key={index} >
  

  <CLink to={item.to} {...item}>
 <div  className="p-2 CNradius m-auto">
    {item.icon} 
    
    </div>
</CLink>
</li>
)

// const navLInks=()=>{

// <ul>
//   {navigation.map((item,index)=>
//     <li key={index}>
    

//     <CLink to={item.to} {...item}>
//    <div  className="p-3 bg-success m-auto"> {item.name} </div>
// </CLink>
// </li>
//   )
// }
//   </ul>
// }


  return (
    <CSidebar
      show={show}
      className="c-sidebar-light "
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none " to="/dashboard">
        {/* <div className="logo-image-panel"></div> */}
        <CIcon
          className="c-sidebar-brand-full m-auto"
          name="logo-negative"
          height={55}
        />
        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>

      <CSidebarNav className="pt-4">
        {/* <div className="card boxshadow-contain h-97 text-black-50 m-2"> */}
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
<ul className="list-unstyled p-0">
  {navLinks}
  </ul>
      
        {/* <div  className="p-3 bg-success m-auto">
        <CIcon content={freeSet.cilLibraryAdd} size={'2xl'} className="m-auto" />
        </div> */}

        {/* </div> */}
      </CSidebarNav>



      <div className="row sidebar-bottom">
        <div className="col-md-12 pb-2">
          <span className="email-sm"></span>
          <span className="support-clearhealth-slider">support@clearhealth.com</span>
        </div>
        <div className="col-md-12 pb-2">
          <span className="phone-sm"></span>
          <span className="support-clearhealth-slider">(800) -229-01528</span>
        </div>
      </div>
      {/* <CSidebarMinimizer className="c-d-md-down-none" name="fdasfdsa"/> */}
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
