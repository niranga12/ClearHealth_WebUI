import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTable } from "react-table";
import { TableSettingsEnum } from "src/reusable/enum";
import {
  getHealthSystemList,
  getHealthSystemListCount,
} from "src/service/healthsystemService";
import AdminHeaderWithSearch from "src/views/common/adminHeaderWithSearch";
import PaginationTable from "src/views/common/paginationTable";
// import history from "src/_helpers/history";
// import { getUserList } from "src/service/userService";
import OnError from "src/_helpers/onerror";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import PhoneNumberFormater from "src/reusable/PhoneNumberFormater";


const initialSearch = {
  itemsPerPage: TableSettingsEnum.ItemPerPage,
  pageNumber: 1,
  searchTerm: "",
};

// function getFormattedPhoneNum( input ) {
//   let output = "(";
//   input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
//       {
//         if ( g1.length ) {
//           output += g1;
//           if ( g1.length == 3 ) {
//               output += ")";
//               if ( g2.length ) {
//                   output += " " + g2; 
//                   if ( g2.length == 3 ) {
//                       output += " - ";
//                       if ( g3.length ) {
//                           output += g3;
//                       }
//                   }
//               }
//            }
//         }
//       }       
//     );        
//   return output;
//  }      


function CellContract({ row }) {
  return (
    <>
      <div>{row.original.contactName}</div>
      <div className="rectangle-intable">
        {" "}
        <span className="fa fa-phone text-health-icon pr-1"></span>{" "}
        {/* {row.original.contactNumber} */}
        {PhoneNumberFormater(row.original.contactNumber)}
      </div>
      <div className="rectangle-intable">
        {" "}
        <span className="fa fa-envelope text-health-icon pr-1"></span>{" "}
        {row.original.contactElectronicAddress}
      
      </div>
    </>
  );
}

function CellAddress({ row }) {
  return (
    <>
      <div className="max-celladdress">
        {row.original.primaryAddress1} , {row.original.primaryAddress2} ,
        {row.original.primaryCity} ,{" "}
      </div>
      <div className="max-celladdress">
        {row.original.primaryState} ,{row.original.primaryZip}{" "}
      </div>
      <div className="rectangle-intable">
        {" "}
        <span className="fa fa-phone text-health-icon pr-1"></span>{" "}
        {/* {row.original.phoneNumber} */}
        {/* {row.original.phoneNumber && formatPhoneNumber(row.original.phoneNumber)} */}
        {/* { formatPhoneNumberIntl("7765855854")} */}
       {PhoneNumberFormater(row.original.phoneNumber)} 
      </div>
    </>
  );
}

const HealthTable = () => {
  let history = useHistory();

  const [data, setdata] = useState([]);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  //  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  // const [pageSize, setPageSize] = useState(3);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHealthSystemList(searchQuery);
        setdata(result.data.data);

        const countQuery = { searchTerm: searchQuery.searchTerm };
        const resultCount = await getHealthSystemListCount(countQuery);
        setCount(resultCount.data.data.totalCount);
        let pageCount =
          resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage;
        //  console.log(pageCount)
        setPage(Math.ceil(pageCount));
        
        // console.log(count)
      } catch (error) {
        OnError(error, dispatch);
      }
    };
    fetchData();
  }, [searchQuery]);

  //  const searchTextChange= (value)=>{
  //    debugger;
  //   //  console.log();
  //   if(value.length>3){
  //     setSearchQuery({...initialSearch,searchTerm:value})
  //   }

  //   console.log(searchQuery);
  //  }

  //  const resCount = useCallback(
  //    () => {
  //     searchTextChange(searchTerm)
  //    },
  //    [searchTerm]
  //  )

  const searchTextChange = (e) => {
    // setSearchTerm(e.target.value)
    if (e.target.value.length > 3) {
      setSearchQuery({ ...initialSearch, searchTerm: e.target.value });
    } else if (e.target.value.length == "") {
      setSearchQuery({ ...initialSearch, searchTerm: e.target.value });
    } else {
    }
  };
  const pageChange = (event, value) => {
    setPage(value);
    setSearchQuery({ ...searchQuery, pageNumber: value });
  };

  const addNewHeathSystem = () => {
    history.push("/healthsystem/profile");
  };

  const redirectToPage=(value)=>{
    // history.push(`/healthsystem/profile/${value}`);


    history.push({
      pathname: `/healthsystem/profile`,
      search: `?id=${value}`,
      // state: { detail: 'some_value' }
  });

  }

  //SETTING COLUMNS NAMES
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: ({ value }) => (
          <h5 className="font-weight-normal text-black"> {value} </h5>
        ),
      },
      {
        Header: "Address",
        accessor: "primaryAddress1", // accessor is the "key" in the data
        Cell: CellAddress,
      },
      {
        Header: "Contact",
        Cell: CellContract,
      },
      {
        Header: "Action",
        accessor: "partyRoleId",
        // accessor: '[row identifier to be passed to button]',
        Cell: ({ value }) => (
          <div className="text-center text-gray font-15re cursor-point" onClick={()=>redirectToPage(value)}>
            <span className="fa fa-ellipsis-h "></span>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <>

      {/* <HealthSystemHeader  handleSearchChange={searchTextChange } handleAddNew={addNewHeathSystem}/> */}
      <AdminHeaderWithSearch
        showCount={count}
        handleSearchChange={searchTextChange}
        handleAddNew={addNewHeathSystem}
        placeholder="&#xF002; Search here.."
        buttonTitle="New Health System"
      />
      <div className="LatoRegular">
        <table {...getTableProps} className="table table-hover ">
          <thead className="thead-dark LatoBlack">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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

        <PaginationTable handlePageChange={pageChange} countPage={page}  count={count} currentPage={searchQuery.pageNumber}/>
      </div>
    </>
  );
};

export default HealthTable;
