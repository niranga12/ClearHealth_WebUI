import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {TableSettingsEnum} from 'src/reusable/enum';
import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater';
import { getHospitalsListCount} from 'src/service/hospitalsService';
import DataTable from 'src/views/common/dataTable';
import PaginationTable from 'src/views/common/paginationTable';
import OnError from 'src/_helpers/onerror';
import 'font-awesome/css/font-awesome.min.css';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import {useHistory} from 'react-router-dom';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';
import { getProvidersList, getProvidersListCount } from 'src/service/providerService';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
};


function CellProvider({row}) {

	return (
		<>
			<div className='max-celladdress'>
				{row.original.firstName} {' '} {row.original.lastName} 
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
				<CDropdownMenu>
					<CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(loaderShow());
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
		} else if (e.target.value.length == '') {
			setSearchQuery({...initialSearch, searchTerm: e.target.value});
		} else {
		}
	};

	const addNewProvider = () => {

		history.push('/providers/profile');
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
				accessor: 'Provider', // accessor is the "key" in the data
				disableSortBy: true,
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
			<AdminHeaderWithSearch showCount={count} handleSearchChange={searchTextChange} handleAddNew={addNewProvider} placeholder='Search here..' buttonTitle='New Provider' title='Providers' />
			<DataTable columns={columns} data={providerData} />
			<div className='row'>
				<div className='col-md-12 pl-5 pr-5'>{count > 0 ? <PaginationTable handlePageChange={pageChange} countPage={page} count={count} currentPage={searchQuery.pageNumber} /> : ''}</div>
			</div>
		</>
	);
};

export default ProviderTable;
