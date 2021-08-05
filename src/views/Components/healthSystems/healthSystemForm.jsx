// @ts-nocheck
/* eslint-disable eqeqeq */
import React, {useEffect, useRef, useState} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {MaskFormat, Organizations, PartyTypeEnum, ServiceMsg, ValidationPatterns} from 'src/reusable/enum';
import {addHealthSystemNew, updateHealthSystemByPartyRoleId} from 'src/service/healthsystemService';
import OnError from 'src/_helpers/onerror';
import {notify} from 'reapop';
import {useHistory} from 'react-router-dom';
import InputMask from 'react-input-mask';
import NormalizePhone from 'src/reusable/NormalizePhone';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import useDebounce from 'src/reusable/debounce';
import {getValidateOrganization} from 'src/service/commonService';
import FormatText from 'src/reusable/FormatText';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// import history from "src/_helpers/history";

const schema = yup.object().shape({
	name: yup.string().required('Name is required').matches(ValidationPatterns.onlyCharacters, 'Name should contain only characters'),
	address1: yup.string().required('Address line1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	phone: yup
		.string()
		.required('Phone is required')
		.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
	// phone: yup.string().required('Phone is required').matches(ValidationPatterns.phoneRegExp, 'Phone number is not valid'),
	shippingAddress1: yup.string().required('Shipping Address line 1 is required'),
	shippingAddress2: yup.string(),
	shippingCity: yup.string().required('City is required'),
	shippingState: yup.string().required('State is required'),
	shippingZip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	contactName: yup.string().required('Contact name is required').matches(ValidationPatterns.onlyCharacters, 'Contact Name should contain only characters'),
	contactPhone: yup
		.string()
		.required('Contact phone is required')
		.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
	contactEmail: yup.string().required('Contact email is required').email('Contact Email must be a valid email'),
});

const HealthSystemForm = ({defaultValues, isEdit = false, partyRoleId = null, stateList = []}) => {
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		getValues,
		reset,
		clearErrors,
		control,
		formState: {errors},
	} = useForm({mode: 'all', resolver: yupResolver(schema)});

	const [stateOption, setStateOption] = React.useState(defaultValues.state);
	const [shippingStateOption, setShippingStateOption] = React.useState(defaultValues.shippingState);

	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const {dirtyFields} = useFormState({control});
	let btnRef = useRef();

	// for org name validation
	const [healthSystemName, setHealthSystemName] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [isAlreadyExit, setIsAlreadyExit] = useState(false);
	// Debounce search term so that it only gives us latest value ...
	// ... if searchTerm has not been updated within last 1000ms.
	// The goal is to only have the API call fire when user stops typing ...
	// ... so that we aren't hitting our API rapidly.
	const debouncedName = useDebounce(healthSystemName, 1000);

	const dispatch = useDispatch();
	let history = useHistory();

	// set default form values
	useEffect(() => {
		try {
			reset(defaultValues);
			setStateOption(defaultValues.state); //set state dropdown value
			setShippingStateOption(defaultValues.shippingState); //set shipping state dropdown value
		} catch (error) {
			OnError(error, dispatch);
		}
	}, [defaultValues]);

	// on state change function
	const stateSelect = (event) => {
		setValue('state', event.target.innerText, {shouldValidate: true, shouldDirty: true});
	};

	// on shipping state change function
	const shippingStateSelect = (event) => {
		setValue('shippingState', event.target.innerText, {shouldValidate: true, shouldDirty: true});
	};

	// validate organition name
	useEffect(() => {
		const fetchValidate = async () => {
			try {
				setIsSearching(true);
				if (debouncedName) {
					let data = {
						roleTypeId: Organizations.HealthSystem,
						organizationName: debouncedName,
						...(isEdit && {partyRoleId}),
					};


					const result = await getValidateOrganization(data);

					if (result.data.data) {
						btnRef.current.removeAttribute('disabled');
					} else {
						btnRef.current.setAttribute('disabled', 'disabled');
					}
					setIsSearching(false);
					setIsAlreadyExit(!result.data.data);
				    setValue('name', debouncedName, {shouldValidate: true, shouldDirty: true});
				} else {
					setIsSearching(false);
					setIsAlreadyExit(false);
				}
			} catch (error) {}
		};
		fetchValidate();
	}, [debouncedName]);

	const updateHealthInfo = async () => {
		
		try {
			let updatHealthSystem = {
				...(dirtyFields.name && {healthSystem: {name: getValues('name')}}),
				...((dirtyFields.address1 || dirtyFields.address2 || dirtyFields.city || dirtyFields.state || dirtyFields.zip || dirtyFields.shippingAddress1 || dirtyFields.shippingAddress2 || dirtyFields.shippingCity || dirtyFields.shippingState || dirtyFields.shippingZip) && {
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

						...(dirtyFields.shippingAddress1 || dirtyFields.shippingAddress2 || dirtyFields.shippingCity || dirtyFields.shippingState || dirtyFields.shippingZip
							? [
									{
										partyContactTypeId: PartyTypeEnum.shipping,
										address1: getValues('shippingAddress1'),
										address2: getValues('shippingAddress2'),
										city: getValues('shippingCity'),
										state: getValues('shippingState'),
										zip: getValues('shippingZip'),
									},
							  ]
							: []),
					],
				}),
				...(dirtyFields.phone && {
					telecommunicationsNumber: {
						partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
						number: NormalizePhone(getValues('phone')),
					},
				}),
				...((dirtyFields.contactName || dirtyFields.contactPhone || dirtyFields.contactEmail) && {
					patientAccessContact: {
						name: getValues('contactName'),
						phone: NormalizePhone(getValues('contactPhone')),
						email: getValues('contactEmail'),
					},
				}),
			};

			if (Object.keys(updatHealthSystem).length === 0) {
				dispatch(notify(`No record to update`, 'error'));
			} else {
				try {
					const result = await updateHealthSystemByPartyRoleId(partyRoleId, updatHealthSystem);
					// eslint-disable-next-line eqeqeq
					if (result.data.message == ServiceMsg.OK) {
						dispatch(notify(`Successfully updated`, 'success'));
						history.push('/healthsystem');
					}
				} catch (error) {
					OnError(error, dispatch);
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const handleShippingChecked = (event) => {
		if (event.target.checked) {
			setValue('shippingAddress1', getValues('address1'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingAddress2', getValues('address2'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingCity', getValues('city'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingState', getValues('state'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingZip', getValues('zip'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setShippingStateOption(getValues('state'));
		} else {
			setValue('shippingAddress1', '');
			setValue('shippingAddress2', '');
			setValue('shippingCity', '');
			setValue('shippingState', '');
			setValue('shippingZip', '');
			setShippingStateOption('');
		}
	};

	const healthSystemFormSubmit = (data) => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled');
		}

		if (isEdit) {
			updateHealthInfo();
		} else {
			addHealthSystem(data);
		}
	};

	const addHealthSystem = async (data) => {
		const newHealthSystem = {
			healthSystem: {
				name: data.name,
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
					address1: data.shippingAddress1,
					address2: data.shippingAddress2,
					city: data.shippingCity,
					state: data.shippingState,
					zip: data.shippingZip,
				},
			],
			telecommunicationsNumber: {
				partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
				number: NormalizePhone(data.phone),
			},
			patientAccessContact: {
				name: data.contactName,
				phone: NormalizePhone(data.contactPhone),
				email: data.contactEmail,
			},
		};

		try {
			if (newHealthSystem) {
				const result = await addHealthSystemNew(newHealthSystem);
				if (result.data.message == ServiceMsg.OK) {
					dispatch(notify(`Successfully added`, 'success'));
					history.push('/healthsystem');
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	return (
		<div className='p-4'>
			<form onSubmit={handleSubmit(healthSystemFormSubmit)}>
				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							

							<input className='form-control-sm' type='text' {...register('name')}   onInput={(e) => (e.target.value = FormatText(e.target.value))} onChange={(e) => setHealthSystemName(e.target.value)} />
							<div className='small text-danger  pb-2   '>{errors.name?.message}</div>
							{isSearching && <div>Searching ...</div>}
							{isAlreadyExit && <div className='small text-danger pb-2'>Health system name already taken</div>}
						</div>
					</div>
				</div>
				<div className='row'>
					{/* address */}
					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>Address </h5>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1<span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('address1')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.address1?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>Address Line 2 </label>
							<input type='text' className='form-control-sm' {...register('address2')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
						</div>

						<div className='row'>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									City <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('city')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
								<div className='small text-danger  pb-2   '>{errors.city?.message}</div>
							</div>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									State <span className='text-danger font-weight-bold '>*</span>
								</label>
								<Autocomplete
									id='combo-box-demo'
									options={stateList}
									//   value={stateOption}
									inputValue={stateOption}
									onInputChange={(event, newInputValue) => {
										setStateOption(newInputValue);
									}}
									getOptionLabel={(option) => option.stateName}
									onChange={stateSelect}
									renderInput={(params) => <TextField {...params} {...register('state')} className='control-autocomplete' variant='outlined' />}
								/>
								{/* <input type='text' className='form-control-sm' {...register('state')} /> */}
								<div className='small text-danger  pb-2   '>{errors.state?.message}</div>
							</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Zip <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('zip')} />
							<div className='small text-danger  pb-2   '>{errors.zip?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<InputMask {...register('phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={isEdit ? true : false} className='form-control-sm' />
							{/* <input type='text' className='form-control-sm' {...register('phone')} /> */}
							<div className='small text-danger  pb-2   '>{errors.phone?.message}</div>
						</div>
					</div>

					{/* shipping address  */}
					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>
							{' '}
							<span className='pr-5'>Shipping Address </span> <input type='checkbox' className='form-check-input' onChange={handleShippingChecked} /> <span className='small'>Same As Address</span>{' '}
						</h5>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('shippingAddress1')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.shippingAddress1?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>Address Line 2 </label>
							<input type='text' className='form-control-sm' {...register('shippingAddress2')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
						</div>

						<div className='row'>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									City <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('shippingCity')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
								<div className='small text-danger  pb-2   '>{errors.shippingCity?.message}</div>
							</div>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									State <span className='text-danger font-weight-bold '>*</span>
								</label>

								<Autocomplete
									id='business state'
									options={stateList}
									//   value={stateOption}
									inputValue={shippingStateOption}
									onInputChange={(event, newInputValue) => {
										setShippingStateOption(newInputValue);
									}}
									getOptionLabel={(option) => option.stateName}
									onChange={shippingStateSelect}
									renderInput={(params) => <TextField {...params} {...register('shippingState')} className='control-autocomplete' variant='outlined' />}
								/>
								{/* <input type='text' className='form-control-sm' {...register('shippingState')} /> */}
								<div className='small text-danger  pb-2   '>{errors.shippingState?.message}</div>
							</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Zip <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('shippingZip')} />
							<div className='small text-danger  pb-2   '>{errors.shippingZip?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>Patient Access Contact </h5>

						<div className='form-group'>
							<label className='form-text'>
								Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('contactName')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.contactName?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<InputMask {...register('contactPhone')} mask={MaskFormat.phoneNumber} alwaysShowMask={isEdit ? true : false} className='form-control-sm' />
							{/* <input type='text' className='form-control-sm' {...register('contactPhone')} /> */}
							<div className='small text-danger  pb-2   '>{errors.contactPhone?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Email <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('contactEmail')} />
							<div className='small text-danger  pb-2   '>{errors.contactEmail?.message}</div>
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-12'>
						<button type='submit' ref={btnRef} className='btn btn-primary btn-lg float-right'>
							{isEdit ? 'Update' : 'Save'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default HealthSystemForm;
