import CIcon from '@coreui/icons-react';
import { CCol, CRow } from '@coreui/react';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router';
import { useHistory } from 'react-router-dom';
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

	let history = useHistory();
	const redirectBack=()=>{
		
		history.goBack();
	
	}

	const fetchData = async (id) => {
		try {
			
			dispatch(loaderShow());
				const result = await getOrderByOrderId(id);
				setOrderList(result.data.data[0]);
			
		
			
			dispatch(loaderHide());

		
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
<>
		<CRow>
				<CCol xs='12' md='12'  className='h4 font-lato-bold m-0 cursor-pointer' >
					<CIcon name='cilArrowLeft' size={'xl'}  onClick={redirectBack}/>
                    <span className="pl-3" onClick={redirectBack}>Order List</span>
				</CCol>
				
			</CRow>
		<div className="mt-3">
			  
			<OrderViewPatient patientDetail={orderList?.orderPatientDetails} />

			<OrderList orderDetail={orderList} />
			{/* <OrderList/> */}
		</div>
		</>
	);
};

export default OrderView;
