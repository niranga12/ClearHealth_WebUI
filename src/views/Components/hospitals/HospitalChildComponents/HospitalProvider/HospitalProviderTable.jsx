import React, {useCallback, useEffect, useMemo, useState} from 'react';
import DataTable from 'src/views/common/dataTable';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {TableSettingsEnum} from 'src/reusable/enum';
import {getProviderListByHospitalId, getProviderListCountByHospitalId} from 'src/service/hospitalsService';
import OnError from 'src/_helpers/onerror';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import PaginationTable from 'src/views/common/paginationTable';
import ViewProcedure from './ViewProcedure';

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





const HospitalProviderTable = () => {


	
	const location = useLocation();

	 let history = useHistory();
	const [hospitalProviderData, setHospitalProviderData] = useState([]);
	const [hospitalId, setHospitalId] = useState(null);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	


	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState(initialSearch);
	
    
	



	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setHospitalId(id);
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
	
		history.push({
			pathname: `/providers/profile`,
				  search: `?hospitalId=${hospitalId}`,  
			  });
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

	const  ProviderActions=({row})=> {
		
		const addProcedure=()=>{
			history.push({
				pathname: `/procedure`,
				search: `?providerId=${row.original.partyRoleId}&providerName=${row.original.firstName}`,
				
			});
		}
		return(
			<>
			
				<div className="btn btn-outline-secondary text-black-50 ml-3 float-right" onClick={addProcedure} >Add Procedures</div>
				<div className="btn btn-outline-secondary text-black-50 ml-3 float-right"  {...row.getToggleRowExpandedProps()}>
					{row.isExpanded ? 'Hide Procedures' : 'View Procedures'}
				  </div>
			  
			
			</>
		);
		
	}

	

	 // Create a function that will render our row sub components
	 const renderRowSubComponent = useCallback(
		({ row }) => (
			
		  <pre
			style={{
			  fontSize: '10px',
			}}
		  >
			  <ViewProcedure providerId={ row.original.partyRoleId}/>

		  </pre>
		),
		[]
	  )

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
				Header: 'Live Procedures',
				accessor: 'livecount', // accessor is the "key" in the data
				disableSortBy: true,
				
			},
			{
				Header:'',
				accessor:'lastName', // accessor is the "key" in the data
				disableSortBy: true,
				id: 'expander', // It needs an ID
				Cell:ProviderActions,
			},
		],
		[]
	);

	return (
		<>
		<div className=' pt-2 '>
		<AdminHeaderWithSearch  handleSearchChange={searchTextChange} handleAddNew={addNewProvider} placeholder='Search here..' buttonTitle='New Provider' title='Providers' />
		<DataTable columns={columns} data={hospitalProviderData} sortingHandler={sortingHandler}  renderRowSubComponent={renderRowSubComponent} />

		<div className='row'>
				<div className='col-md-12 pl-5 pr-5'>{count > 0 ? <PaginationTable handlePageChange={pageChange} countPage={page} count={count} currentPage={searchQuery.pageNumber} /> : ''}</div>
			</div>
		</div>
		</>
	);
};

export default HospitalProviderTable;
