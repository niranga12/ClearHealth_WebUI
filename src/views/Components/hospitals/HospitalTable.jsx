/* eslint-disable eqeqeq */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPermissions, ScreenPermissions, TableSettingsEnum } from 'src/reusable/enum';
import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater';
import { getHospitalsList, getHospitalsListCount } from 'src/service/hospitalsService';
import DataTable from 'src/views/common/dataTable';
import PaginationTable from 'src/views/common/paginationTable';
import OnError from 'src/_helpers/onerror';
import 'font-awesome/css/font-awesome.min.css';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import { useHistory, useLocation } from 'react-router-dom';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import PermissionButton from 'src/reusable/PermissionButton';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
	sortOrder:'desc',
	orderBy:'id',
	healthSystemPartyRoleId:null
};

function CellContract({ row }) {
	return (
		<>
			<div>{row.original.contactName}</div>
			<div className='rectangle-intable'>
				{' '}
				<span className='fa fa-phone text-health-icon pr-1'></span> {PhoneNumberFormater(row.original.contactNumber)}
			</div>
			<div className='rectangle-intable'>
				{' '}
				<span className='fa fa-envelope text-health-icon pr-1'></span> {row.original.contactElectronicAddress}
			</div>
		</>
	);
}

function CellAddress({ row }) {
	return (
		<>
			<div className='max-celladdress'>
				{row.original.primaryAddress1} , {row.original.primaryAddress2} ,{row.original.primaryCity} ,{' '}
			</div>
			<div className='max-celladdress'>
				{row.original.primaryState} ,{row.original.primaryZip}{' '}
			</div>
			<div className='rectangle-intable'>
				{' '}
				<span className='fa fa-phone text-health-icon pr-1'></span> {PhoneNumberFormater(row.original.phoneNumber)}
			</div>
		</>
	);
}

function CellHospitalName({ row }) {
	let history = useHistory();
	const onclickBoarding = () => {
		history.push({
			pathname: `/hospitals/profile`,
			search: `?id=${row.original.partyRoleId}&&onboarding=bottom`,
			// state: { detail: 'some_value' }
		});
	};
	return (
		<>
			<div className='max-celladdress'>
				<h5 className='font-weight-normal text-black'> {row.original.name} </h5>
				{ row.original.isOnboardingCompleted != '1' && <div  className="cursor-point text-primary" onClick={onclickBoarding}>(Onboarding Pending)</div>}
		
			</div>
		</>
	);
}

function ActionHospital({ row }) {
	let history = useHistory();
	const [editPE, setEditPE] = useState(false);
	let permissionList= useSelector((state) => state.Permission.UiPermissions);

	useEffect(() => {
		let Permission=PermissionButton(ScreenPermissions.Hospital,ButtonPermissions.EditHospital,permissionList);
		setEditPE(Permission);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const redirectToEdit = () => {
		history.push({
			pathname: `/hospitals/profile`,
			search: `?id=${row.original.partyRoleId}`,
			// state: { detail: 'some_value' }
		});
	};

	const redirectAccount = () => {
		history.push({
			pathname: `/hospitals/hospital`,
			search: `?id=${row.original.partyRoleId}&&name=${row.original.name}`,
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
				<CDropdownMenu >
				{editPE && <CDropdownItem onClick={redirectToEdit}>Edit Details</CDropdownItem>}	
					<CDropdownItem onClick={redirectAccount}>View Account</CDropdownItem>
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const HospitalTable = () => {
	let history = useHistory();
	const location = useLocation();
	// const [healthSystemPartyId, setHealthSystemPartyId] = useState(null);
    // const [healthSystemName, setHealthSystemName] = useState(null)

	const [hospitalData, setHospitalData] = useState([]);

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);

	// for button permission
	const [addHospital, setAddHospital] = useState(false);
	let permissionList= useSelector((state) => state.Permission.UiPermissions);

	const dispatch = useDispatch();

	const [searchQuery, setSearchQuery] = useState(initialSearch);

	useEffect(() => {
		
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		// const healthname=params.get('healthSystemName');
		// setHealthSystemPartyId(id);
		// setHealthSystemName(healthname)

		const fetchData = async () => {
			try {
				dispatch(loaderShow());

				// button Permission
				let Permission=PermissionButton(ScreenPermissions.Hospital,ButtonPermissions.AddHospital,permissionList);
				setAddHospital(Permission);
				
			let searchItemQuery= id?{...searchQuery, healthSystemPartyRoleId: [Number(id)]}:searchQuery

				const result = await getHospitalsList(searchItemQuery);
				setHospitalData(result.data.data);


				const countQuery = { searchTerm: searchQuery.searchTerm,healthSystemPartyRoleId: id? [Number(id)]: "" };
				const resultCount = await getHospitalsListCount(countQuery);
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
	}, [searchQuery,location]);


// useEffect(() => {
// 	    const params = new URLSearchParams(location.search);
// 		const id = params.get('id');
// 		setHealthSystemPartyId(id);
// 		setSearchQuery({ ...searchQuery, healthSystemPartyRoleId: id });
// }, [location])





	const pageChange = (event, value) => {
		// setPage(value);
		setSearchQuery({ ...searchQuery, pageNumber: value });
	};

	const searchTextChange = (e) => {
		if (e.target.value.length > 3) {
			setSearchQuery({ ...initialSearch, searchTerm: e.target.value });
			// eslint-disable-next-line eqeqeq
		} else if (e.target.value.length == '') {
			setSearchQuery({ ...initialSearch, searchTerm: e.target.value });
		} else {
		}
	};

	const addNewHospital = () => {
		history.push('/hospitals/profile');
	};



	const sortingHandler = (sorting) => {
		if (sorting.length > 0) {
			let result = { ...searchQuery, orderBy: sorting[0].id ? sorting[0].id : "", sortOrder: sorting[0].desc ? 'desc' : 'asc' }
			setSearchQuery(result)
		}
		else {
			// this validation for initial load avoid 2 times call api
			if (JSON.stringify(initialSearch) !== JSON.stringify(searchQuery)) {
				let result = { ...searchQuery, orderBy: "", sortOrder: "" }
				setSearchQuery(result)
			}
		}

	}

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Health System',
				accessor: 'healthSystemName', // accessor is the "key" in the data
				Cell: ({ value }) => <h5 className='font-weight-normal text-black ml-4'> {value} </h5>,
			},
			{
				Header: 'Hospital Name',
				accessor: 'name', // accessor is the "key" in the data
				Cell: CellHospitalName
				// Cell: ({value}) => <h5 className='font-weight-normal text-black'> {value} </h5>,
			},

			{
				Header: 'Address',
				accessor: 'primaryAddress1', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: CellAddress,
			},
			{
				Header: 'Contact',
				Cell: CellContract,
			},
			{
				Header: '',
				accessor: 'partyRoleId',
				disableSortBy: true,
				// accessor: '[row identifier to be passed to button]',
				Cell: ActionHospital,

			},
		],
		[]
	);

	return (
		<>
			<AdminHeaderWithSearch showCount={count} handleSearchChange={searchTextChange} handleAddNew={addNewHospital} placeholder='Search here..'   buttonTitle='New Hospital' buttonHide={!addHospital}  title='Hospitals' />
			<DataTable columns={columns} data={hospitalData} sortingHandler={sortingHandler} />
			<div className='row'>
				<div className='col-md-12 pl-5 pr-5'>{count > 0 ? <PaginationTable handlePageChange={pageChange} countPage={page} count={count} currentPage={searchQuery.pageNumber} /> : ''}</div>
			</div>
		</>
	);
};

export default HospitalTable;
