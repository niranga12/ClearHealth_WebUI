import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OrderPatientsForm from './OrderPatientsForm';
import OrderProcedureSelect from './OrderProcedureSelect';
import AsyncSelect from 'react-select/async';
import { getPatientsDetailsByHospital } from 'src/service/hospitalsService';



const OrderForm = () => {
	
	let btnRef = useRef();
	const location = useLocation();

	// const [procedure, setProcedure] = useState(1);
	const [hospitalId, setHospitalId] = useState(null);
	// const [selectedPatient, setselectedPatient] = useState(null);
	const [inputValue, setValue] = useState('');
	const [selectedValue, setSelectedValue] = useState(null);
	const [isEdit, setIsEdit] = useState(false)

	const [selectedFormValue, setSelectedFormValue] = useState(null);
	const [SelectedCpt, setSelectedCpt] = useState([]);
	const [patientDetail, setPatientDetail] = useState(null);
	



// on location change get hospitalId
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('hospitalId');
		setHospitalId(id);
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled');
		}
	}, [location]);

	
	
	const handleCPTChange=(value)=>{
		setSelectedCpt(value);
		// console.log(value);
		CheckAvilableBtn();
	}

	const CheckAvilableBtn=()=>{
		debugger;
		if (SelectedCpt.length>0 && patientDetail ) {
			btnRef.current.removeAttribute('disabled');
		} else {
			btnRef.current.setAttribute('disabled', 'disabled');
		}
	}

	// asyncoption
	

   
	// handle input change event
	const handleInputChange = value => {
	  setValue(value);
	};
   
	// handle selection
	const handleChange = value => {
		// console.log(value);
		
let result={
	patient:{
		firstName:value.firstName,
		middleName:value.middleName,
		lastName:value.lastName,
		dateOfBirth:value.dateOfBirth,
		email:value.email,
		phone:value.phone
	}
	
}
setSelectedFormValue(result)
    //    result.partyRoleId ? setIsEdit(true) :setIsEdit(false);
	  setIsEdit(true)
	  setSelectedValue(value);
}

	 
   
	// load options using API call
	const loadOptions = async(inputValue) => {
		try {
			let data={searchTerm:inputValue}
			let result=await getPatientsDetailsByHospital(hospitalId,data);
			return result.data.data;
		} catch (error) {
			
		}

	};

	const patientsFormDetail=(value)=>{
// console.log(value);
setPatientDetail(value);
CheckAvilableBtn();

	}



	return (
		<div className='p-4'>
			<div className='row'>
				<div className='col-md-4 mb-4'>
					<label className=" float-left mr-3 pt-1">Select Patient</label>
					{/* <Select options={options} onChange={selectPatient} /> */}

				
					<AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.firstName}
        getOptionValue={e => e.partyRoleId}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />

				</div>
				<div className="col-md-6 mb-2 pt-3">
					<h5 >If not , Please fill below fields</h5>
				</div>
			</div>

<div className="border-bottom mb-3"></div>
			<OrderPatientsForm defaultValues={selectedFormValue} isEdit={isEdit}  handleForm={patientsFormDetail}/>
			<div className="border-bottom"></div>

			<h5 className='font-weight-bold mt-3 mb-3'>Procedures </h5>

			<OrderProcedureSelect  handleCPTChange={handleCPTChange}/>

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
