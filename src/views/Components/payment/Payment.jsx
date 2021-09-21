import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {TheHeader} from 'src/containers';
import { DateFormat } from 'src/reusable/enum';
import {getPatientOrderByOrderId} from 'src/service/orderService';
import NotificationLayout from 'src/_helpers/notification';
import OnError from 'src/_helpers/onerror';
import PayStripe from '../Payment-Stripe/PayStripe';
import PaymentOrder from './PaymentOrder';
import PaymentOrderSummary from './PaymentOrderSummary';

const Payment = () => {
	const [orderDetail, setOrderDetails] = useState([]);
	const [orderId, setOrderId] = useState(null);
  const [patient, setPatient] = useState(null)
	const location = useLocation();
	const dispatch = useDispatch();
	const [patientData, setPatientData] = useState(null);
	const [billingData, setBillingData] = useState(null);
	const [stKey, setSTKey] = useState(null);
	const [isValid, setIsvalid] = useState(false)
	
  // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
 const stripePromise = loadStripe("pk_test_51JKBypBOELX9tyniJrgYzR3SvXJDOusxZiuQ1wV60G8eJucn7p2hK1aKK0IPcktL6tTDh7fIeZL1lXQka7rZGpcz00oPjzhYRh");
// let pubKey=String(StripPublicKey) ;
// const stripePromise = loadStripe(pubKey);



	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		const key= params.get('key');
		setOrderId(id);
		setSTKey(key);

		const fetchData = async () => {
			dispatch(loaderShow());
			try {
				const result = await getPatientOrderByOrderId(id);
				setOrderDetails(result.data.data[0]);
       let orderPayment=  formatPaymentDetail(result.data.data[0]?.orderPatientDetails);
      setPatient(orderPayment);

			} catch (error) {
				OnError(error, dispatch);
			}
			dispatch(loaderHide());
		};

		fetchData();
	}, [location]);

	const formatPaymentDetail = (detail) => {
    // console.log(detail);
		let data = {
			order: {
				referringProvider: '',
				accountNumber: '',
				orderId: orderId,
				orderDate: moment(detail.orderDate).format(DateFormat.USFormat) ,

				patientName: detail.firstName + ' ' + detail.lastName,
				contactPhone: detail.phoneNumber,
				email: detail.email,
				referringProviderName: '',
				dateOfBirth: moment(detail.DOB).format(DateFormat.USFormat) ,

				address1: '',
				address2: '',
				city: '',
				state: '',
				zip: '',
				billingAddress1: '',
				billingAddress2: '',
				billingCity: '',
				billingState: '',
				billingZip: '',
			},
		};
		return data;
	};

const formValid=(val)=>{
	setIsvalid(val);
	}

  const formChange=(value)=>{
	 

setPatientData(value)


let result ={
    address: {
        city: value.billingCity,
        line1: value.billingAddress1,
        line2: value.billingAddress2,
        postal_code: value.billingZip,
        state: value.billingState,
    },
    email: value.email,
    name: value.patientName,
    phone: value.contactPhone,
}

setBillingData(result);
	}


	return (
		<>
			<div className='c-app c-default-layout'>
				<NotificationLayout />
				<div className='c-wrapper'>
					<TheHeader />

					<div className='container'>
						<div className='row'>
							<div className='col-md-8'>
								<PaymentOrder  patientOrder={patient} formChange={formChange} handleValid={formValid}/>
								<div className='component-header mt-4 mb-4 '>Payment Details </div>
                <Elements stripe={stripePromise}>
                <PayStripe billingDetails={billingData}  stKey={stKey} isValid={isValid}/>
               </Elements>
            
							</div>
							<div className='col-md-4'>
								<PaymentOrderSummary orderDetail={orderDetail}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
