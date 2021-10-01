/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ButtonPermissions, ScreenPermissions, TableSettingsEnum } from "src/reusable/enum";
import {
  getHealthSystemList,
  getHealthSystemListCount,
} from "src/service/healthsystemService";
import AdminHeaderWithSearch from "src/views/common/adminHeaderWithSearch";
import PaginationTable from "src/views/common/paginationTable";
// import history from "src/_helpers/history";
// import { getUserList } from "src/service/userService";
import OnError from "src/_helpers/onerror";
import PhoneNumberFormater from "src/reusable/PhoneNumberFormater";
import DataTable from "src/views/common/dataTable";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/react";
import { loaderHide, loaderShow } from "src/actions/loaderAction";
import PermissionButton from "src/reusable/PermissionButton";

const initialSearch = {
  itemsPerPage: TableSettingsEnum.ItemPerPage,
  pageNumber: 1,
  searchTerm: "",
  sortOrder:'desc',
	orderBy:'id'
};


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
        {row.original.primaryAddress1} , {row.original.primaryAddress2} {row.original.primaryAddress2? ',':''} 
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



function ActionHealthSystem({row}) {
	let history = useHistory();
  // for permission
  const [isEditHealthPE, setIsEditHealthPE] = useState(false);
  const [isDeleteHealthPE, setIsDeleteHealthPE] = useState(false);

  let permissionList= useSelector((state) => state.Permission.UiPermissions);


useEffect(() => {
  const fetchPermission = async () => {

  let EditPermission= await PermissionButton(ScreenPermissions.HealthSystem,ButtonPermissions.EditHealthSystem,permissionList);
   setIsEditHealthPE(EditPermission);

  let DeletePermission=await PermissionButton(ScreenPermissions.HealthSystem,ButtonPermissions.DeleteHealthSystem,permissionList);
   setIsDeleteHealthPE(DeletePermission);
  }

  fetchPermission();


}, [])


	const redirectToEdit = () => {
		history.push({
      pathname: `/healthsystem/profile`,
			search: `?id=${row.original.partyRoleId}`,
		
		});
	};

	

	return (
		<>
			<CDropdown className='m-1'>
				<CDropdownToggle>
					<div className='text-center text-gray font-15re cursor-point  ml-3'>
						<span className='fa fa-ellipsis-h '></span>
					</div>
				</CDropdownToggle>
				<CDropdownMenu className={`${(!isEditHealthPE && !isDeleteHealthPE) ? 'hide':'' }`}>
				{isEditHealthPE && <CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>}
				{isDeleteHealthPE && <CDropdownItem >Delete</CDropdownItem>}	
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const HealthTable = () => {
  let history = useHistory();

  const [data, setdata] = useState([]);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  //  const [searchTerm, setSearchTerm] = useState("");

  // for permission
  const [isAddHealthPE, setIsAddHealthPE] = useState(false);
  let permissionList= useSelector((state) => state.Permission.UiPermissions);

  const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  // const [pageSize, setPageSize] = useState(3);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(loaderShow());
// button Permission
let Permission=PermissionButton(ScreenPermissions.HealthSystem,ButtonPermissions.AddHealthSystem,permissionList);
setIsAddHealthPE(Permission);


        const result = await getHealthSystemList(searchQuery);
        setdata(result.data.data);

        const countQuery = { searchTerm: searchQuery.searchTerm };
        const resultCount = await getHealthSystemListCount(countQuery);
        setCount(resultCount.data.data.totalCount);
        let pageCount =
          resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage;
      
        setPage(Math.ceil(pageCount));
        dispatch(loaderHide());

      
      } catch (error) {
        OnError(error, dispatch);
      }
    };
    fetchData();
  }, [searchQuery]);

  //  const searchTextChange= (value)=>{

  
  //   if(value.length>3){
  //     setSearchQuery({...initialSearch,searchTerm:value})
  //   }

  
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
    // eslint-disable-next-line eqeqeq
    } else if (e.target.value.length == "") {
      setSearchQuery({ ...initialSearch, searchTerm: e.target.value });
    } else {
    }
  };
  const pageChange = (event, value) => {
    // setPage(value);
    setSearchQuery({ ...searchQuery, pageNumber: value });
  };

  const addNewHeathSystem = () => {
    history.push("/healthsystem/profile");
  };

  // const redirectToPage = (value) => {
  //   // history.push(`/healthsystem/profile/${value}`);

  //   history.push({
  //     pathname: `/healthsystem/profile`,
  //     search: `?id=${value}`,
  //     // state: { detail: 'some_value' }
  //   });
  // };

  //SETTING COLUMNS NAMES
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: ({ value }) => (
          <h5 className="font-weight-normal text-black ml-4 max-health-name"> {value} </h5>
        ),
      },
      {
        Header: "Address",
        accessor: "primaryAddress1", // accessor is the "key" in the data
        disableSortBy: true,
        Cell: CellAddress,
      },
      {
        Header: "Contact",
        Cell: CellContract,
      },
      {
        Header: "",
        accessor: "partyRoleId",
        // accessor: '[row identifier to be passed to button]',
        Cell:ActionHealthSystem
      //   Cell: ({ value }) => (
      //     <div
      //       className="text-center text-gray font-15re cursor-point"
      //       onClick={() => redirectToPage(value)}
      //     >
      //       <span className="fa fa-ellipsis-h "></span>
      //     </div>
      //   ),
       },
    ],
    []
  );

  const sortingHandler=(sorting)=>{  
    if(sorting.length > 0){
      let result={...searchQuery,orderBy:sorting[0].id?sorting[0].id :"", sortOrder:sorting[0].desc?'desc':'asc' }
      setSearchQuery(result)
    }
    else{
     // this validation for initial load avoid 2 times call api
      if(JSON.stringify(initialSearch) !== JSON.stringify(searchQuery)){
        let result={...searchQuery, orderBy:"", sortOrder:"" }
        setSearchQuery(result)
      }     
    }

  }

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data });
  return (
    <>
      {/* <HealthSystemHeader  handleSearchChange={searchTextChange } handleAddNew={addNewHeathSystem}/> */}
      <AdminHeaderWithSearch
        showCount={count}
        handleSearchChange={searchTextChange}
        handleAddNew={addNewHeathSystem}
        placeholder="Search here.."
        buttonTitle="New Health System"
        title="Health Systems"
        buttonHide={!isAddHealthPE}
      />

<DataTable columns={columns} data={data}  sortingHandler={sortingHandler}/>

      {/* <div className="LatoRegular tableCover"> */}
        {/* <table {...getTableProps} className="table table-hover ">
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
        </table> */}
        <div className="row">
          <div className="col-md-12 pl-5 pr-5">
            {count > 0 ? (
              <PaginationTable
                handlePageChange={pageChange}
                countPage={page}
                count={count}
                currentPage={searchQuery.pageNumber}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default HealthTable;
