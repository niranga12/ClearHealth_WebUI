/* eslint-disable eqeqeq */
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonPermissions, ScreenPermissions, TableSettingsEnum} from 'src/reusable/enum';
import DataTable from 'src/views/common/dataTable';
import PaginationTable from 'src/views/common/paginationTable';
import OnError from 'src/_helpers/onerror';
import 'font-awesome/css/font-awesome.min.css';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import {useHistory} from 'react-router-dom';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {getUserList, getUserListCount} from 'src/service/userService';
import PermissionButton from 'src/reusable/PermissionButton';
import MetaTitles from 'src/views/common/metaTitles';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
	orderBy: '',
	sortOrder: '',
};

function ActionUser({row}) {
	let history = useHistory();

	const [editPE, setEditPE] = useState(false);
	const [deletePE, setdeletePE] = useState(false);
	let permissionList = useSelector((state) => state.Permission.UiPermissions);

	useEffect(() => {
		let Permission = PermissionButton(ScreenPermissions.UserManagement, ButtonPermissions.EditUser, permissionList);
		setEditPE(Permission);

		let deletePermission = PermissionButton(ScreenPermissions.UserManagement, ButtonPermissions.DeleteUser, permissionList);
		setdeletePE(deletePermission);
	}, []);

	const redirectToEdit = () => {
		history.push({
			pathname: `/users/profile`,
			search: `?id=${row.original.partyRoleId}`,
			// state: { detail: 'some_value' }
		});
	};

	return (
		<>
			<CDropdown>
				<CDropdownToggle className='p-0'>
					<div className='text-center text-gray font-15re three-dot-margin cursor-point  ml-3'>
						<span className='fa fa-ellipsis-h '></span>
					</div>
				</CDropdownToggle>
				<CDropdownMenu>
					{editPE && <CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>}
					{/* {deletePE && <CDropdownItem >Delete</CDropdownItem>}	 */}
					{/* <CDropdownItem onClick={redirectAccount}>Account</CDropdownItem> */}
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const UserTable = () => {
	let history = useHistory();

	const [userData, setUserData] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState(initialSearch);
	// for button permission
	const [addUsetPE, setAddUserPE] = useState(false);
	let permissionList = useSelector((state) => state.Permission.UiPermissions);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// button Permission
				let Permission = PermissionButton(ScreenPermissions.UserManagement, ButtonPermissions.AddUser, permissionList);
				setAddUserPE(Permission);

				dispatch(loaderShow());
				const getQuery = {
					itemsPerPage: searchQuery.itemsPerPage,
					pageNumber: searchQuery.pageNumber,
					searchTerm: searchQuery.searchTerm,
					orderBy: searchQuery.orderBy,
					sortOrder: searchQuery.sortOrder,
				};
				const result = await getUserList(getQuery);
				setUserData(result.data.data);
				const countQuery = {searchTerm: searchQuery.searchTerm};
				const resultCount = await getUserListCount(countQuery);
				setCount(resultCount.data.data.totalCount);
				let pageCount = resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage;
				setPage(Math.ceil(pageCount));
				dispatch(loaderHide());
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	const pageChange = (event, value) => {
		setSearchQuery({...searchQuery, pageNumber: value});
	};

	const searchTextChange = (e) => {
		if (e.target.value.length > 3) {
			setSearchQuery({...initialSearch, searchTerm: e.target.value});
		} else if (e.target.value.length == '') {
			setSearchQuery({...initialSearch, searchTerm: e.target.value});
		} else {
		}
	};

	const addNewUser = () => {
		history.push('/users/profile');
	};

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'firstName', // accessor is the "key" in the data
				Cell: ({row}) => (
					<h5 className='font-weight-normal text-black ml-4'>
						{' '}
						{row.original.firstName} {row.original.lastName}{' '}
					</h5>
				),
			},
			{
				Header: 'Email',
				accessor: 'email', // accessor is the "key" in the data
				Cell: ({row}) => <h5 className='max-celladdress'> {row.original.email}</h5>,
			},

			{
				Header: 'Role Type',
				accessor: 'roleTypeName', // accessor is the "key" in the data
				Cell: ({row}) => <h5 className='max-celladdress'> {row.original.roleTypeName}</h5>,
			},
			{
				Header: 'Status',
				accessor: 'status', // accessor is the "key" in the data
				Cell: ({row}) => <h5 className='max-celladdress'> {row.original.status}</h5>,
			},
			{
				Header: '',
				accessor: 'partyRoleId',
				// accessor: '[row identifier to be passed to button]',
				Cell: ActionUser,
			},
		],
		[]
	);

	return (
		<>
		 {/* for addeing page metas  */}
         <MetaTitles title="Clear Health | Users" description=" Users  "/>
			<AdminHeaderWithSearch showCount={count} handleSearchChange={searchTextChange} handleAddNew={addNewUser} placeholder='Search here..' buttonTitle='New User' title='Users' buttonHide={!addUsetPE} />
			<DataTable columns={columns} data={userData} />
			<div className='row'>
				<div className='col-md-12 pl-5 pr-5'>{count > 0 ? <PaginationTable handlePageChange={pageChange} countPage={page} count={count} currentPage={searchQuery.pageNumber} /> : ''}</div>
			</div>
		</>
	);
};

export default UserTable;
