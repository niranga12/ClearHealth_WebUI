import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OrderPatientsForm from './OrderPatientsForm';
import OrderProcedureSelect from './OrderProcedureSelect';
import Select from 'react-select';

const options = [
	{value: '1', label: 'Robert'},
	{value: '2', label: 'Peter'},
	{value: '3', label: 'kavin'},
];

const OrderForm = () => {
	let btnRef = useRef();
	const location = useLocation();

	const [procedure, setProcedure] = useState(1);
	const [hospitalId, setHospitalId] = useState(null);
	const [selectedPatient, setselectedPatient] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setHospitalId(hospitalId);
	}, [location]);

	const formDetails = (data) => {
		console.log(data);
	};

	const selectPatient = (newValue: any, actionMeta: any) => {
		setselectedPatient(newValue);
	};

	return (
		<div className='p-4'>
			<div className='row'>
				<div className='col-md-4 mb-4'>
					<label className=" float-left mr-3 pt-1">Select Patient</label>
					<Select options={options} onChange={selectPatient} />
				</div>
				<div className="col-md-12 mb-2">
					<h5 >If not , Please fill below fields</h5>
				</div>
			</div>

			<OrderPatientsForm />

			<h5 className='font-weight-bold mt-1 mb-3'>Procedures </h5>

			<OrderProcedureSelect />

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
