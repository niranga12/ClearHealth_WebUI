import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationTable = ({ handlePageChange, countPage = 1 }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        count={countPage}
        shape="rounded"
        color="primary"
        className="mb-3"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationTable;
