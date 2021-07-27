import React, {useEffect, useMemo, useState} from 'react';
import DataTable from 'src/views/common/dataTable';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {TableSettingsEnum} from 'src/reusable/enum';
import {getProviderListByHospitalId, getProviderListCountByHospitalId} from 'src/service/hospitalsService';
import OnError from 'src/_helpers/onerror';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import PaginationTable from 'src/views/common/paginationTable';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
};

function ProviderNames({row}) {
	return (
		<>
		<h5 className='font-weight-normal text-black ml-4'> {row.original.firstName} {row.original.lastName}</h5> 
		</>	
	);
	
}

function ProviderActions({row}) {
	return(
		<>
			<div className="btn btn-outline-secondary text-black-50 ml-3 float-right">Add Procedures</div>
		<div className="btn btn-outline-secondary text-black-50 ml-3 float-right">View Procedures</div>
	
		</>
	);
	
}




const HospitalProviderTable = () => {


	const location = useLocation();

	// let history = useHistory();
	const [hospitalProviderData, setHospitalProviderData] = useState([]);

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);


	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState(initialSearch);
	// const [selectedHospitalId, setSelectedHospitalId] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		// setSelectedHospitalId(id);
		const fetchData = async () => {
			try {
				if (id) {
					dispatch(loaderShow());
					const result = await getProviderListByHospitalId(id, searchQuery);
					setHospitalProviderData(result.data.data);

					const countQuery = {searchTerm: searchQuery.searchTerm};
					const resultCount = await getProviderListCountByHospitalId(id,countQuery);
					setCount(resultCount.data.data.totalCount);
					let pageCount = resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage;
					setPage(Math.ceil(pageCount));
					
					dispatch(loaderHide());
				}
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, [location, searchQuery ]);


	// want to implement add new provider 
	const addNewProvider=()=>{

	}

	


	const pageChange = (event, value) =>{
		
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
	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Provider Name',
				accessor: 'firstName', // accessor is the "key" in the data
				Cell: ProviderNames,
			},
			{
				Header: 'Specialty',
				accessor: 'speciality', // accessor is the "key" in the data
				Cell: ({row}) =>( <h5 className='font-weight-normal text-black'> {row.original.speciality} </h5>),
			},
			{
				Header: 'Live Procedure',
				accessor: '', // accessor is the "key" in the data
				// Cell: ({row}) =>( <h5 className='font-weight-normal text-black'> {row.original.speciality} </h5>),
			},
			{
				Header:'',
				accessor:'lastName', // accessor is the "key" in the data
				Cell: ProviderActions,
			},
		],
		[]
	);

	return (
		<>
		<div className=' pt-2 '>
		<AdminHeaderWithSearch  handleSearchChange={searchTextChange} handleAddNew={addNewProvider} placeholder='Search here..' buttonTitle='New Provider' title='Provider' />
		<DataTable columns={columns} data={hospitalProviderData} />

		<div className='row'>
				<div className='col-md-12 pl-5 pr-5'>{count > 0 ? <PaginationTable handlePageChange={pageChange} countPage={page} count={count} currentPage={searchQuery.pageNumber} /> : ''}</div>
			</div>
		</div>
		</>
	);
};

export default HospitalProviderTable;
