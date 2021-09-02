import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { ActiveList, ServiceMsg } from 'src/reusable/enum';
import { useHistory } from 'react-router-dom';
import OnError from 'src/_helpers/onerror';
import { notify } from 'reapop';
import { saveUser, updateUserByPartyRoleId } from 'src/service/userService';
import { getRoleList } from 'src/service/commonService';
import FormatText from 'src/reusable/FormatText';

const schema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	roleTypeId: yup.string().required('Role type is required'),
	status: yup.string().required('Status is required'),
	email: yup.string().required('Email is required').email('Email must be a valid email'),
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

	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const { dirtyFields } = useFormState({ control });
	const dispatch = useDispatch();
	let history = useHistory();
	const [roleTypeDta, setRoleTpeData] = useState([]);

	useEffect(() => {

		const fetchData = async () => {
			try {
				const RoleTypeList = await getRoleList();
				setRoleTpeData(RoleTypeList.data.data);
				reset(defaultValues);
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();



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
			roleTypeId: data.roleTypeId,
			status: data.status,
			email: data.email,


		};
		try {
			if (newUser) {
				let result = await saveUser(newUser);
				if (result.data.message === ServiceMsg.OK) {
					dispatch(notify(`Successfully added`, 'success'));
					history.push('/users');
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};


	// update User
	const updateUserInfo = async () => {
		try {
			const updateUser = {
				...((dirtyFields.firstName || dirtyFields.lastName || dirtyFields.roleTypeId || dirtyFields.status || dirtyFields.email) && {
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
					const result = await updateUserByPartyRoleId(partyRoleId, updateUser);
					if (result.data.message == ServiceMsg.OK) {
						dispatch(notify(`Successfully updated`, 'success'));
						history.push('/users');
					}
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
							<input className='form-control-sm' type='text' {...register('firstName')} onInput={(e) => (e.target.value = FormatText(e.target.value))}/>
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
							<input className='form-control-sm' type='text' {...register('lastName')} onInput={(e) => (e.target.value = FormatText(e.target.value))}/>
							<div className='small text-danger  pb-2   '>{errors.lastName?.message}</div>
						</div>

					</div>

				</div>


				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Role Type <span className='text-danger font-weight-bold '>*</span>
							</label>

							<select name='roleTypeId' id='roleTypeId' className='form-control-sm'  {...register('roleTypeId')} >
								{roleTypeDta.map((item, index) => (
									<option key={index} value={item.roleTypeId}>
										{item.description}
									</option>
								))}
							</select>
							<div className='small text-danger  pb-2   '>{errors.roleTypeId?.message}</div>
						</div>
					</div>

				</div>

				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Status <span className='text-danger font-weight-bold '>*</span>
							</label>
							<select name='status' id='status' className='form-control-sm' {...register('status')}>
								{ActiveList.map((item, index) => (
									<option key={index} value={item.value}>
										{item.text}
									</option>
								))}
							</select>
							<div className='small text-danger  pb-2   '>{errors.status?.message}</div>
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
