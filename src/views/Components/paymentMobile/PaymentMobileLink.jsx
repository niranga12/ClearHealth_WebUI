/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import {TheHeader} from 'src/containers';
import { ServiceMsg } from 'src/reusable/enum';
import { getSMSOrderDetails } from 'src/service/orderService';
import OnError from 'src/_helpers/onerror';

const PaymentMobileLink = () => {

	const location = useLocation();
	const dispatch = useDispatch();
	const history=useHistory();

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

	const ProcedureDetails=()=>{
		const listItems = orderDetail?.ProcedureDetails.map((x,index) =>
    <li className="font-weight-bold h5 p-1" key={index}>{x.description}</li>
  );
		return(
			<>
			<ul className="p-2 list-unstyled">
			{listItems}
			</ul>
			</>
		);
	}


	const paymentLink=()=>{
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
								<h4>Hey {orderDetail?.orderDetails.firstName}</h4>
								<p>Your Physician has placed an order for your upcoming care. In reviewing your payment responsibility, it appears you will owe 100% out of pocket for this procedure</p>
								<p> This could be due to one of the reasons below</p>
								<ul className='list-unstyled'>
									<li> - You have no insurance </li>
									<li> - You haven’t yet hit your deductible </li>
									<li> - Your insurance company has denied payment for the procedure</li>
								</ul>

								<p> {orderDetail?.orderDetails.facilityName} would like to offer you the option to pay a discounted all inclusive rate. All physicians and the hospital fee are included in the discounted rate in exchange for your upfront payment prior to care.</p>
								<p> Click the pay now button to receive your discounted package price and receive no further bills Styles Code </p>
								<div>Thank you</div>
								<h6 className='font-weight-bold'>Customer Support Team </h6>
							</div>
							<div className='col-md-6'>
								<div className='card  box-shadow'>
									{/* <div className='card-header'> */}
									<div className='row p-3 '>
										<div className='col-md-5'></div>
										<div className='col-md-7 h3'> {orderDetail?.orderDetails.facilityName}</div>
										<div className='col-md-12 border-bottom p-1'></div>
									</div>

									{/* </div> */}
									<div className='card-content'>
										<div className='row'>
											<div className='col-md-12'>
												<div className='p-2'>Procedure</div>
												{ProcedureDetails()}
												{/* <h4 className='p-2 font-weight-bold'> MRI Neck Without Contrast</h4> */}
											</div>

											<div className='col-md-6 p-3'>
												<div className='pay-mobile-amount m-auto p-4 '>
													<h5 className='font-weight-bold'>Pay Now Package Price</h5>
													<h2 className='text-amount-blue'> $ {orderDetail?.orderDetails.orderTotal}</h2>
													<div className='pay-italic'>No Additional Bills</div>
												</div>
											</div>
											<div className='col-md-6'>
												<div className='pay-mobile-right m-auto p-3'>
													<h5 className='font-weight-bold'>Estimated Cost at time of Procedure</h5>
													<h2 className='text-amount-blue'>$ {orderDetail?.orderDetails.total}</h2>
													<div className='pay-italic'>Facility price only, you may receive separate bills for provider(s) </div>
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-md-12 p-3 text-center '>
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
