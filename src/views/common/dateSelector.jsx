import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import PropTypes from 'prop-types';
const DateSelector = ({handleDateChange,selectedDate,className}) => {
    

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <DatePicker
        openTo="date"
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        className={className}
      />

      </MuiPickersUtilsProvider>

    )
}

DateSelector.propTypes = {
	handleDateChange: PropTypes.func,
	selectedDate: PropTypes.any,
	className:PropTypes.any
};

export default DateSelector;
