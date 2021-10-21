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

const PayBrainTree = ({billingDetails, isValid, orderId}) => {
	const [clientToken, setClientToken] = useState('sandbox_4xm898m8_3x38g8rmrxj3kbrj');
	const [billDet, setBillDet] = useState(null);
	const [validDetail, setIsvalidDetail] = useState(false);
	const [instance, setInstance] = useState(null);
    const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		debugger;
		// if (btnRef.current) {
		// btnRef.current.removeAttribute('disabled');
		// }
		//  console.log(billingDetails);
		setBillDet(billingDetails);

		setIsvalidDetail(isValid);
	}, [billingDetails, isValid]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		// dispatch(loaderShow());

	// 		try {
	// 			const result = await getPaymentToken();

	// 		} catch (error) {}

	// 		// dispatch(loaderHide());
	// 	};

	//     fetchData();
	// }, []);

	const buy = async () => {
		
		// Send the nonce to your server

		const {nonce} = await instance.requestPaymentMethod();
		console.log(nonce);
		let paymentData = {...billDet, paymentMethodNonce: nonce, orderId};
		// console.log(paymentData);

		try {
			let result = await paymentCheckout(paymentData);
			if (result.data.message === ServiceMsg.OK) {
				dispatch(notify('Paid successfully', 'success'));
				history.push('/main');
			} else {
				dispatch(notify('Payment Failure', 'error'));
			}
		} catch (error) {
			OnError(error, dispatch);
		}

		// await fetch(`server.test/purchase/${nonce}`);
	};

	return (
		<div className='mb-2'>
			<DropIn options={{authorization: clientToken}} onInstance={(instance) => setInstance(instance)} />
			<button onClick={buy} className='btn btn-primary' disabled={!validDetail}>
				Pay Now
			</button>
		</div>
	);
};

PayBrainTree.propTypes = {
	billingDetails: PropTypes.any,
	isValid: PropTypes.any,
	orderId: PropTypes.any,
};

export default PayBrainTree;
