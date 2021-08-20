import React, { useEffect, useState } from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import { EnhancementPercentage, ServiceType } from 'src/reusable/enum';
import { getHospitalsList } from 'src/service/hospitalsService';
import { useDispatch } from 'react-redux';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { notify } from 'reapop';


const schema = yup.object().shape({
	filterTool: yup.object().shape({
	serviceType: yup.string(),
	hospitalSearch: yup.string(),
	enhancementRate: yup.string().required(),
	// enhancementOn:yup.string().required()
	})
});

const resetTool={
	filterTool: {
	serviceType: "",
	hospitalSearch: "",
	enhancementRate: "",
	enhancementOn:""
	}
}


const PricingToolFilter = ({fieldsList=[],isNotGlobal, handleFilterChange,saveChange,selectedPackage}) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState,
		// formState: {errors},
	} = useForm({resolver: yupResolver(schema) ,	mode: "all"  });


	const { isDirty, isValid } = formState;


const [serviceList, setServiceList] = useState(ServiceType.Types);
const [hospitalList, setHospitalList] = useState([]);
const [stateChange, setstateChange] = useState(false);

const [hospitalId, setHospitalId] = useState(null);
const location = useLocation();

const dispatch = useDispatch();



  

useEffect(() => {
	reset(resetTool)
	const params = new URLSearchParams(location.search);
	const id = params.get('id');
	setHospitalId(id);
	const fetchData= async ()=>{
		try {
			dispatch(loaderShow());
		let result =await getHospitalsList({});
	    let hospitals=result.data.data;
	
		if(id){
			let data=hospitals.filter(x=>x.partyRoleId==id);
			setHospitalList(data);
           setValue("filterTool.hospitalSearch", Number(id))
	    }else{
			setHospitalList(hospitals);
		}
		dispatch(loaderHide());


		} catch (error) {
			
		}
	}
	fetchData();	
}, [selectedPackage,location])



useEffect(() => {
	
	const formValue=getValues("filterTool");
	handleFilterChange(formValue)
	
}, [stateChange])





const pricingFormSubmit=({filterTool})=> {
	
	if(isNotGlobal){
		if(filterTool.enhancementOn && filterTool.enhancementRate){
			saveChange(filterTool);
		}else{
			dispatch(notify(`Please Select collection Enhancement On`, 'error'));
		}

	}else{
		saveChange(filterTool);

	}

}


const EnhancementPercentageInput=()=>{
	

	return (
		<input type='number' className='form-control-sm' {...register('filterTool.enhancementRate')} onBlur={()=>setstateChange(!stateChange)}/>
	)

}

const EnhancementPercentageSelect=()=>{
	return (
		<select name='collectionEnhancement'  id='collectionEnhancement' className='form-control-sm' {...register('filterTool.enhancementRate')} onBlur={()=>setstateChange(!stateChange)}>
							<option value=''> Select</option>

							{EnhancementPercentage.map((item, index) => (
									<option key={index} value={item.value}>
										{item.text}
									</option>
								))}
							
						</select>
	)
}


const CollectionEnhancementOn=()=>{
	return (
		<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Collection Enhancement On </label>
						<select name='enhancementOn' id='enhancementOn'  className='form-control-sm' {...register('filterTool.enhancementOn')} onBlur={()=>setstateChange(!stateChange)} >
						<option value="">Select</option>
							{fieldsList.map((item, index) => (
									<option key={index} value={item.id}>
										{item.text}
									</option>
								))}
						</select>
						
						{/* <input type='text' className='form-control-sm' {...register('enhancementOn')} /> */}
					</div>
				</div>
	)
}





	return (
		<>
		<form onSubmit={handleSubmit(pricingFormSubmit)}>
			<div className='row divider p-2'>

				<div className='col-md-3'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Service Type </label>
						<select name='serviceType' id='serviceType' className='form-control-sm' {...register('filterTool.serviceType')}  onBlur={()=>setstateChange(!stateChange)}>
							{serviceList.map((item, index) => (
									<option key={index} value={item.value}>
										{item.text}
									</option>
								))}


						</select>
					</div>
				</div>

				<div className='col-md-3'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Hospital Search </label>
						<select name='hospitalSearch'   id='hospitalSearch' className='form-control-sm' {...register('filterTool.hospitalSearch')} onBlur={()=>setstateChange(!stateChange)} >
							<option value=''> Select</option>

							{hospitalList.map((item, index) => (
									<option key={index} value={item.partyRoleId}>
										{item.name}
									</option>
								))}
							
						</select>
					</div>
				</div>

				<div className='col-md-2'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Collection Enhancement </label>
						{/* <input type='text' className='form-control-sm' {...register('filterTool.collectionEnhancement')} onBlur={()=>setstateChange(!stateChange)}/> */}
						{isNotGlobal ? EnhancementPercentageInput():EnhancementPercentageSelect()}
					</div>
				</div>
				
				{isNotGlobal && CollectionEnhancementOn()}

				<div className="col-md-2 pt-2">
					<button className="btn btn-primary mt-4" disabled={!isValid} >Save</button>

				</div>

			</div>
			</form>
		</>
	);
};




PricingToolFilter.propTypes = {
	fieldsList:PropTypes.any,
	isNotGlobal:PropTypes.bool,
	handleFilterChange: PropTypes.func,
	saveChange:PropTypes.func,
	selectedPackage: PropTypes.any
	

};

export default PricingToolFilter;
