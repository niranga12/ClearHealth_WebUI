import React from 'react'

const AdminTitle = ({ title }) => {
  return (
    <div className="row mb-2 LatoRegular mt-4 mb-3 pl-3 pr-3">
      <div className="col-md-6">
        <div className="component-header"> {title}</div>
      </div>
      <div className="col-md-6"></div>
    </div>
  )
}

export default AdminTitle
