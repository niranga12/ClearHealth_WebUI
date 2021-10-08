import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {ServiceMsg} from 'src/reusable/enum';
import {getOpenOrderByOrderId} from 'src/service/orderService';
import DateSelector from 'src/views/common/dateSelector';
import OnError from 'src/_helpers/onerror';
import PropTypes from 'prop-types';

const PaymentValidation = ({verifyHandle, verificationMsg=null}) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [fromDate, handlefromDateChange] = useState(null);
	const [detail, setDetail] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');

		const fetchData = async () => {
			dispatch(loaderShow());
			try {
				let result = await getOpenOrderByOrderId(id);
				if (result.data.message == ServiceMsg.OK) {
					setDetail(result.data.data);
				}
			} catch (error) {
				OnError(error, dispatch);
			}
			dispatch(loaderHide());
		};

		fetchData();
	}, [location]);

	const verifyAccount = () => {
        if(fromDate){
          
            verifyHandle(fromDate);

        }
    };

	return (
		<>
			<div className='container'>
				<div className='row mt-3'>
					<div className='col-md-3'></div>
					<div className='col-md-6 '>
						<div className='card boxshadow p-3 radius-1'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='text-center font-weight-bold'>Patient Information</h3>
									<p className='col-md-6 m-auto text-center p-2 font-lato-bold'>Please verify the patient's date of birth for secure access to payment details</p>
									<div className='text-center pt-4 pb-2  '>Patient Name</div>
									<div className='text-center font-weight-bold h5 mb-2'>{detail?.firstName + ' ' + detail?.lastName} </div>
								</div>

								<div className='col-md-6  offset-md-3  text-center'>
									<DateSelector className={'form-control-sm calendar-font '} selectedDate={fromDate} handleDateChange={handlefromDateChange} disableFuture={true} />
								<p className="text-danger">{verificationMsg && verificationMsg}</p>
                                	<button className='btn btn-primary  btn-lg  mt-3 mb-2' onClick={verifyAccount}>
										Verify Patient
									</button>


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};


PaymentValidation.propTypes = {
	
	verifyHandle: PropTypes.func,
    verificationMsg: PropTypes.string
};


export default PaymentValidation;
