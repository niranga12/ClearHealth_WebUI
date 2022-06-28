import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHeader, CToggler, CHeaderNav } from '@coreui/react'
// import CIcon from "@coreui/icons-react";
import logo from '../assets/images/2.svg'

// routes config
// import routes from "../routes";

import { TheHeaderDropdown, TheTittleUser } from './index'
import TheHeaderDropdownImage from './TheHeaderDropDownImage'
import { useHistory } from 'react-router-dom'
// import Logo from "src/reusable/Logo";
// import { changeHeadToggle } from "src/actions/changeAction";

const TheHeader = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  let isPermission = useSelector((state) => state.Login.isLogin)

  // const toggleSidebar = () => {
  //   const val = [true, "responsive"].includes(sidebarShow)
  //     ? false
  //     : "responsive";
  //   dispatch({ type: "set", sidebarShow: val });
  // };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }
  const routeToDashboard = () => {
    history.push('/main')
  }

  return (
    <CHeader withSubheader className="box-shadow-bottom  ">
      <img src={logo} alt="Logo" className="sm-logo-setting-layout" onClick={routeToDashboard} />
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      {/* <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      /> */}
      {/* <CHeaderBrand className=" d-lg-none" to="/"> */}

      {/* <img src={logo} alt="Logo" className="sm-logo-setting"/>    */}
      {/* <Logo classname="sm-logo-setting" /> */}
      {/* <CIcon name="logo" height="60" alt="Logo" /> */}
      {/* </CHeaderBrand> */}

      <CHeaderNav className="d-md-down-none mr-auto">
        {/* <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem> */}
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* { isPermission &&   <TheHeaderDropdownNotif/>} */}

        {/* <div className="font-weight-bold">Name</div> */}
        {/* <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/> */}
        {isPermission && <TheHeaderDropdownImage />}
        {isPermission && <TheTittleUser />}
        {isPermission && <TheHeaderDropdown />}
      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader> */}
    </CHeader>
  )
}

export default TheHeader
