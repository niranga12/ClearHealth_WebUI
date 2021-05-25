import React from 'react'
import {
  CDropdown,
  
  CDropdownToggle,
  CImg
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { useDispatch } from 'react-redux'
// import { logout } from 'src/actions/loginAction'

const TheHeaderDropdownImage = () => {
  // let  dispatch = useDispatch()

  // const logOut=()=>{
  //   dispatch(logout())
   

  // }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items "
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      {/* <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Messages
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logOut}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu> */}
    </CDropdown>
  )
}

export default TheHeaderDropdownImage;
