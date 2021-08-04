import CIcon from '@coreui/icons-react';
import React, { useEffect } from 'react'
import { useSortBy, useTable } from 'react-table';


const DataTable = ({columns,data,sortingHandler}) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,state:{sortBy } } = useTable({
      columns,
      data,
       autoResetSortBy: false, 
       autoResetPage: false,
       manualPagination: true,

    },
    useSortBy);

   
    useEffect(() => {
    // console.log(sortBy )
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        </div>
    )
}

export default DataTable;
