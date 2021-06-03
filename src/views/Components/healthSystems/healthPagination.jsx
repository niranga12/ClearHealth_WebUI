import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
 const HealthPagination = ({handlePageChange ,countPage=1}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        {/* <Pagination count={10} variant="outlined" /> */}
        <Pagination count={countPage} shape="rounded" color="primary" className="mb-3"   onChange={handlePageChange} />
        {/* <Pagination count={10} variant="outlined" color="secondary" />
        <Pagination count={10} variant="outlined" disabled /> */}
      </div>
    )
}

export default HealthPagination;