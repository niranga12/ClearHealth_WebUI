import CIcon from "@coreui/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useTable } from "react-table";
import { getUserList } from "src/service/userService";
import OnError from "src/_helpers/onerror";

const HealthTable = () => {
  const [data, setdata] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData= async () =>{
        try {
            const result = await getUserList();
            setdata(result.data.data);
        } catch (error) {
            OnError(error,dispatch)
        } 
    }
    fetchData();

    // getUserList()
    //   .then((res) => {
    //     setdata(res.data.data);
    //     console.log(data);
    //   })
    //   .catch((error) => console.log(error));
  }, []);

 

  //SETTING COLUMNS NAMES
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName", // accessor is the "key" in the data
      },
      {
        Header: " Last Name",
        accessor: "lastName", // accessor is the "key" in the data
      },
      {
        Header: "Action",
        // accessor: '[row identifier to be passed to button]',
        Cell: ({value}) => (<div >...</div>)
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (

    <div className="LatoRegular">

      <table {...getTableProps} className="table table-hover ">
        <thead className="thead-dark LatoBlack">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
  );
};

export default HealthTable;
