/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DateSelector from 'src/views/common/dateSelector'

const HDheader = ({ title, handleFromChange, handleToChange }) => {
  var initMonth = new Date()
  initMonth.setMonth(initMonth.getMonth() - 3)

  const [fromDate, handlefromDateChange] = useState(initMonth)
  const [toDate, handleToDateChange] = useState(new Date())

  useEffect(() => {
    handleFromChange(fromDate)
    handleToChange(toDate)
  }, [fromDate, toDate])

  return (
    <div>
      <div className="row mb-2 LatoRegular mt-4 mb-3 pl-3 pr-3">
        <div className="col-md-6">
          <div className="component-header">{title}</div>
        </div>

        <div className="col-md-6 pull-right">
          <div className="d-flex justify-content-end">
            <div className="float-left mr-3 pt-2">From</div>
            <DateSelector selectedDate={fromDate} handleDateChange={handlefromDateChange} />

            {/* <input type='text' onBlur={handleFromChange} className=' form-control-sm w-25   float-left ' placeholder="DD/MM/YYYY"  /> */}
            <div className="float-left mr-3 ml-2 pt-2">To</div>
            <DateSelector selectedDate={toDate} handleDateChange={handleToDateChange} />
            {/* <input type='text' onBlur={handleToChange} className=' form-control-sm  w-25   float-left' placeholder="DD/MM/YYYY"   /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

HDheader.propTypes = {
  title: PropTypes.string,
  handleFromChange: PropTypes.func,
  handleToChange: PropTypes.func
}

export default HDheader
