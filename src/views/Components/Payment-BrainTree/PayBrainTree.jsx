import React, {useEffect, useState} from 'react';
import DropIn from 'braintree-web-drop-in-react';
// import { getPaymentToken } from 'src/service/paymentService';
import PropTypes from 'prop-types';
import {paymentCheckout} from 'src/service/paymentService';
import {ServiceMsg} from 'src/reusable/enum';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { notify } from 'reapop';
import OnError from 'src/_helpers/onerror';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import PaymentCompletedAlert from '../payment/PaymentCompletedAlert';

const PayBrainTree = ({billingDetails, isValid, orderId}) => {
	// eslint-disable-next-line no-unused-vars
	const [clientToken, setClientToken] = useState('sandbox_4xm898m8_3x38g8rmrxj3kbrj');
	const [billDet, setBillDet] = useState(null);
	const [validDetail, setIsvalidDetail] = useState(false);
	const [instance, setInstance] = useState(null);
    const dispatch = useDispatch();
	const history = useHistory();
	const [isNotify, setIsNotify] = useState(false);
	useEffect(() => {
		
		setBillDet(billingDetails);

		setIsvalidDetail(isValid);
	}, [billingDetails, isValid]);



	const modelCancel = () => {
		setIsNotify(!isNotify);
		history.push('/main');
	}
	const buy = async () => {
		
		// Send the nonce to your server

		const {nonce} = await instance.requestPaymentMethod();
		// console.log(nonce);
		let paymentData = {...billDet, paymentMethodNonce: nonce};
		// console.log(paymentData);

		try {
			dispatch(loaderShow());
			let result = await paymentCheckout(paymentData);
			if (result.data.message === ServiceMsg.OK) {
				dispatch(loaderHide());
				dispatch(notify('Paid successfully', 'success'));
				// history.push('/main');
				setIsNotify(true);
				
			} else {
				dispatch(notify('Payment Failure', 'error'));
				dispatch(loaderHide());
			}
		} catch (error) {
			OnError(error, dispatch);
			dispatch(loaderHide());
		}

		// await fetch(`server.test/purchase/${nonce}`);
	};

	return (
		<div className='mb-2'>
			<DropIn options={{authorization: clientToken}} onInstance={(instance) => setInstance(instance)} />
			<button onClick={buy} className='btn btn-primary' disabled={!validDetail}>
				Pay Now
			</button>
			<PaymentCompletedAlert  isNotify={isNotify} handleCancel={modelCancel} orderId={billingDetails?.orderId}/>
		</div>
	);
};

PayBrainTree.propTypes = {
	billingDetails: PropTypes.any,
	isValid: PropTypes.any,
	orderId: PropTypes.any,
};

export default PayBrainTree;
