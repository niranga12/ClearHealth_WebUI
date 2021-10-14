import React from 'react'
import {
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
       
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      

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
