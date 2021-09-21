import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {resetOrder} from 'src/actions/orderAction';
import {getOrderByOrderId} from 'src/service/orderService';
import OnError from 'src/_helpers/onerror';
import OrderList from './OrderList';
import OrderViewPatient from './OrderViewPatient';

const OrderView = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [orderId, setOrderId] = useState(null);
	const [orderList, setOrderList] = useState(null);
	//  const orderStatus = useSelector(state => state.Order.changeOrderProgress)
	let orderStatus = useSelector((state) => state.Order.changeOrderProgress);

	const fetchData = async (id) => {
		try {
			dispatch(loaderShow());
				const result = await getOrderByOrderId(id);
				setOrderList(result.data.data[0]);
			
		
			
			dispatch(loaderHide());

			// console.log(count)
		} catch (error) {
			OnError(error, dispatch);
		}
	};




	

	useEffect(() => {
		setOrderList(null);

		const params = new URLSearchParams(location.search);
		const id = params.get('orderId');
		setOrderId(id);
		fetchData(id);
	}, [location]);

	useEffect(() => {
		if (orderStatus) {
			setOrderList(null);

			fetchData(orderId);
			dispatch(resetOrder());
		}
	}, [orderStatus]);

	return (
		<div>
			<OrderViewPatient patientDetail={orderList?.orderPatientDetails} />

			<OrderList orderDetail={orderList} />
			{/* <OrderList/> */}
		</div>
	);
};

export default OrderView;
