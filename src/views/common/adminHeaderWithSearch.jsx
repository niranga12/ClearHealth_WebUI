import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import 'font-awesome/css/font-awesome.min.css'
import PropTypes from 'prop-types'
import DateSelector from './dateSelector'


const AdminHeaderWithSearch = ({
  fromDateChange,
  toDateChange,
  handleSearchChange,
  handleAddNew,
  handleDropDownChange,
  title = '',
  selectionList = [],
  placeholder = '&#xF002;',
  buttonTitle = null,
  showCount = 0,
  selectionTitle = '',
  subHeader = '',
  buttonDisable = false,
  iconShow = true,
  buttonHide = false,
  dateRange = false

}) => {

  var initMonth = new Date()
  initMonth.setMonth(initMonth.getMonth() - 3)





  const [fromDate, handleFDateChange] = useState(initMonth)
  const [toDate, handleTDateChange] = useState(new Date())

  useEffect(() => {
    fromDateChange(fromDate)
    toDateChange(toDate)
  }, [fromDate, toDate])

  //add new button
  const addNewButton = () => {
    return (
      <button
        type="button"
        className={`btn btn-primary float-right ml-3 text-white ${buttonHide ? 'hide' : ''}`}
        onClick={handleAddNew}
        disabled={buttonDisable}
      >
        {' '}
        {iconShow && <CIcon content={freeSet.cilPlus} color="white" className="add-icon-set" />}
        <span className="pt-1"> {buttonTitle}</span>
      </button>
    )
  }

  //Date Range
  const DateRange = () => {
    return (<div className="col-md-6 pull-right">
      <div className="d-flex justify-content-end">
        <div className="float-left mr-3 pt-2">From</div>
        <DateSelector selectedDate={fromDate} handleDateChange={handleFDateChange} />
        <div className="float-left mr-3 ml-2 pt-2">To</div>
        <DateSelector selectedDate={toDate} handleDateChange={handleTDateChange} />
      </div>
    </div>
    )
  }

  const dropDownLabel = () => {
    return (
      <>
        <div className="float-right h4 mr-2 p-1">{selectionTitle}</div>
      </>
    )
  }

  // dropdown select
  const dropDownSelect = () => {
    return (
      <>
        <select name="" id="" className="form-control-sm float-right all-dropdown mr-2" onChange={handleDropDownChange}>
          {selectionList.map((item, index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
        {selectionTitle ? dropDownLabel() : ''}
      </>
    )
  }

  return (
    <div>
      <div className="row mb-2 LatoRegular mt-4 mb-3 pl-3 pr-3">
        <div className="col-md-3">
          <div className="component-header ">
            {subHeader ? <div className="small mb-2 sub-title">{subHeader}</div> : ''}
            <div>
              {title} {showCount > 0 ? <span className="count-box">{showCount}</span> : ''}{' '}
            </div>
          </div>
        </div>
        {/* css condition  */}
        <div className={`col-md-9 ${subHeader ? 'mt-3' : ''}`}>
          {buttonTitle ? addNewButton() : ''}
          {dateRange ? DateRange(): ''}
          {/* <div className='float-right w-50'> */}
          <div className="float-right">
            {' '}
            <span className="fa fa-search search-icon"></span>{' '}
            <input
              type="text"
              onBlur={handleSearchChange}
              className=" form-control-sm  search-space "
              placeholder={placeholder}
            />{' '}
          </div>

          {selectionList.length > 0 ? dropDownSelect() : ''}
        </div>
      </div>
    </div>
  )
}

AdminHeaderWithSearch.propTypes = {
  fromDateChange: PropTypes.func,
  toDateChange: PropTypes.func,
  handleSearchChange: PropTypes.func,
  handleAddNew: PropTypes.func,
  handleDropDownChange: PropTypes.func,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonDisable: PropTypes.bool,
  iconShow: PropTypes.bool,
  showCount: PropTypes.any,
  selectionList: PropTypes.any,
  selectionTitle: PropTypes.any,
  subHeader: PropTypes.any,
  buttonHide: PropTypes.bool,
  dateRange: PropTypes.bool
}

export default AdminHeaderWithSearch
