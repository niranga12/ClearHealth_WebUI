import React, {useEffect, useMemo, useState} from 'react';
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';
import OrderAction from './OrderAction';
import {useDispatch} from 'react-redux';
import OnError from 'src/_helpers/onerror';
import {useHistory, useLocation} from 'react-router-dom';
import {notify} from 'reapop';
import {orderAprove} from 'src/service/orderService';
import {ServiceMsg} from 'src/reusable/enum';
import moment from 'moment';

const serviceDetail = ({row}) => {
	return (
		<>
			<div className='pl-4'>
				<h5 className='font-weight-normal text-black'>{row.original.description}</h5>
				<div className='rectangle-intable'>{row.original.facilityName}</div>
			</div>
		</>
	);
};

const OrderList = ({orderDetail}) => {
	const [order, setOrder] = useState(orderDetail);
	const [orderData, setOrderData] = useState([]);
	const dispatch = useDispatch();
	const location = useLocation();
	const [orderId, setOrderId] = useState(null);
	let history=useHistory()


	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('orderId');
		setOrderId(id);
	}, [location]);

	useEffect(() => {
		setOrder(orderDetail);
	}, [orderDetail]);

	useEffect(() => {
		try {
			if(order?.orderDetails.length){
				let facilityName = order?.orderPatientDetails?.facilityName;
				let result = order?.orderDetails?.map((x) => {
					return {...x, facilityName};
				});
				setOrderData(result)
			}
			else{
				setOrderData([]);
			}
			
			
			
		} catch (error) {
			console.error(error);
		}
	}, [order]);

	const approveOrder = async () => {
		try {
			
			const result = await orderAprove(orderId);
			if (result.data.message == ServiceMsg.OK) {
				dispatch(notify(`Successfully updated`, 'success'));
				history.goBack();

			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	// for table
	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Service',
				accessor: 'description', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: serviceDetail,
			},
			{
				Header: 'CPT Code',
				accessor: 'code',
			},
			// {
			// 	Header: 'Acc. Num',
			// 	accessor: 'EHRAccNum',
			// },
			// {
			// 	Header: 'Ref',
			// 	accessor: 'Ref',
			// },
			{
				Header: 'Price',
				accessor: 'packagePrice',
			},

			{
				Header: '',
				accessor: 'id', // accessor is the "key" in the data
				disableSortBy: true,

				Cell: OrderAction,
			},
		],
		[]
	);

	return (
		<div className='card  cover-content pt-2 '>
			<div className='card-header border-none'>
				<div className='row'>
					<div className='col-md-6  '>
						<div className='h4 mb-1 text-black'>Order #{order?.orderPatientDetails?.orderNumber}</div>
						<div>{ moment(order?.orderPatientDetails?.orderDate).format('MM-DD-YYYY')}</div>
					</div>

					<div className='col-md-6'>
					{/* disabled={order?.orderPatientDetails?.totalAttempts <=order?.orderPatientDetails?.attempts || !orderData } */}
						<button className='btn btn-view-account ml-3 float-right'  disabled={ order?.orderPatientDetails?.totalAttempts <=order?.orderPatientDetails?.attempts || !orderData.length } onClick={approveOrder}>
							Approve
						</button>
					</div>
				</div>
			</div>

			<div className='card-body p-0'>{orderData && <DataTable columns={columns} data={orderData} />}</div>
		</div>
	);
};

OrderList.propTypes = {
	orderDetail: PropTypes.any,
};
export default OrderList;
