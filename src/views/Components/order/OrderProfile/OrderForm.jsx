import React, {useEffect, useRef, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import OrderPatientsForm from './OrderPatientsForm';
import OrderProcedureSelect from './OrderProcedureSelect';
import AsyncSelect from 'react-select/async';
import {getPatientsDetailsByHospital} from 'src/service/hospitalsService';
import {saveOrderData} from 'src/service/orderService';
import { ServiceMsg } from 'src/reusable/enum';
import { useDispatch } from 'react-redux';
import { notify } from 'reapop';
import OnError from 'src/_helpers/onerror';
import 'font-awesome/css/font-awesome.min.css';
import NormalizePhone from 'src/reusable/NormalizePhone';

const OrderForm = () => {
	let btnRef = useRef();
	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();
	// const [procedure, setProcedure] = useState(1);
	const [hospitalId, setHospitalId] = useState(null);
	// const [selectedPatient, setselectedPatient] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [inputValue, setValue] = useState('');
	const [selectedValue, setSelectedValue] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const [hospitalName, setHospitalName] = useState('');

	const [selectedFormValue, setSelectedFormValue] = useState(null);
	const [SelectedCpt, setSelectedCpt] = useState([]);
	const [patientDetail, setPatientDetail] = useState(null);

	// on location change get hospitalId
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('hospitalId');
		const name=params.get('name');
		setHospitalId(id);
		setHospitalName(name);
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled');
		}
	}, [location]);

	const handleCPTChange = (value) => {
		setSelectedCpt(value);
	
		// CheckAvilableBtn();
	};

	// const CheckAvilableBtn = () => {
	
	// 	if ((SelectedCpt.length > 0 && patientDetail) || (SelectedCpt.length > 0 && selectedValue?.partyRoleId) ) {
	// 		btnRef.current.removeAttribute('disabled');
	// 	} else {
	// 		btnRef.current.setAttribute('disabled', 'disabled');
	// 	}
	// };

 useEffect(() => {
	if ((SelectedCpt.length > 0 && patientDetail) || (SelectedCpt.length > 0 && selectedValue?.partyRoleId) ) {
		btnRef.current.removeAttribute('disabled');
	} else {
		btnRef.current.setAttribute('disabled', 'disabled');
	}
 }, [SelectedCpt,patientDetail,selectedValue])

	// asyncoption

	// handle input change event
	const handleInputChange = (value) => {
		setValue(value);
	};

	
	// handle selection
	const handleChange = (value) => {
		let result = {
			patient: {
				firstName: value.firstName,
				middleName: value.middleName,
				lastName: value.lastName,
				dateOfBirth: value.dateOfBirth,
				contactMethod:value.contactMethod,
				email: value.email,
				phone: value.phone,
				partyRoleId: value.partyRoleId,
			},
		};
		setSelectedFormValue(result);
		
		//    result.partyRoleId ? setIsEdit(true) :setIsEdit(false);
		setIsEdit(true);
		setSelectedValue(value);
		// CheckAvilableBtn();

	};

	// load options using API call
	const loadOptions = async (inputValue) => {
		try {
			let data = {searchTerm: inputValue};
			let result = await getPatientsDetailsByHospital(hospitalId, data);
			return result.data.data;
		} catch (error) {}
	};

	const patientsFormDetail = (value) => {
		 
		setPatientDetail(value);
		// CheckAvilableBtn();
	};



const handleClearSelection=()=>{
	let result = {
		patient: {
			firstName: "",
			middleName: "",
			lastName: "",
			contactMethod:"",
			email:"",
			phone:"",
			partyRoleId: "",
		},
	};
	setSelectedFormValue(result);
	
	//    result.partyRoleId ? setIsEdit(true) :setIsEdit(false);
	setIsEdit(false);

	setSelectedValue(null);
	// CheckAvilableBtn();
	btnRef.current.setAttribute('disabled', 'disabled');
}

	const saveOrder = async () => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled');
		}

		let data;
		if (selectedValue?.partyRoleId && SelectedCpt.length > 0) {
			data = {
				hospitalPartyRoleId: hospitalId,
				patientPartyRoleId: selectedValue.partyRoleId,
				procedures: SelectedCpt,
			};
		} else if (SelectedCpt.length > 0 && patientDetail) {
			data = {
				hospitalPartyRoleId: hospitalId,
				patient: {...patientDetail,phone:NormalizePhone(patientDetail.phone)},
				procedures: SelectedCpt,
			};
		}

		try {
			
			let result = await saveOrderData(data);
			// eslint-disable-next-line eqeqeq
			if (result.data.message == ServiceMsg.OK) {
				dispatch(notify(`Successfully added`, 'success'));
				// history.push({
				// 	pathname: `/hospitals/hospital`,
				// 	search: `?id=${hospitalId}&&name=${hospitalName}`,
				// 	// state: { detail: 'some_value' }
				// });

				history.push({
					pathname: `/order/view`,
					search: `?orderId=${result.data.data}&&hospitalId=${hospitalId}&&hospitalName=${hospitalName}`,

					// state: { detail: 'some_value' }
				});
				// order/view?orderId=45
			
			}

		} catch (error) {
			OnError(error, dispatch);
		}
	};

	return (
		<div className='p-4'>
			<div className='row'>
				<div className='col-md-4 mb-4'>
					<label className=' float-left mr-3 pt-1 font-weight-bold'>Select Patient</label>
					{/* <Select options={options} onChange={selectPatient} /> */}

					<AsyncSelect cacheOptions defaultOptions value={selectedValue} getOptionLabel={(e) => e.firstName + ' '+ e.lastName} getOptionValue={(e) => e.partyRoleId} loadOptions={loadOptions} onInputChange={handleInputChange} onChange={handleChange} />
				
				</div>
				<div className="col-md-4 pt-3">
				{isEdit? <div className="fa fa-close float-left mr-5 text-danger cursor-point " onClick={handleClearSelection}> Clear</div>:""}
				</div>
				<div className='col-md-12 mb-2 pt-1'>
				
					<h5 className="float-left">If not, Please fill the below fields</h5>
				</div>
			</div>

			<div className='border-bottom mb-3'></div>
			<OrderPatientsForm defaultValues={selectedFormValue} isEdit={isEdit} handleForm={patientsFormDetail} />
			<div className='border-bottom'></div>

			<h5 className='font-weight-bold mt-3 mb-3'>Procedures </h5>

			<OrderProcedureSelect handleCPTChange={handleCPTChange} />

			<div className='row'>
				<div className='col-md-12 mt-1'>
					<button type='submit' onClick={saveOrder} ref={btnRef} className='btn btn-primary btn-lg float-right'>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderForm;
