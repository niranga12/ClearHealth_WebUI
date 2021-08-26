import { freeSet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useRef, useState} from 'react';
import { useLocation } from 'react-router-dom';
import OrderPatientsForm from './OrderPatientsForm';
import OrderProcedureForm from './OrderProcedureForm';

const OrderForm = () => {
	let btnRef = useRef();
	const location = useLocation();

const [procedure, setProcedure] = useState(1);
const [hospitalId, setHospitalId] = useState(null);

useEffect(() => {
	const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setHospitalId(hospitalId);

}, [location])


	const formDetails = (data) => {
		console.log(data);
	};

    const handleOrderRemove=()=>{
        // console.log(data)
// if(data){
    setProcedure(procedure -1);
// }
        
    }
    const orderProcedure=()=>{
        const row = [];

        for (let index = 0; index < procedure; index++) {
                row.push(<OrderProcedureForm  key={index} handleRemove={handleOrderRemove}/>);
         }

        return row;
         
    }

	return (
		<div className='p-4'>
			<OrderPatientsForm />
			<h5 className='font-weight-bold mt-1 mb-1'>Procedures </h5>
           
			{orderProcedure()}

			<div className='row'>
				<div className='col-md-12'>
					<button type='button' ref={btnRef} className='btn btn-outline-primary btn-lg float-left' onClick={()=>setProcedure(procedure+1)}>
					<CIcon content={freeSet.cilPlus} color='black' className='add-icon-set-nocolor' />
					<span className='pt-1'>Add Another</span>	
					</button>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-12 mt-1'>
					<button type='submit' ref={btnRef} className='btn btn-primary btn-lg float-right'>
						
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderForm;
