import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import { TableSettingsEnum } from "src/reusable/enum";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationTable = ({ handlePageChange, countPage = 1, currentPage=1,count=0 }) => {
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
      <div className="table-page-bottom">{currentPage}-{currentPage* TableSettingsEnum.ItemPerPage} of {count} items</div>
    </div>
  );
};

export default PaginationTable;
