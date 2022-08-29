import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core'
import { TableSettingsEnum } from 'src/reusable/enum'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    }
  }
}))

const initPage = (currentPage, itemPerPage) => {
  let initNumber = currentPage === 1 ? currentPage : (currentPage - 1) * itemPerPage
  return initNumber
}

const lastPage = (currentPage, count, itemPerPage) => {
  let lastNumber =
    currentPage * itemPerPage > count ? count : currentPage * itemPerPage
  return lastNumber
}

const PaginationTable = ({ handlePageChange, countPage = 1, currentPage = 1, count = 0, itemPerPage = TableSettingsEnum.ItemPerPage }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Pagination count={countPage} shape="rounded" color="primary" className="mb-3" onChange={handlePageChange} />

      <div className="table-page-bottom">
        {initPage(currentPage, itemPerPage)}-{lastPage(currentPage, count, itemPerPage)} of {count} items
      </div>
    </div>
  )
}

export default PaginationTable
