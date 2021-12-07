/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { notify } from 'reapop';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import { resetOrderTable } from 'src/actions/orderAction';
import { ServiceMsg, TableSettingsEnum } from 'src/reusable/enum';
import { getOrderListByHospitalId, getOrderListCountByHospitalId } from 'src/service/hospitalsService';
import { orderAprove } from 'src/service/orderService';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import DataTable from 'src/views/common/dataTable';
import PaginationTable from 'src/views/common/paginationTable';
import RatingView from 'src/views/common/ratingView';
import OnError from 'src/_helpers/onerror';

const initialSearch = {
	itemsPerPage: TableSettingsEnum.ItemPerPage,
	pageNumber: 1,
	searchTerm: '',
	paymentStatus: 1
};

const selectionListDropDown = [
	{ text: 'All', value: '1' },
	{ text: 'Pending', value: '2' },
	{ text: 'Outstanding', value: '3' },
	{ text: 'Paid', value: '4' },
	{ text: 'Expired', value: '5' },

];



function OrderAttempt({ row }) {
	return (
		<>
			<div className='min-150'>
				<RatingView totalCount={Number(row.original.totalAttempts)} count={Number(row.original.attempts)} />
			</div>
		</>
	);
}



function OrderActions({ row }) {
	let history = useHistory();
	const orderChanges = useSelector((state) => state.mainOrder.changeProgress);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const actionLink = () => {
		history.push({
			pathname: `/order/view`,
			search: `?orderId=${row.original.orderId}`,
			// state: { detail: 'some_value' }
		});
	};
	const approveOrder = async () => {
		try {
			// dispatch(changeOrderTable());
			setLoading(true);
			const result = await orderAprove(row.original.orderId);
			if (result.data.message == ServiceMsg.OK) {
				dispatch(notify(`Successfully updated`, 'success'));
				setLoading(false);
				// history.go(0)
				setTimeout(() => {
					dispatch(resetOrderTable(orderChanges));
				}, 1000);
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const sendOrderButton = () => {
		return (
			// <button className='btn btn-primary  float-right' disabled={row.original.totalAttempts <=row.original.attempts || !(row.original.cptCount > 0) || row.original.orderStatus == "Paid" || row.original.orderStatus == "Expired" } onClick={approveOrder}>
			<button className='btn btn-primary  float-right' disabled={row.original.totalAttempts <= row.original.attempts || row.original.orderStatus == "Paid" || row.original.orderStatus == "Expired" || loading} onClick={approveOrder}>
				{' '}
				Send Order
			</button>
		);
	}




	return (
		<>
			<div>
				<div className='btn btn-view-account ml-3 float-right' onClick={actionLink}>
					{' '}
					View Order
				</div>
				{row.original.orderStatus === "Paid" ? <div className="text-right">{row.original.orderPaidDate} </div> : sendOrderButton()}

			</div>
		</>
	);
}

// function OrderStatusValue({row}) {
// 	const {orderStatus} = row.original;

// 	switch (orderStatus) {
// 		case OrderStatus.Ordered:
// 			return <div>Ordered</div>;

// 		case OrderStatus.Cancelled:
// 			return <div>Cancelled</div>;

// 		case OrderStatus.Completed:
// 			return <div>Completed</div>;

// 		case OrderStatus.Pending:
// 			return <div>Pending</div>;
// 		default:
// 			return <></>;
// 		// break;
// 	}
// }

function HospitalOrderTable() {
	const location = useLocation();

	let history = useHistory();
	const [hospitalOrderData, setHospitalOrderData] = useState([]);
	const [hospitalId, setHospitalId] = useState(null);
	const [hospitalName, setHospitalName] = useState('');


	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);

	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState(initialSearch);

	const orderChanges = useSelector((state) => state.mainOrder.changeProgress);



	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		const name = params.get('name');
		setHospitalId(id);
		setHospitalName(name);
		setHospitalOrderData([]);
		const fetchData = async () => {
			try {
				if (id) {
					dispatch(loaderShow());
					const result = await getOrderListByHospitalId(id, searchQuery);
					setHospitalOrderData(result.data.data);

					let resultCount = await getOrderListCountByHospitalId(id, searchQuery);

					// const countQuery = {searchTerm: searchQuery.searchTerm};
					// const resultCount = await getProviderListCountByHospitalId(id,countQuery);
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
	}, [location, searchQuery, orderChanges]);


	const pageChange = (event, value) => {
		// setPage(value);
		setSearchQuery({ ...searchQuery, pageNumber: value });
	};

	const searchTextChange = (e) => {
		if (e.target.value.length > 3) {
			// setSearchQuery({...initialSearch, searchTerm: e.target.value});
			setSearchQuery({ ...searchQuery, searchTerm: e.target.value, pageNumber: 1 });
			// eslint-disable-next-line eqeqeq
		} else if (e.target.value.length == '') {
			// setSearchQuery({...initialSearch, searchTerm: e.target.value});
			setSearchQuery({ ...searchQuery, searchTerm: e.target.value, pageNumber: 1 });
		} else {
		}
	};

	const dropDownChange = (e) => {

		if (e.target.value) {
			setSearchQuery({ ...searchQuery, paymentStatus: Number(e.target.value), pageNumber: 1 });
		}


	};

	const handleAddOrder = (e) => {

		history.push('/order');
		history.push({
			pathname: `/order`,
			search: `?hospitalId=${hospitalId}&&name=${hospitalName}`,
		});
	};

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Patient Name',
				accessor: 'firstName', // accessor is the "key" in the data
				Cell: ({ row }) => (
					<h5 className='font-weight-normal text-black ml-4'>
						{' '}
						{row.original.firstName} {row.original.lastName}{' '}
					</h5>
				),
			},
			{
				Header: 'Order Number',
				accessor: 'orderNumber', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({ value }) => <h5 className='font-weight-normal text-black'> {value} </h5>,
			},
			{
				Header: 'Order Date',
				accessor: 'orderDate', // accessor is the "key" in the data
				disableSortBy: true,

			},
			{
				Header: 'Procedure',
				accessor: 'procedureDetail', // accessor is the "key" in the data
				disableSortBy: true,

				// Cell: ({row}) =>( <h5 className='font-weight-normal text-black'> {row.original.speciality} </h5>),
			},
			// {
			// 	Header: 'attempts',
			// 	accessor: 'attempts', // accessor is the "key" in the data
			// 	// Cell: ({row}) =>( <h5 className='font-weight-normal text-black'> {row.original.speciality} </h5>),
			// },
			{
				Header: 'Attempts',
				accessor: 'attempts', // accessor is the "key" in the data
				disableSortBy: true,

				Cell: OrderAttempt,
			},
			{
				Header: 'Status',
				accessor: 'orderStatus', // accessor is the "key" in the data
				disableSortBy: true,

				// Cell: OrderStatusValue,
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
				<AdminHeaderWithSearch handleAddNew={handleAddOrder} handleSearchChange={searchTextChange} handleDropDownChange={dropDownChange} selectionList={selectionListDropDown} buttonTitle='Add Order' placeholder='Search here..' title='Orders' />
				<DataTable columns={columns} data={hospitalOrderData} />
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
			</div>
		</>
	);
}

export default HospitalOrderTable;
