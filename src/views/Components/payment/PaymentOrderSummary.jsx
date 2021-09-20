import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const PaymentOrderSummary = ({orderDetail}) => {
	// const orderSummary] =orderDetail;
	const [orderPatientDetails, setorderPatientDetails] = useState(orderDetail?.orderPatientDetails);
	const [CPTDetails, setCPTDetail] = useState([]);
	const [orderCPTList, setOrderCPTList] = useState(null);
const [subTotal, setSubToal] = useState();
const [tax, setTax] = useState(0);
const [total, setTotal] = useState(0);

	useEffect(() => {
		
		setorderPatientDetails(orderDetail?.orderPatientDetails)
		setCPTDetail(orderDetail?.orderDetails);

		
	}, [orderDetail])


	useEffect(() => {
		if(CPTDetails?.length>0){
			let list=	CPTDetails.map((x,index)=>{
				return (
				<tr key={index}>
			<td className='pay-summary-name p-2'>{x.description}</td>
			 <td  className='pay-summary-name p-2 text-right'>{x.packagePrice}</td>
			 </tr>)
			})
			// console.log(list)
			setOrderCPTList(list)

			let subtotal=CPTDetails.reduce((sum,item) => sum + Number(item.packagePrice ), 0);
			setSubToal(subtotal);
			let total=Number(subtotal)+Number(tax);
			setTotal(total);
		}
	
	}, [CPTDetails])

	


	return (
		<div>
			<div className='component-header mt-4 mb-5 '>Order Summary </div>

			<div className='card  cover-content p-3'>
				<table>
					<tbody>
					
					{ orderCPTList}

						{/* <td className='pay-summary-name'>MRI Upper Extremity W/dye</td>
						<td  className='pay-summary-name'>$563.00</td> */}
					
					<tr className="border-bottom">
						<td className="pay-summary-address">
							<div className="pt-3">{orderPatientDetails?.facilityName}</div>
							<div >{orderPatientDetails?.facilityAddress1 +" " +orderPatientDetails?.facilityAddress2  + " "+ orderPatientDetails?.facilityCity} </div>
							<div  className="pb-3">{orderPatientDetails?.facilityState + orderPatientDetails?.facilityZip }</div>
							{/* <div  className="pb-3 text-primary cursor-point">Delete</div> */}
						</td>
						<td></td>
					</tr>

					<tr >
						<td  className="pt-3">Sub Total</td>
						<td  className="pt-3 text-right">${subTotal}</td>
					</tr>
					<tr  >
						<td className="pt-3">Tax</td>
						<td className="pt-3 text-right">${tax}</td>
					</tr>
					<tr className='pay-summary-name' >
						<td className="pt-3">Order Total</td>
						<td className="pt-3 text-right">$ {total}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};


PaymentOrderSummary.propTypes = {
	orderDetail: PropTypes.any,
};


export default PaymentOrderSummary;
