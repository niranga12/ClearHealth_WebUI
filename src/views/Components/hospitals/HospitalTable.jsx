import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {TableSettingsEnum} from 'src/reusable/enum';
import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater';
import {getHospitalsList, getHospitalsListCount} from 'src/service/hospitalsService';
import DataTable from 'src/views/common/dataTable';
import PaginationTable from 'src/views/common/paginationTable';
import OnError from 'src/_helpers/onerror';
import 'font-awesome/css/font-awesome.min.css';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import {useHistory} from 'react-router-dom';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
};

function CellContract({row}) {
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

function CellAddress({row}) {
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

function ActionHospital({row}) {
	let history = useHistory();
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
				<CDropdownMenu>
					<CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>
					<CDropdownItem onClick={redirectAccount}>Account</CDropdownItem>
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const HospitalTable = () => {
	let history = useHistory();

	const [hospitalData, setHospitalData] = useState([]);

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);

	const dispatch = useDispatch();

	const [searchQuery, setSearchQuery] = useState(initialSearch);

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(loaderShow());

				const result = await getHospitalsList(searchQuery);
				setHospitalData(result.data.data);
			

				const countQuery = {searchTerm: searchQuery.searchTerm};
				const resultCount = await getHospitalsListCount(countQuery);
				setCount(resultCount.data.data.totalCount);
				let pageCount = resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage;
				setPage(Math.ceil(pageCount));
				// console.log(count)
				dispatch(loaderHide());

			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);
  
	
	

	const pageChange = (event, value) =>{
		// setPage(value);
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

	const addNewHospital = () => {
		history.push('/hospitals/profile');
	};

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Health System',
				accessor: 'healthSystemName', // accessor is the "key" in the data
				Cell: ({value}) => <h5 className='font-weight-normal text-black ml-4'> {value} </h5>,
			},
			{
				Header: 'Hospital Name',
				accessor: 'name', // accessor is the "key" in the data
				Cell: ({value}) => <h5 className='font-weight-normal text-black'> {value} </h5>,
			},

			{
				Header: 'Address',
				accessor: 'primaryAddress1', // accessor is the "key" in the data
				Cell: CellAddress,
			},
			{
				Header: 'Contact',
				Cell: CellContract,
			},
			{
				Header: '',
				accessor: 'partyRoleId',
				// accessor: '[row identifier to be passed to button]',
				Cell: ActionHospital,
				
			},
		],
		[]
	);

	return (
		<>
			<AdminHeaderWithSearch showCount={count} handleSearchChange={searchTextChange} handleAddNew={addNewHospital} placeholder='Search here..' buttonTitle='New Hospital' title='Hospitals' />
			<DataTable columns={columns} data={hospitalData} />
			<div className='row'>
				<div className='col-md-12 pl-5 pr-5'>{count > 0 ? <PaginationTable handlePageChange={pageChange} countPage={page} count={count} currentPage={searchQuery.pageNumber} /> : ''}</div>
			</div>
		</>
	);
};

export default HospitalTable;
