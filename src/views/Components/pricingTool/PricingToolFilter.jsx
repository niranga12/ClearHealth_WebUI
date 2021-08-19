import React from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';

const schema = yup.object().shape({
	serviceType: yup.string(),
	hospitalSearch: yup.string(),
	collectionEnhancement: yup.string(),
});

const PricingToolFilter = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	return (
		<>
			<div className='row divider p-2'>

				<div className='col-md-3'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Service Type </label>
						<select name='serviceType' id='serviceType' className='form-control-sm' {...register('serviceType')}>
							<option value=''> Select</option>
						</select>
					</div>
				</div>

				<div className='col-md-3'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Hospital Search </label>
						<select name='hospitalSearch' id='hospitalSearch' className='form-control-sm' {...register('hospitalSearch')}>
							<option value=''> Select</option>
						</select>
					</div>
				</div>

				<div className='col-md-3'>
					<div className='form-group'>
						<label className='form-text font-lato-bold '> Collection Enhancement </label>
						<input type='text' className='form-control-sm' {...register('collectionEnhancement')} />
					</div>
				</div>

			</div>
		</>
	);
};

export default PricingToolFilter;
