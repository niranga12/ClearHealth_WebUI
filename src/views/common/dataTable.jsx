/* eslint-disable react-hooks/exhaustive-deps */
import CIcon from '@coreui/icons-react';
import React, { useEffect } from 'react'
import { useExpanded, useSortBy, useTable } from 'react-table';
import PropTypes from 'prop-types';


const DataTable = ({columns,data,sortingHandler,renderRowSubComponent}) => {
    // eslint-disable-next-line no-unused-vars
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,    visibleColumns,      state:{sortBy ,expanded} } = useTable({
      columns,
      data,
       autoResetSortBy: false, 
       autoResetPage: false,
       manualPagination: true,

    },
    useSortBy,useExpanded );

   
    useEffect(() => {
    
   if(sortingHandler){sortingHandler(sortBy)}
    
    }, [sortBy])


    return (   
      <div className="LatoRegular tableCover">
        <table {...getTableProps} className="table table-hover ">
          <thead className="thead-dark LatoBlack">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // <th {...column.getHeaderProps()}>
                  //   {column.render("Header")}
                  // </th>
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                  {column.isSorted ? (column.isSortedDesc ? <CIcon name="cilArrowBottom" alt="Settings" /> : <CIcon name="cilArrowTop" alt="Settings" />) : ""}
                  
                    {/* {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""} */}
                  </span>
                </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                // {...row.getRowProps()}
                <React.Fragment key={row.getRowProps().key} >
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                    );
                  })}
                </tr>

 {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {/*
                            Inside it, call our renderRowSubComponent function. In reality,
                            you could pass whatever you want as props to
                            a component like this, including the entire
                            table instance. But for this example, we'll just
                            pass the row
                          */}
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
 </React.Fragment>
              );
            })}
          </tbody>
        </table>

        </div>
    )
}


DataTable.propTypes = {
  columns:PropTypes.any.isRequired,
  data:PropTypes.any.isRequired,
  sortingHandler:PropTypes.func,
  renderRowSubComponent:PropTypes.func

};

export default DataTable;
