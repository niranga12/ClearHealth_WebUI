import React from 'react'
import { CDropdown, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdownNotif = () => {
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" size={'lg'} />
      </CDropdownToggle>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif
