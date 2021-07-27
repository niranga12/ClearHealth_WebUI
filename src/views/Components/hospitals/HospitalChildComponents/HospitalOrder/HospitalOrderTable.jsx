import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {OrderStatus, TableSettingsEnum} from 'src/reusable/enum';
import {getOrderListByHospitalId} from 'src/service/hospitalsService';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import DataTable from 'src/views/common/dataTable';
import RatingView from 'src/views/common/ratingView';
import OnError from 'src/_helpers/onerror';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
};

const selectionListDropDown = [
	{text: 'Select', value: ''},
	{text: 'Expired', value: 'Expired'},
	{text: 'Valid', value: 'Valid'},
];

function OrderAttempt({row}) {
	return (
		<>
			<div className='min-150'>
				<RatingView totalCount={row.original.totalAttempts} count={row.original.attempts} />
			</div>
		</>
	);
}

function OrderActions({row}) {
	return (
		<>
			<div>
				<div className='btn btn-view-account ml-3 float-right'> View Order</div>
			</div>
		</>
	);
}

function OrderStatusValue({row}) {
	switch (row.original.orderStatus) {
		case OrderStatus.Ordered:
			return <div>Ordered</div>;

		case OrderStatus.Cancelled:
			return <div>Cancelled</div>;

		case OrderStatus.Completed:
			return <div>Completed</div>;

		case OrderStatus.Pending:
			return <div>Pending</div>;

		default:
			break;
	}
}

function HospitalOrderTable() {
	const location = useLocation();

	// let history = useHistory();
	const [hospitalOrderData, setHospitalOrderData] = useState([]);

	// const [page, setPage] = useState(1);
	// const [count, setCount] = useState(0);

	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState(initialSearch);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		// setSelectedHospitalId(id);
		const fetchData = async () => {
			try {
				if (id) {
					dispatch(loaderShow());
					const result = await getOrderListByHospitalId(id, searchQuery);
					setHospitalOrderData(result.data.data);

					// const countQuery = {searchTerm: searchQuery.searchTerm};
					// const resultCount = await getProviderListCountByHospitalId(id,countQuery);
					// setCount(resultCount.data.data.totalCount);
					// let pageCount = resultCount.data.data.totalCount / TableSettingsEnum.ItemPerPage;
					// setPage(Math.ceil(pageCount));

					dispatch(loaderHide());
				}
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, [location, searchQuery]);

	const searchTextChange = (e) => {
		if (e.target.value.length > 3) {
			setSearchQuery({...initialSearch, searchTerm: e.target.value});
			// eslint-disable-next-line eqeqeq
		} else if (e.target.value.length == '') {
			setSearchQuery({...initialSearch, searchTerm: e.target.value});
		} else {
		}
	};

	const dropDownChange = (e) => {
		console.log(e.target.value);
	};
	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Patient Name',
				accessor: 'firstName', // accessor is the "key" in the data
				Cell: ({row}) => (
					<h5 className='font-weight-normal text-black ml-4'>
						{' '}
						{row.original.firstName} {row.original.lastName}{' '}
					</h5>
				),
			},
			{
				Header: 'order Number',
				accessor: 'orderNumber', // accessor is the "key" in the data
				Cell: ({value}) => <h5 className='font-weight-normal text-black'> {value} </h5>,
			},
			{
				Header: 'Order Date',
				accessor: 'orderDate', // accessor is the "key" in the data
			},
			{
				Header: 'Procedure',
				accessor: 'procedureDetail', // accessor is the "key" in the data
				// Cell: ({row}) =>( <h5 className='font-weight-normal text-black'> {row.original.speciality} </h5>),
			},
			// {
			// 	Header: 'attempts',
			// 	accessor: 'attempts', // accessor is the "key" in the data
			// 	// Cell: ({row}) =>( <h5 className='font-weight-normal text-black'> {row.original.speciality} </h5>),
			// },
			{
				Header: 'Attemps',
				accessor: 'attempts', // accessor is the "key" in the data
				Cell: OrderAttempt,
			},
			{
				Header: 'Status',
				accessor: 'orderStatus', // accessor is the "key" in the data
				Cell: OrderStatusValue,
			},
			{
				Header: '',
				accessor: 'lastname', // accessor is the "key" in the data
				Cell: OrderActions,
			},
		],
		[]
	);

	return (
		<>
			<div className=' pt-2 '>
				<AdminHeaderWithSearch handleSearchChange={searchTextChange} handleDropDownChange={dropDownChange} selectionList={selectionListDropDown} placeholder='Search here..' title='Order' />
				<DataTable columns={columns} data={hospitalOrderData} />
			</div>
		</>
	);
}

export default HospitalOrderTable;
