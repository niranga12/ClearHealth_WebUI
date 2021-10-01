/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonPermissions, ScreenPermissions, TableSettingsEnum} from 'src/reusable/enum';
import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater';
import DataTable from 'src/views/common/dataTable';
import PaginationTable from 'src/views/common/paginationTable';
import OnError from 'src/_helpers/onerror';
import 'font-awesome/css/font-awesome.min.css';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import {useHistory} from 'react-router-dom';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';
import {getProvidersList, getProvidersListCount} from 'src/service/providerService';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import PermissionButton from 'src/reusable/PermissionButton';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
	sortOrder: 'desc',
	orderBy: 'id',
};

function CellProvider({row}) {
	return (
		<>
			<div className='max-celladdress'>
				{row.original.firstName} {row.original.lastName}
			</div>
			<div className='max-celladdress'>
				{row.original.address1} {', '} {row.original.address2} {', '} {row.original.state} {', '} {row.original.zip}
			</div>
			<div className='rectangle-intable'>
				{' '}
				<span className='fa fa-phone text-health-icon pr-1'></span> {PhoneNumberFormater(row.original.phone)}
			</div>
		</>
	);
}

function ActionProvider({row}) {
	let history = useHistory();

	// for permission
	const [isEditProviderPE, setIsEditProviderPE] = useState(false);
	const [isDeleteProviderPE, setIsDeleteProviderPE] = useState(false);

	let permissionList = useSelector((state) => state.Permission.UiPermissions);

	useEffect(() => {
		const fetchPermission = async () => {
			let EditPermission = await PermissionButton(ScreenPermissions.Providers, ButtonPermissions.EditProviders, permissionList);
			setIsEditProviderPE(EditPermission);

			let DeletePermission = await PermissionButton(ScreenPermissions.Providers, ButtonPermissions.DeleteProviders, permissionList);
			setIsDeleteProviderPE(DeletePermission);
		};

		fetchPermission();
	}, []);

	const redirectToEdit = () => {
		history.push({
			pathname: `/providers/profile`,
			search: `?id=${row.original.partyRoleId}`,
			// state: { detail: 'some_value' }
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
				<CDropdownMenu className={`${(!isEditProviderPE && !isDeleteProviderPE) ? 'hide':'' }`}>
				{isEditProviderPE && 	<CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>}
				{isDeleteProviderPE &&	<CDropdownItem >Delete</CDropdownItem>}
					{/* <CDropdownItem onClick={redirectAccount}>Account</CDropdownItem> */}
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const ProviderTable = () => {
	let history = useHistory();

	const [providerData, seProviderData] = useState([]);

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);

	const dispatch = useDispatch();

	const [searchQuery, setSearchQuery] = useState(initialSearch);

	// for permission
	const [isAddProviderPE, setIsAddProviderPE] = useState(false);
	let permissionList = useSelector((state) => state.Permission.UiPermissions);

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(loaderShow());
				// button Permission
				let Permission = PermissionButton(ScreenPermissions.Providers, ButtonPermissions.AddProviders, permissionList);
				setIsAddProviderPE(Permission);

				const result = await getProvidersList(searchQuery);
				seProviderData(result.data.data);

				const countQuery = {searchTerm: searchQuery.searchTerm};
				const resultCount = await getProvidersListCount(countQuery);
				setCount(resultCount.data.data.totalCount);
				let pageCount = resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage;
				setPage(Math.ceil(pageCount));
				dispatch(loaderHide());
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, [searchQuery]);

	const pageChange = (event, value) => {
		setSearchQuery({...searchQuery, pageNumber: value});
	};

	const searchTextChange = (e) => {
		if (e.target.value.length > 3) {
			setSearchQuery({...initialSearch, searchTerm: e.target.value});
			// eslint-disable-next-line eqeqeq
		} else if (e.target.value.length == '') {
			setSearchQuery({...initialSearch, searchTerm: e.target.value});
		} else {
		}
	};

	const addNewProvider = () => {
		history.push('/providers/profile');
	};

	const sortingHandler = (sorting) => {
		if (sorting.length > 0) {
			let result = {...searchQuery, orderBy: sorting[0].id ? sorting[0].id : '', sortOrder: sorting[0].desc ? 'desc' : 'asc'};
			setSearchQuery(result);
		} else {
			// this validation for initial load avoid 2 times call api
			if (JSON.stringify(initialSearch) !== JSON.stringify(searchQuery)) {
				let result = {...searchQuery, orderBy: '', sortOrder: ''};
				setSearchQuery(result);
			}
		}
	};

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Health System',
				accessor: 'healthSystem', // accessor is the "key" in the data
				Cell: ({value}) => <h5 className='font-weight-normal text-black ml-4'> {value} </h5>,
			},
			{
				Header: 'Hospital Name',
				accessor: 'hospital', // accessor is the "key" in the data
			},

			{
				Header: 'Provider',
				accessor: 'firstName', // accessor is the "key" in the data
				// disableSortBy: true,
				Cell: CellProvider,
			},
			{
				Header: '',
				accessor: 'partyRoleId',
				// accessor: '[row identifier to be passed to button]',
				Cell: ActionProvider,
			},
		],
		[]
	);

	return (
		<>
			<AdminHeaderWithSearch showCount={count} handleSearchChange={searchTextChange} handleAddNew={addNewProvider} placeholder='Search here..' buttonTitle='New Provider' title='Providers' buttonHide={!isAddProviderPE} />
			<DataTable columns={columns} data={providerData} sortingHandler={sortingHandler} />
			<div className='row'>
				<div className='col-md-12 pl-5 pr-5'>{count > 0 ? <PaginationTable handlePageChange={pageChange} countPage={page} count={count} currentPage={searchQuery.pageNumber} /> : ''}</div>
			</div>
		</>
	);
};

export default ProviderTable;
