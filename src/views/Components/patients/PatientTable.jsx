/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonPermissions, ScreenPermissions, selectionListDropDown, TableSettingsEnum } from 'src/reusable/enum'
import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater'
import DataTable from 'src/views/common/dataTable'
import PaginationTable from 'src/views/common/paginationTable'
import OnError from 'src/_helpers/onerror'
import 'font-awesome/css/font-awesome.min.css'
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch'
import { useHistory } from 'react-router-dom'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { getPatientList, getPatientListCount } from 'src/service/patientService'
import PermissionButton from 'src/reusable/PermissionButton'

const initialSearch = {
  itemsPerPage: TableSettingsEnum.ItemPerPage,
  pageNumber: 1,
  searchTerm: '',
  filter: ''
}

function CellPatient({ row }) {
  return (
    <>
      <div className="rectangle-intable">
        {' '}
        <span className="fa fa-phone text-health-icon pr-1"></span> {PhoneNumberFormater(row.original.phoneNumber)}
      </div>
    </>
  )
}

// function CellAddress({row}) {
// 	return (
// 		<>
// 			<div className='max-celladdress'>
// 				{row.original.address1}, {row.original.address2},  {row.original.city}, {row.original.state}  {row.original.zip}
// 			</div>
// 		</>
// 	);
// }

function ActionPatient({ row }) {
  let history = useHistory()
  const [editPE, setEditPE] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [deletePE, setdeletePE] = useState(false)
  let permissionList = useSelector((state) => state.Permission.UiPermissions)

  useEffect(() => {
    let Permission = PermissionButton(ScreenPermissions.Patients, ButtonPermissions.EditPatient, permissionList)
    setEditPE(Permission)

    let deletePermission = PermissionButton(ScreenPermissions.Patients, ButtonPermissions.DeletePatient, permissionList)
    setdeletePE(deletePermission)
  }, [])

  const redirectToEdit = () => {
    history.push({
      pathname: `/patients/profile`,
      search: `?id=${row.original.partyRoleId}`
      // state: { detail: 'some_value' }
    })
  }

  const redirectToOrder = () => {
    history.push({
      pathname: `/patients/orders`,
      search: `?id=${row.original.partyRoleId}`
      // state: { detail: 'some_value' }
    })
  }

  return (
    <>
      <CDropdown>
        <CDropdownToggle className="p-0">
          <div className="text-center text-gray font-15re p-0 cursor-point  ml-3">
            <span className="fa fa-ellipsis-h "></span>
          </div>
        </CDropdownToggle>
        <CDropdownMenu>
          {editPE && <CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>}
          <CDropdownItem onClick={redirectToOrder}>View Orders</CDropdownItem>

          {/* {deletePE && <CDropdownItem >Delete</CDropdownItem> } */}
          {/* <CDropdownItem onClick={redirectAccount}>Account</CDropdownItem> */}
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

const PatientTable = () => {
  let history = useHistory()

  const [patientData, sePatientData] = useState([])

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const dispatch = useDispatch()

  // for button permission
  // const [addPatientPE, setAddPatientPE] = useState(false);
  // let permissionList= useSelector((state) => state.Permission.UiPermissions);

  const [searchQuery, setSearchQuery] = useState(initialSearch)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // button Permission
        // let Permission=PermissionButton(ScreenPermissions.Patients,ButtonPermissions.AddPatient,permissionList);
        // setAddPatientPE(Permission);

        dispatch(loaderShow())
        const result = await getPatientList(searchQuery)
        sePatientData(result.data.data)

        const countQuery = { searchTerm: searchQuery.searchTerm, filter: searchQuery.filter }
        const resultCount = await getPatientListCount(countQuery)
        setCount(resultCount.data.data.totalCount)
        let pageCount = resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage
        setPage(Math.ceil(pageCount))
        dispatch(loaderHide())
      } catch (error) {
        OnError(error, dispatch)
      }
    }
    fetchData()
  }, [searchQuery])

  const pageChange = (event, value) => {
    setSearchQuery({ ...searchQuery, pageNumber: value })
  }

  const searchTextChange = (e) => {
    if (e.target.value.length > 1) {
      setSearchQuery({ ...initialSearch, searchTerm: e.target.value })
    } else if (e.target.value.length == '') {
      setSearchQuery({ ...initialSearch, searchTerm: e.target.value })
    } else {
    }
  }

  const addNewPatient = () => {
    history.push('/patients/profile')
  }

  const dropDownChange = (e) => {
    setSearchQuery({ ...initialSearch, filter: e.target.value })
  }

  //SETTING COLUMNS NAMES
  const columns = useMemo(
    () => [
      {
        Header: 'Patient Name',
        accessor: 'firstName', // accessor is the "key" in the data
        Cell: ({ row }) => (
          <h5 className="font-weight-normal text-black ml-4">
            {' '}
            {row.original.firstName} {row.original.lastName}{' '}
          </h5>
        )
      },
      {
        Header: 'DOB',
        disableSortBy: true,
        accessor: 'DOB', // accessor is the "key" in the data
        Cell: ({ row }) => <div className="max-celladdress"> {row.original.DOB}</div>
      },

      // {
      // 	Header: 'Address',
      // 	disableSortBy: true,
      // 	accessor: 'address1', // accessor is the "key" in the data
      // 	Cell: CellAddress,
      // },
      {
        Header: 'Phone',
        disableSortBy: true,
        accessor: 'phoneNumber', // accessor is the "key" in the data
        Cell: CellPatient
      },
      {
        Header: '',
        accessor: 'partyRoleId',
        // accessor: '[row identifier to be passed to button]',
        Cell: ActionPatient
      }
    ],
    []
  )

  return (
    <>
      <AdminHeaderWithSearch
        showCount={count}
        handleSearchChange={searchTextChange}
        handleAddNew={addNewPatient}
        handleDropDownChange={dropDownChange}
        selectionList={selectionListDropDown}
        buttonHide={true}
        placeholder="Search here.."
        buttonTitle="New Patient"
        title="Patients"
      />
      <DataTable columns={columns} data={patientData} />
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
            ''
          )}
        </div>
      </div>
    </>
  )
}

export default PatientTable
