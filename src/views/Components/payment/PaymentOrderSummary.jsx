import React from 'react';

const PaymentOrderSummary = () => {
	return (
		<div>
			<div className='component-header mt-4 mb-5 '>Order Summary </div>

			<div className='card  cover-content p-3'>
				<table>
					<tr>
						<td className='pay-summary-name'>MRI Upper Extremity W/dye</td>
						<td  className='pay-summary-name'>$563.00</td>
					</tr>
					<tr className="border-bottom">
						<td className="pay-summary-address">
							<div className="pt-3">Regional Medical Center 1</div>
							<div >123 Dallas Parkway, Dallas, </div>
							<div  className="pb-3">TX 75228</div>
							<div  className="pb-3 text-primary cursor-point">Delete</div>
						</td>
						<td></td>
					</tr>

					<tr >
						<td  className="pt-3">Sub Total</td>
						<td  className="pt-3">$563.00</td>
					</tr>
					<tr  >
						<td className="pt-3">Tax</td>
						<td className="pt-3">$0</td>
					</tr>
					<tr className='pay-summary-name' >
						<td className="pt-3">Order Total</td>
						<td className="pt-3">$563.00</td>
					</tr>
				</table>
			</div>
		</div>
	);
};

export default PaymentOrderSummary;
