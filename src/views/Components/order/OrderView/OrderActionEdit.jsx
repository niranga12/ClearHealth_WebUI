/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getCPTCodesByHospital} from 'src/service/hospitalsService';
import OnError from 'src/_helpers/onerror';
import Select from 'react-select';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
	cptDetail: yup.object().shape({
		code: yup.string(),
		description: yup.string(),
		packagePrice: yup.string()
	}),
});


const OrderActionEdit = ({data, handleChangeCpt}) => {
	 const [cptList, setCptList] = useState([]);
    const [defaultValue, setDefaultValue] = useState([]);
	const [editDetail, seteditDetail] = useState(data);
	const dispatch = useDispatch();
	const {register, reset, formState} = useForm({resolver: yupResolver(schema), mode: 'all'});

   

	const [selectedCPT, setSelectedCPT] = useState([]);
	

	const handleChange = (newValue: any, actionMeta: any) => {
		setSelectedCPT(newValue);
		
		let changeValue={...editDetail,...newValue,codeId: newValue.Id}
		// delete changeValue['Id'];
		let formDetail={
			cptDetail:{...changeValue}
		}
		
		reset(formDetail)
		handleChangeCpt(formDetail.cptDetail);

		
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
			
				let result = await getCPTCodesByHospital(data.hospitalPartyRoleId, {});
				setCptList(result.data.data);
				let selected =result.data.data.filter(x=>x.Id==data.codeId);
				
				setDefaultValue(selected);
				let formDetail={
					cptDetail:{...data}
				}
				
				reset(formDetail)

			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, [data]);

	return (
    <>

      <div className="row">

      <div className='col-md-12 mb-3'>
				<label className='mr-4 float-left pt-2'>CPT Code </label>
			{	cptList.length > 0 && defaultValue.length>0 && <Select options={cptList} defaultValue={defaultValue[0]} onChange={handleChange}  getOptionLabel={(option) => `${option.code} - ${option.description}`} getOptionValue={(option) => `${option.Id}`} />}
		</div>

		<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
							Code
							</label>
							<input className='form-control-sm' type='text' {...register('cptDetail.code')} readOnly />
							
						</div>
		</div>
		<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
							Description
							</label>
							<input className='form-control-sm' type='text' {...register('cptDetail.description')} readOnly />
							
						</div>
		</div>
		<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
							Package Price
							</label>
							<input className='form-control-sm' type='text' {...register('cptDetail.packagePrice')} readOnly />
							
						</div>
		</div>

      </div>
    </>
    );
};


OrderActionEdit.propTypes = {
	handleChangeCpt: PropTypes.func,
	data: PropTypes.any
};


export default OrderActionEdit;
