import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {  ServiceTypeEnum } from 'src/reusable/enum';


const schema = yup.object().shape({
procedure: yup.object().shape({
	facility: yup.number().required(),
	anesthesia: yup.number(),
	clearFee: yup.number(),
	total: yup.number(),
	physician: yup.number(),
	pathology: yup.number()
	})
});

const ProcedureForm = ({data, handleSave}) => {
	const {
		register,
		setValue,
		getValues,
		formState: {errors},
	} = useForm({mode: 'all', resolver: yupResolver(schema)});


const [state, setstate] = useState(false)
const [liveStatus, setLiveStatus] = useState(false);



const dynamicFormControl=()=>{
	return(
		<>
			{/* Anesthesia */}
			<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Anesthesia </label>
                        <span className="currency-sign">$</span>
						<input className='form-control-sm currecy-input' type='number' {...register('procedure.anesthesia')}   />
					</div>
				</div>

				{/* pathology */}
				<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Pathology </label>
                        <span className="currency-sign">$</span>
						<input className='form-control-sm currecy-input' type='number' {...register('procedure.pathology')} />
					</div>
				</div>
		</>
	)
}

useEffect(() => {

	const formValue=getValues('procedure');
	let saveData;
	if(formValue.facility && formValue.physician){
		let clearFees=(Number(formValue.facility)+Number(formValue.physician))*0.15;
		let total= clearFees +(Number(formValue.facility)+Number(formValue.physician));
		setValue('procedure.clearFee',clearFees.toFixed(2));
		setValue('procedure.total',total.toFixed(2));
		saveData={...data,...formValue,clearFee:clearFees.toFixed(2),total:total.toFixed(2),status:liveStatus}
		handleSave(saveData);

	}else{
		let singleFees=formValue.facility? formValue.facility:formValue.physician
		let clearFees=(Number(singleFees))*0.065;
		let total=Number(singleFees)+Number(clearFees);
		setValue('procedure.clearFee',clearFees.toFixed(2));
		setValue('procedure.total',total.toFixed(2));
		saveData={...data,...formValue,clearFee:clearFees.toFixed(2),total:total.toFixed(2),status:liveStatus};
		handleSave(saveData);
		
		
	}
}, [state])

const handleTakeLive=()=>{
	const formValue=getValues('procedure');
	setLiveStatus(!liveStatus)
	let saveData={...data,...formValue,status:!liveStatus};
	handleSave(saveData);
}


	return (
		<>
        

         
        <div className="divider ">
			<div className='row'>
				<div className='col-md-12 pt-3 pb-2'>
					<h4 className='procedure-add-title'>{data.description} -  {data.code}</h4>
				</div>
			</div>

			<div className='row'>
				{/* facility */}
				<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Facility </label>
                        <span className="currency-sign">$</span>
						<input className='form-control-sm currecy-input' type='number' {...register('procedure.facility')} onBlur={e =>{setstate(!state)}} />
						{/* {errors.procedure?.facility && <p>{errors.procedure?.facility.message}</p>} */}

					</div>
				</div>

					{/* physician */}
					<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Physician </label>
                        <span className="currency-sign">$</span>
						<input className='form-control-sm currecy-input' type='number' {...register('procedure.physician')}   onBlur={e =>{setstate(!state)}}/>
					</div>
				</div>

				

				{/* clearfee */}
				<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '>Clear Fee </label>
                        <span className="currency-sign">$</span>
						<input className='form-control-sm currecy-input disable-field' type='number' {...register('procedure.clearFee')}  />
					</div>
				</div>

				{/* total */}
				<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Total </label>
                        <span className="currency-sign">$</span>
						<input className='form-control-sm currecy-input disable-field' type='number' {...register('procedure.total')}  />
					</div>
				</div>

				<div className='col-md-4 pt-4 mt-1'>
                
					<button  className={`btn  w-75 m-auto text-white ${liveStatus ? "btn-secondary": "btn-primary" }`} onClick={handleTakeLive}>Take Live</button>
                 
				</div>
			</div>

			<div className='row'>
				{data.serviceType !== ServiceTypeEnum.Radiology? dynamicFormControl():'' }
			
			</div>

            </div>
          </>
        
	);
};


ProcedureForm.propTypes = {
	data:PropTypes.object,
	handleSave:PropTypes.func,
};

export default ProcedureForm;
