import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { MaskFormat, PartyTypeEnum, ServiceMsg } from 'src/reusable/enum';
import { useHistory } from 'react-router-dom';
import OnError from 'src/_helpers/onerror';
import { notify } from 'reapop';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import InputMask from 'react-input-mask';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import DateSelector from 'src/views/common/dateSelector';
const schema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	roleType: yup.string().required('role type is required'),
	email: yup.string().required('Email is required').email('Email must be a valid email'),
	phone: yup
		.string()
		.required('Phone is required')
		.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),

});

const UserForm = ({ defaultValues, isEdit = false, partyRoleId = null }) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	var initMonth = new Date();
	initMonth.setMonth(initMonth.getMonth() - 3);
	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const { dirtyFields } = useFormState({ control });
	const dispatch = useDispatch();
	let history = useHistory();
	const [stateOption, setStateOption] = React.useState(defaultValues.state);
	const [fromDate,setFromDate] = useState(initMonth);

	useEffect(() => {
		dispatch(loaderShow());
		reset(defaultValues);
		dispatch(loaderHide());
		setStateOption(getValues('state'));
		if (getValues('dateOfBirth') != '') {
			setFromDate(getValues('dateOfBirth'));
		}

	}, [defaultValues]);




	// form submit
	const userFormSubmit = (data) => {
		if (isEdit) {
			updateUserInfo();
		} else {
			addUser(data);
		}
	};

	// save User
	const addUser = async (data) => {
		const newUser = {
				firstName: data.firstName,
				lastName: data.lastName,
				roleTypeId:data.roleTypeId,
				status: data.status,
				email: data.email,
				
			
		};
		try {
			if (newUser) {
				// let result = await savePatient(newUser);
				// if (result.data.message === ServiceMsg.OK) {
				// 	dispatch(notify(`Successfully added`, 'success'));
				// 	history.push('/users');
				// }
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const stateSelect = (event) => {
		setValue('state', event.target.innerText, { shouldValidate: true, shouldDirty: true, });
	};


	// update User
	const updateUserInfo = async () => {
		try {
			const updateUser = {
				...((dirtyFields.firstName || dirtyFields.lastName || dirtyFields.roleTypeId || dirtyFields.status|| dirtyFields.email) && {
						firstName: getValues('firstName'),
						lastName: getValues('lastName'),
						roleTypeId: getValues('roleTypeId'),
						status: getValues('status'),
						email: getValues('email'),
					
				}),

			};
			if (Object.keys(updateUser).length == 0) {
				dispatch(notify(`No record to update`, 'error'));
			} else {
				try {
					// const result = await updatePatientByPartyRoleId(partyRoleId, updateUser);
					// if (result.data.message == ServiceMsg.OK) {
					// 	dispatch(notify(`Successfully updated`, 'success'));
					// 	history.push('/users');
					// }
				} catch (error) {
					OnError(error, dispatch);
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	return (
		<div className='p-4'>
			<form onSubmit={handleSubmit(userFormSubmit)}>
				{/* hospital details */}
				<h5 className='font-weight-bold mt-1'>Personal Information</h5>

				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								First Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('firstName')} />
							<div className='small text-danger  pb-2   '>{errors.firstName?.message}</div>
						</div>

					</div>
					
				</div>

				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Last Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('lastName')} />
							<div className='small text-danger  pb-2   '>{errors.lastName?.message}</div>
						</div>

					</div>
					
				</div>


				<div className='row mb-3'>
				<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Email <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('email')} />
							<div className='small text-danger  pb-2   '>{errors.email?.message}</div>
						</div>
					</div>
				
				</div>

				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<InputMask {...register('phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={isEdit ? true : false} className='form-control-sm' />
							{/* <input type='text' className='form-control-sm' {...register('phone')} /> */}
							<div className='small text-danger  pb-2   '>{errors.phone?.message}</div>
						</div>
					</div>
					
				</div>

				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Email <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('email')} />
							<div className='small text-danger  pb-2   '>{errors.email?.message}</div>
						</div>
					</div>

				</div>


				<div className='row'>
					<div className='col-md-12'>
						<button type='submit' className='btn btn-primary btn-lg float-right'>
							{isEdit ? 'Update' : 'Save'}

						</button>
					</div>
				</div>
			</form>
		</div>
	);
};




export default UserForm;
