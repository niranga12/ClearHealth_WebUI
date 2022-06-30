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

const initPage = (currentPage) => {
  let initNumber = currentPage === 1 ? currentPage : (currentPage - 1) * TableSettingsEnum.ItemPerPage
  return initNumber
}

const lastPage = (currentPage, count) => {
  let lastNumber =
    currentPage * TableSettingsEnum.ItemPerPage > count ? count : currentPage * TableSettingsEnum.ItemPerPage

  return lastNumber
}

const PaginationTable = ({ handlePageChange, countPage = 1, currentPage = 1, count = 0 }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Pagination count={countPage} shape="rounded" color="primary" className="mb-3" onChange={handlePageChange} />

      <div className="table-page-bottom">
        {initPage(currentPage)}-{lastPage(currentPage, count)} of {count} items
      </div>
    </div>
  )
}

export default PaginationTable
