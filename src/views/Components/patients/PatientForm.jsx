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
import { saveProvider, updateProviderByPartyRoleId } from 'src/service/providerService';

const schema = yup.object().shape({
	hospitalName: yup.string().required('Hospital Name is required'),
	healthSystemPartyRoleId: yup.string().required('Health system is required'),
	firstName: yup.string().required('First name is required'),
	middleName: yup.string().required('Middle name is required'),
	lastName: yup.string().required('Last name is required'),
	address1: yup.string().required('Address line1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required'),
	billingAddress1: yup.string().required('billing Address line 1 is required'),
	billingAddress2: yup.string(),
	billingCity: yup.string().required('City is required'),
	billingState: yup.string().required('State is required'),
	billingZip: yup.string().required('Zip is required'),
	phone: yup.string().required('Phone is required').matches(ValidationPatterns.phoneRegExp, 'Phone number is not valid'),
	speciality: yup.string().required('Speciality is required'),
	taxId: yup.string().required('Tax Id is required'),
	nip: yup.string().required('NIP is required'),
	bankName: yup.string().required('Bank name is required'),
	accountNumber: yup.string().required('Account number is required'),
	routing: yup.string().required('Routing is required')
});

const ProviderForm = ({ defaultValues, isEdit = false, partyRoleId = null }) => {
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
	const providerFormSubmit = (data) => {
		console.log(data)
		console.log("isEdit", isEdit)
		if (isEdit) {
			updateProviderInfo();
		} else {
			addProvider(data);
		}
	};

	// save Provider
	const addProvider = async (data) => {
		const newProvider = {
			provider: {
				firstName: data.firstName,
				middleName: data.middleName,
				lastName: data.lastName,
				hospitalList: data.healthSystemPartyRoleId,
				speciality: data.speciality,
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
				{
					partyContactTypeId: PartyTypeEnum.shipping,
					address1: data.billingAddress1,
					address2: data.billingAddress2,
					city: data.billingCity,
					state: data.billingState,
					zip: data.billingZip,
				},
			],
			telecommunicationsNumber: {
				partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
				number: data.phone,
			},
			paymentInfo: {
				taxId: data.taxId,
				nip: data.nip,
				bankName: data.bankName,
				routing: data.routing,
				accountNumber: data.accountNumber,

			},
		};
		try {
			if (newProvider) {
				let result = await saveProvider(newProvider);
				if (result.data.message === ServiceMsg.OK) {
					dispatch(notify(`Successfully added`, 'success'));
					history.push('/provider');
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	// update Provider
	const updateProviderInfo = async () => {
		try {
			const updateProvider = {


				...((dirtyFields.firstName || dirtyFields.middleName || dirtyFields.lastName || dirtyFields.hospitalList || dirtyFields.speciality) && {
					provider: {
						firstName: getValues('firstName'),
						middleName: getValues('middleName'),
						lastName: getValues('lastName'),
						hospitalList: getValues('hospitalList'),
						speciality: getValues('speciality'),
					}
				}),



				...((dirtyFields.address1 || dirtyFields.address2 || dirtyFields.city || dirtyFields.state || dirtyFields.zip || dirtyFields.billingAddress1 || dirtyFields.billingAddress2 || dirtyFields.billingCity || dirtyFields.billingState || dirtyFields.billingZip) && {
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

						...(dirtyFields.billingAddress1 || dirtyFields.billingAddress2 || dirtyFields.billingCity || dirtyFields.billingState || dirtyFields.billingZip
							? [
								{
									partyContactTypeId: PartyTypeEnum.shipping,
									address1: getValues('billingAddress1'),
									address2: getValues('billingAddress2'),
									city: getValues('billingCity'),
									state: getValues('billingState'),
									zip: getValues('billingZip'),
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

				...((dirtyFields.taxId || dirtyFields.nip || dirtyFields.bankName || dirtyFields.routing || dirtyFields.accountNumber) && {
					paymentInfo: {

						taxId: getValues('taxId'),
						nip: getValues('nip'),
						bankName: getValues('bankName'),
						routing: getValues('routing'),
						accountNumber: getValues('accountNumber'),

					},
				}),
			};
			if (Object.keys(updateProvider).length == 0) {
				dispatch(notify(`No record to update`, 'error'));
			} else {
				try {
					const result = await updateProviderByPartyRoleId(partyRoleId, updateProvider);
					if (result.data.message == ServiceMsg.OK) {
						dispatch(notify(`Successfully updated`, 'success'));
						history.push('/providers');
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
			<form onSubmit={handleSubmit(providerFormSubmit)}>
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
							<input className='form-control-sm' type='text' {...register('lastName')} />
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




export default ProviderForm;
