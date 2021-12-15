/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import { TheHeader } from 'src/containers';
import { ServiceMsg } from 'src/reusable/enum';
import { getSMSOrderDetails } from 'src/service/orderService';
import OnError from 'src/_helpers/onerror';

const PaymentMobileLink = () => {

	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();

	const [orderDetail, setOrderDetail] = useState(null);
	const [orderId, setOrderId] = useState(null)

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setOrderId(id);


		const fetchData = async () => {
			dispatch(loaderShow());
			try {
				const result = await getSMSOrderDetails(id);
				if (result.data.message == ServiceMsg.OK) {
					setOrderDetail(result.data.data);


				}


			} catch (error) {
				OnError(error, dispatch);

			}
			dispatch(loaderHide());
		};


		fetchData();



	}, [location]);

	const ProcedureDetails = () => {
		const listItems = orderDetail?.ProcedureDetails.map((x, index) =>
			<li className="font-weight-bold h5" key={index}>{x.description}</li>
		);
		return (
			<>
				<ul className="pl-2 pt-2 list-unstyled">
					{listItems}
				</ul>
			</>
		);
	}


	const paymentLink = () => {
		history.push({
			pathname: `/payment`,
			search: `?id=${orderId}`,
			// state: { detail: 'some_value' }
		})

	}




	return (
		<>
			<div className='c-app c-default-layout'>
				<div className='c-wrapper bg-white'>
					<TheHeader />
					<div className='container'>
						<div className='row mt-5 pt-5'>
							<div className='col-md-6'>
								<h4>Dear {orderDetail?.orderDetails.firstName}</h4>
								<p>Your provider has requested a diagnostic imaging scan as a necessary part of your care. In reviewing your payment responsibility for this procedure, it has been determined that you will owe 100% of the costs out-of-pocket.</p>
								<p>This could be due to one of the following reasons:</p>
								<ul className='list-unstyled'>
									<li> - You are currently without a health insurance plan </li>
									<li> - You have not yet met your annual deductible or </li>
									<li> - Your insurance company has denied payment for the procedure</li>
								</ul>
								<p>would like to offer you a discounted, all-inclusive rate to pay for your procedure if you pay in advance of your care. Through a partnership with Clear Health, the hospital fee and all associated physician fees are included in this discounted rate, and you should not receive any further bills related to this procedure unless additional care is required.</p>
								<p>To take advantage of this offer, you must pay the full discounted price prior to your procedure. You may view your discounted package price and simplify your billing now.</p>
								<p>Your provider has decided further care is a necessary part of your care. In reviewing your payment responsibility for this procedure, it has been determined that you do have a deductible patient responsibility amount due.</p>
								<p> {orderDetail?.orderDetails.facilityName} would like to offer you a discount to pay for your deductible if you pay in advance of your care. To take advantage of this offer, you must pay prior to your procedure. You may view your discounted patient responsibility and simplify your billing now.</p>

								<div>Thank you</div>
								<h6 className='font-weight-bold'>Customer Support Team </h6>
							</div>
							<div className='col-md-6'>
								<div className='card  box-shadow'>
									{/* <div className='card-header'> */}
									<div className='row '>
										<div className='col-md-5'></div>
										<div className='col-md-7 h3' style="text-align: right; padding-right: 29px;padding-top: 9px;">
											{orderDetail?.orderDetails.facilityName}</div>
										<div className='col-md-12 border-bottom p-1'></div>
									</div>

									{/* </div> */}
									<div className='card-content'>
										<div className='row'>
											<div className='col-md-12'>
												<div className='pt-2 pl-2'>Procedure</div>
												{ProcedureDetails()}
												{/* <h4 className='p-2 font-weight-bold'> MRI Neck Without Contrast</h4> */}
											</div>

											<div className='col-md-5 p-3'>
												<div className='pay-mobile-amount m-auto p-2' style="border:solid  #5b4dfd 2px;border-radius:6px;-moz-border-radius:6px;padding: 10px;">
													<h5 className='font-weight-bold'>Pay Now Package Price</h5>
													<h2 className='text-amount-blue'> $ {orderDetail?.orderDetails.orderTotal}</h2>
													<div className='pay-italic'>No Additional Bills</div>
												</div>
											</div>
											<div className='col-md-6'>
												<div className='pay-mobile-right m-auto'>
													<h5 className='font-weight-bold'>Estimated Cost at time of Procedure</h5>
													<h2 className='text-amount-blue'>$ {orderDetail?.orderDetails.total}</h2>
													<div className='pay-italic'>Facility price only, you may receive separate bills for provider(s) </div>
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-md-12 p-3 text-center' style="width: 95%;">
												<button className='btn btn-primary btn-lg col-md-8 ' onClick={paymentLink}>Pay Now</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PaymentMobileLink;
