import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {  KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import PropTypes from 'prop-types';
const DateSelector = ({handleDateChange,selectedDate,className,disableFuture=false}) => {
    

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
           disableFuture={disableFuture}
           openTo="date"
           format="MM/dd/yyyy"
           placeholder='mm/dd/yyyy'
           value={selectedDate}
           onChange={handleDateChange}
           className={className}
           autoOk={true}
           maxDateMessage="Invalid date"
          />
       {/* <DatePicker
        disableFuture={disableFuture}
        openTo="date"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        className={className}
      /> */}

      </MuiPickersUtilsProvider>

    )
}

DateSelector.propTypes = {
	handleDateChange: PropTypes.func,
	selectedDate: PropTypes.any,
	className:PropTypes.any,
  disableFuture:PropTypes.bool
};

export default DateSelector;
