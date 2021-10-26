/* eslint-disable eqeqeq */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {ServiceMsg} from 'src/reusable/enum';
import {getOrdersByPatientId} from 'src/service/orderService';
import OnError from 'src/_helpers/onerror';
import OrderViewPatient from '../../order/OrderView/OrderViewPatient';
import PatientOrderTable from './PatientOrderTable';
import PropTypes from 'prop-types';
import Goback from 'src/views/common/Goback';


const PatientsOrderList = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [orderDetails, setOrderDetail] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		const fetchData = async () => {
			try {
				let result = await getOrdersByPatientId(id);
				if (result.data.message == ServiceMsg.OK) {
					setOrderDetail(result.data.data[0]);
				}
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
    <>
   <Goback />
   <div>

   <OrderViewPatient patientDetail={orderDetails?.patientInfo} />
   <div className='card  cover-content pt-2 '>
   <PatientOrderTable orderDetails={orderDetails?.orderProcedureList} />
       </div>
   </div>
    </>
    
    );
};



PatientsOrderList.propTypes = {
	patientOrder: PropTypes.any,
	formChange: PropTypes.func,
	handleValid: PropTypes.any
};

export default PatientsOrderList;
