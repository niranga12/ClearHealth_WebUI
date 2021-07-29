import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const DateSelector = ({handleDateChange,selectedDate}) => {
    

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <DatePicker
        openTo="date"
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
      />

      </MuiPickersUtilsProvider>

    )
}

export default DateSelector;
