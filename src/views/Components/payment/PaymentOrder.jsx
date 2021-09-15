import React from 'react';

const PaymentOrder = () => {
	return (
		<div>
			<div className='component-header mt-3 mb-2 '>Order Details </div>
			<div>Information about the order</div>
			<div className='card  cover-content p-3'>
				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Referring Provider <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Account Number <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Referring Provider <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Account Number <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
				</div>
			</div>

			<div className='component-header mt-3 mb-2 '>Patients Details </div>
			<div>Please fill below details about patient </div>

			<div className='card  cover-content p-3'>
                {/* patient details */}
				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Patient Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Contact Number <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Email Address <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Refering Provider Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Date of Birth <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
				</div>
                <div className='component-header mt-3 mb-2 '>Address </div>
				{/* address */}
				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 2 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								City <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								State <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Zip code <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
				</div>
			
                {/* Billing Address */}
                <div className='component-header mt-3 mb-2 '>Billing Address </div>
                <div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 2 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								City <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								State <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Zip code <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
				</div>
            
            </div>
		</div>
	);
};

export default PaymentOrder;
