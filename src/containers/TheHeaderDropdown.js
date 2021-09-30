import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'src/actions/loginAction'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom'
import PermissionMenu from 'src/reusable/PermissionMenu'
import { ScreenPermissions } from 'src/reusable/enum'

const TheHeaderDropdown = () => {
  let  dispatch = useDispatch()
  let history = useHistory();
  let permissionList= useSelector((state) => state.Permission.UiPermissions);

  const logOut=()=>{
    dispatch(logout())
  }

  const onClickUser=()=>{
    history.push('/users');
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
      <FontAwesomeIcon icon={faSortDown} className="pr-1 fa-2x" />
        {/* <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div> */}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}


        {/* <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Messages
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider  className={` ${PermissionMenu(ScreenPermissions.UserManagement,permissionList) ? "" : "hide"}`}/>
        <CDropdownItem className={` ${PermissionMenu(ScreenPermissions.UserManagement,permissionList) ? "" : "hide"}`} onClick={onClickUser}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          User Management
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logOut}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
