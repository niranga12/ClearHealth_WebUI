import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { PartyTypeEnum, ServiceMsg, ValidationPatterns } from 'src/reusable/enum';
import { useHistory } from 'react-router-dom';
import { getHealthSystemList } from 'src/service/healthsystemService';
import OnError from 'src/_helpers/onerror';
import { notify } from 'reapop';
import { savePatient, updatePatientByPartyRoleId } from 'src/service/patientService';

const schema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup.string(),
	address1: yup.string().required('Address line1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required'),
	phone: yup.string().required('Phone is required').matches(ValidationPatterns.phoneRegExp, 'Phone number is not valid'),

});

const PatientForm = ({ defaultValues, isEdit = false, partyRoleId = null }) => {
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

	const [healthSystems, setHealthSystem] = useState([]);

	const handleBillingChecked = (event) => {
		if (event.target.checked) {
			setValue('billingAddress1', getValues('address1'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('billingAddress2', getValues('address2'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('billingCity', getValues('city'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('billingState', getValues('state'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('billingZip', getValues('zip'), {
				shouldValidate: true,
				shouldDirty: true,
			});
		} else {
			setValue('billingAddress1', '');
			setValue('billingAddress2', '');
			setValue('billingCity', '');
			setValue('billingState', '');
			setValue('billingZip', '');
		}
	};

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues]);


	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getHealthSystemList({});
				setHealthSystem(result.data.data);
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, []);



	// form submit
	const patientFormSubmit = (data) => {
		console.log(data)
		console.log("isEdit", isEdit)
		if (isEdit) {
			updatePatientInfo();
		} else {
			addPatient(data);
		}
	};

	// save Patient
	const addPatient = async (data) => {
		const newPatient = {
			patient: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				dateOfBirth: data.dateOfBirth,
			},

			postalAddress: [
				{
					partyContactTypeId: PartyTypeEnum.primary,
					address1: data.address1,
					address2: data.address2,
					city: data.city,
					state: data.state,
					zip: data.zip,
				},
			],
			telecommunicationsNumber: {
				partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
				number: data.phone,
			},
		};
		try {
			if (newPatient) {
				let result = await savePatient(newPatient);
				if (result.data.message === ServiceMsg.OK) {
					dispatch(notify(`Successfully added`, 'success'));
					history.push('/patients');
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	// update Patient
	const updatePatientInfo = async () => {
		try {
			const updatePatient = {


				...((dirtyFields.firstName || dirtyFields.lastName || dirtyFields.email || dirtyFields.dateOfBirth) && {
					patient: {
						firstName: getValues('firstName'),
						lastName: getValues('lastName'),
						email: '',
						dateOfBirth: getValues('dateOfBirth'),
					}
				}),



				...((dirtyFields.address1 || dirtyFields.address2 || dirtyFields.city || dirtyFields.state || dirtyFields.zip ) && {
					postalAddress: [
						...(dirtyFields.address1 || dirtyFields.address2 || dirtyFields.city || dirtyFields.state || dirtyFields.zip
							? [
								{
									partyContactTypeId: PartyTypeEnum.primary,
									address1: getValues('address1'),
									address2: getValues('address2'),
									city: getValues('city'),
									state: getValues('state'),
									zip: getValues('zip'),
								},
							]
							: []),

					],
				}),

				...(dirtyFields.phone && {
					telecommunicationsNumber: {
						partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
						number: getValues('phone'),
					},
				}),

			
			};
			debugger;
			if (Object.keys(updatePatient).length == 0) {
				dispatch(notify(`No record to update`, 'error'));
			} else {
				try {
					const result = await updatePatientByPartyRoleId(partyRoleId, updatePatient);
					if (result.data.message == ServiceMsg.OK) {
						dispatch(notify(`Successfully updated`, 'success'));
						history.push('/patients');
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
			<form onSubmit={handleSubmit(patientFormSubmit)}>
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
						</div>

					</div>
					<div className='col-md-6'>

						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('address1')} />
							<div className='small text-danger  pb-2   '>{errors.address1?.message}</div>
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
						</div>

					</div>
					<div className='col-md-6'>

						<div className='form-group'>
							<label className='form-text'>Address Line 2 </label>
							<input type='text' className='form-control-sm' {...register('address2')} />
						</div>
					</div>
				</div>


				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								DOB <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('dateOfBirth')} />
						</div>

					</div>
					<div className='col-md-6'>
						<div className='row'>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									City <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('city')} />
								<div className='small text-danger  pb-2   '>{errors.city?.message}</div>
							</div>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									State <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('state')} />
								<div className='small text-danger  pb-2   '>{errors.state?.message}</div>
							</div>
						</div>
					</div>
				</div>

				<div className='row mb-3'>
					<div className='col-md-6'>
					<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('phone')} />
							<div className='small text-danger  pb-2   '>{errors.phone?.message}</div>
						</div>
					</div>
					<div className='col-md-6'>

						<div className='form-group'>
							<label className='form-text'>
								Zip <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('zip')} />
							<div className='small text-danger  pb-2   '>{errors.zip?.message}</div>
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




export default PatientForm;
