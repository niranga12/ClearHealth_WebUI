/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { MaskFormat, PartyTypeEnum, Provider, ServiceMsg, ValidationPatterns } from 'src/reusable/enum';
import { useHistory, useLocation } from 'react-router-dom';
import OnError from 'src/_helpers/onerror';
import { notify } from 'reapop';
import { saveProvider, updateProviderByPartyRoleId } from 'src/service/providerService';
import { getHospitalsList } from 'src/service/hospitalsService';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import NormalizePhone from 'src/reusable/NormalizePhone';
import InputMask from 'react-input-mask';
import FormatText from 'src/reusable/FormatText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { EnableMaskPhone } from 'src/reusable';
import ProviderEditFeeSchedules from './FeeSchedules/ProviderEditFeeSchedules';
import ProviderAddFeeSchedules from './FeeSchedules/ProviderAddFeeSchedules';

const schema = yup.object().shape({
	healthSystemPartyRoleId: yup.string().required('Health system is required'),
	hospitalName: yup.string().required('Hospital name is required'),
	providerGroup: yup.string(),
	providerTypeId: yup.string(),
	// firstName: yup.string(),
	// middleName: yup.string(),
	// lastName: yup.string(),
	address1: yup.string().required('Address line1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	billingAddress1: yup.string().required('Billing Address line 1 is required'),
	billingAddress2: yup.string(),
	billingCity: yup.string().required('City is required'),
	billingState: yup.string().required('State is required'),
	billingZip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	// phone: yup.string().required('Phone is required').matches(ValidationPatterns.phoneRegExp, 'Phone number is not valid'),
	phone: yup.string()
		.required('Phone is required')
		.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
	email: yup.string().required('Email is required').email('Email must be a valid email'),
	speciality: yup.string().required('Specialty is required'),
	taxId: yup.string(),
	nip: yup.string().required('NPI is required'),
	// bankName: yup.string(),
	// accountNumber: yup.string(),
	// routing: yup.string()
});

const ProviderForm = ({ defaultValues, isEdit = false, partyRoleId = null, healthSystemList = [], specialityData = [], stateList = [] }) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema), mode: 'all' });

	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const { dirtyFields } = useFormState({ control });
	const [hospitalData, setHospitalData] = useState([]);
	const [hsHospitalData, sethsHospitalData] = useState([]);
	const [stateOption, setStateOption] = React.useState(defaultValues.state);
	const [billingStateOption, setBillingStateOption] = React.useState(defaultValues.billingState);
	const dispatch = useDispatch();
	let history = useHistory();
	const location = useLocation();

	const [tabId, setTabId] = useState(null);
	const [hospitalName, setHospitalName] = useState(null);
	const [hospitalId, setHospitalId] = useState(null);
	const [showResults, setShowResults] = useState(true);
	const [showRadioButton, setShowRadioButton] = useState(true);
	const [showFirstNameError, setShowFirstNameError] = useState(false);
	const [showLastNameError, setShowLastNameError] = useState(false);
	const [showGroupNameError, setShowGroupNameError] = useState(false);
	const [groupSelection, setGroupSelection] = useState("Individual");
	const [isFeeSchedule, setFeeSchedule] = useState(false);

	const [saveProviderId, setSaveProviderId] = useState(null)

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
			setBillingStateOption(getValues('state'));
		} else {
			setValue('billingAddress1', '');
			setValue('billingAddress2', '');
			setValue('billingCity', '');
			setValue('billingState', '');
			setValue('billingZip', '');
			setBillingStateOption('');
		}
	};

	useEffect(() => {
		reset(defaultValues);
		setStateOption(defaultValues.state); //set state dropdown value
		setBillingStateOption(defaultValues.billingState);

		const params = new URLSearchParams(location.search);
		const tap = params.get('tap');
		const hosName = params.get('hospitalName');
		const hosId = params.get('hospitalId');

		setTabId(tap);
		setHospitalName(hosName)
		setHospitalId(hosId)

	}, [defaultValues, location]);


	useEffect(() => {
		const fetchData = async () => {
			try {

				const hospitalList = await getHospitalsList();
				setHospitalData(hospitalList.data.data);
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, []);


	useEffect(() => {
		const fetchData = async () => {


			if (isEdit || defaultValues.healthSystemPartyRoleId) {
				if (defaultValues.providerTypeId == Provider.Provider) {
					setGroupSelection('Individual')
					setShowResults(true);
				} else if (defaultValues.providerTypeId == Provider.GroupProvider) {
					setGroupSelection('Group');
					setShowResults(false);
				}
				//setShowRadioButton(false);
				// defaultValuese
				const hospitalList = await getHospitalsList();

				let result = hospitalList.data.data.filter(x => x.healthSystemPartyRoleId == defaultValues.healthSystemPartyRoleId);

				sethsHospitalData(result);

				setValue('hospitalName', defaultValues.hospitalName, {
					shouldValidate: false,
					shouldDirty: true,
				});

			}
		};
		fetchData();

	}, [isEdit, defaultValues])


	const handleHealthSystemChange = (e) => {
		//e.prevent.default()
		let result = hospitalData.filter(x => x.healthSystemPartyRoleId == e.target.value);
		sethsHospitalData(result);
		setValue('healthSystemPartyRoleId', e.target.value, {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue('hospitalName', '', {
			shouldValidate: false,
			shouldDirty: true,
		});
	}

	const handleHospitalChecked = (event) => {
		if (event.target.checked) {
			let result = hsHospitalData.find(x => x.partyRoleId == getValues('hospitalName'));
			setValue('address1', result.primaryAddress1, {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('address2', result.primaryAddress2, {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('city', result.primaryCity, {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('state', result.primaryState, {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('zip', result.primaryZip, {
				shouldValidate: true,
				shouldDirty: true,
			});
			setStateOption(getValues('state'));
		} else {
			setValue('address1', '');
			setValue('address2', '');
			setValue('city', '');
			setValue('state', '');
			setValue('zip', '');
			setStateOption('');
		}
	}

	const handleIndividualGroup = (event) => {

		setGroupSelection(event.target.value)
		if (event.target.value == 'Group') {
			setShowResults(false);
			setValue('firstName', getValues('firstName'), {
				shouldValidate: false,
				shouldDirty: true,
			});
			setValue('middleName', getValues('middleName'), {
				shouldValidate: false,
				shouldDirty: true,
			});
			setValue('lastName', getValues('lastName'), {
				shouldValidate: false,
				shouldDirty: true,
			});
			setValue('taxId', getValues('taxId'), {
				shouldValidate: false,
				shouldDirty: true,
			});
			setValue('providerGroup', getValues('providerGroup'), {
				shouldValidate: true,
				shouldDirty: true,
			});


		} else {
			setShowResults(true);
			setValue('firstName', getValues('firstName'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('middleName', getValues('middleName'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('lastName', getValues('lastName'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('providerGroup', getValues('providerGroup'), {
				shouldValidate: false,
				shouldDirty: true,
			});
			setValue('nip', getValues('nip'), {
				shouldValidate: false,
				shouldDirty: true,
			});
			setShowResults(true);
		}

	}

	// form submit
	const providerFormSubmit = (data) => {
		if (isEdit) {
			updateProviderInfo();
		} else {
			addProvider(data);
		}
	};

	// save Provider
	const addProvider = async (data) => {
		setShowFirstNameError(false);
		setShowLastNameError(false);
		setShowGroupNameError(false)
		let isFirstName = false;
		let isLastName = false;
		let isGroupName = false;
		// provider type ID can be 7 OR 13

		if (groupSelection == "Individual") {
			if (data.firstName == "") {
				setShowFirstNameError(true);
				isFirstName = true;
			} else if (data.lastName == "") {
				setShowLastNameError(true);
				isLastName = true
			} else {
				setShowFirstNameError(false);
				setShowLastNameError(false);
				isFirstName = false;
				isLastName = false;
			}

		} else {
			
			if (data.providerGroup == "") {
				setShowGroupNameError(true);
				isGroupName = true;
			} else {
				setShowGroupNameError(false);
				isGroupName = false;
			}

		}
		const newProvider = {
			provider: {
				email: data.email,
				hospitalList: data.hospitalName,
				speciality: data.speciality,
				...(groupSelection == "Individual" && { firstName: data.firstName }),
				...(groupSelection == "Individual" && { middleName: data.middleName }),
				...(groupSelection == "Individual" && { lastName: data.lastName }),
				...(groupSelection == "Individual" && { providerTypeId: Provider.Provider }),
				...(groupSelection == "Group" && { providerGroup: data.providerGroup }),
				...(groupSelection == "Group" && { providerTypeId: Provider.GroupProvider }),
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
				number: NormalizePhone(data.phone),
			},
			paymentInfo: {
				NPI: data.nip,
				taxId: data.taxId,
				// bankName: data.bankName,
				// routing: data.routing,
				// accountNumber: data.accountNumber,

			},
		};
		try {
			if (!isFirstName && !isLastName && showResults) {
				saveProviders(newProvider)
				
			} else if (!isGroupName && !showResults) {
				saveProviders(newProvider)
			}



		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const onOpenFeeSchedule = (result) => {
		//setHospitalId(result)
		setFeeSchedule(true);

	}

	const saveProviders = async (newProvider) => {

		try {
			if (newProvider) {
				let result = await saveProvider(newProvider);
				if (result.data.message === ServiceMsg.OK) {
				
					dispatch(notify(`Successfully added`, 'success'))
					onOpenFeeSchedule(result.data.data);
					setSaveProviderId(result.data.data);
					// for redirecting parent page
					// if (tabId && hospitalId) {
					// 	history.push({
					// 		pathname: `/hospitals/hospital`,
					// 		search: `?id=${hospitalId}&name=${hospitalName}&tap=${tabId}`,
					// 	});
					// } else {
					// 	history.push('/providers');
					// }

				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}

	};


	const stateSelect = (event) => {
		setValue('state', event.target.innerText, { shouldValidate: true, shouldDirty: true, });
	};

	const billingStateSelect = (event) => {
		setValue('billingState', event.target.innerText, { shouldValidate: true, shouldDirty: true, });
	};

	// update Provider
	const updateProviderInfo = async () => {

		try {


			const updateProvider = {
				...((dirtyFields.firstName || dirtyFields.middleName || dirtyFields.lastName || dirtyFields.hospitalName || dirtyFields.speciality || dirtyFields.email || dirtyFields.providerGroup) && {
					provider: {
						providerTypeId: Provider.Provider,
						email: getValues('email'),
						hospitalList: getValues('hospitalName'),
						speciality: getValues('speciality'),
						...(groupSelection == "Individual" && { firstName: getValues('firstName') }),
						...(groupSelection == "Individual" && { middleName: getValues('middleName') }),
						...(groupSelection == "Individual" && { lastName: getValues('lastName') }),
						...(groupSelection == "Group" && { providerGroup: getValues('providerGroup') }),
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
						number: NormalizePhone(getValues('phone')),
					},
				}),

				...((dirtyFields.taxId || dirtyFields.nip || dirtyFields.bankName || dirtyFields.routing || dirtyFields.accountNumber) && {
					paymentInfo: {

						taxId: getValues('taxId'),
						NPI: getValues('nip'),
						// bankName: getValues('bankName'),
						// routing: getValues('routing'),
						// accountNumber: getValues('accountNumber'),

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
						// history.push('/providers');
						// for redirecting parent page
						if (tabId && hospitalId) {
							history.push({
								pathname: `/hospitals/hospital`,
								search: `?id=${hospitalId}&name=${hospitalName}&tap=${tabId}`,

							});
						} else {
							history.push('/providers');
						}
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

				<div className='row mb-3'>


					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Health System <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<select  {...register('healthSystemPartyRoleId')} onChange={e => handleHealthSystemChange(e)} name='healthSystemPartyRoleId' id='healthSystemPartyRoleId' className='form-control-sm'  >
								<option value=''>Select</option>
								{healthSystemList.map((item, index) => (
									<option key={index} value={item.partyRoleId}>
										{item.name}
									</option>
								))}
							</select>
							<div className='small text-danger  pb-2'>{errors.healthSystemPartyRoleId?.message}</div>
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Hospital<span className='text-danger font-weight-bold '>*</span>{' '}
							</label>

							<select name='hospitalName' id='hospitalName' className='form-control-sm' {...register('hospitalName')}>
								<option value=''>Select</option>
								{hsHospitalData.map((item, index) => (
									<option key={index} value={item.partyRoleId}>
										{item.name}
									</option>
								))}
							</select>
							<div className='small text-danger  pb-2   '>{errors.hospitalName?.message}</div>
						</div>
					</div>
				</div>

				{showRadioButton ? <div className='row mb-3'>
					<div className='col-md-4'>
						<div className='mt-1 ml-4'>
							<input type='radio' checked={groupSelection === "Individual"} value="Individual" name="IndividualGroup" className='form-check-input mr-3' onChange={handleIndividualGroup} /> <span className='ml-3 mr-5'>Individual</span>{' '}
							<input type='radio' checked={groupSelection === "Group"} value="Group" name="IndividualGroup" className='form-check-input mr-3' onChange={handleIndividualGroup} /> <span className='ml-3 mr-3'>Group </span>{' '}
						</div>
					</div>
				</div> : ''}







				{showResults ? <div className='row mb-3'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								First Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('firstName')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							{showFirstNameError ? <div className='small text-danger  pb-2   '>First name is required</div> : ''}
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Middle Name <span className='text-danger font-weight-bold '></span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('middleName')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							{/* <div className='small text-danger  pb-2   '>{errors.middleName?.message}</div> */}
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Last Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('lastName')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							{showLastNameError ? <div className='small text-danger  pb-2   '>Last name is required</div> : ''}
						</div>
					</div>
				</div> : <div className='row mb-3'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Group Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('providerGroup')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							{showGroupNameError ? <div className='small text-danger  pb-2   '>Group name is required</div> : ''}
						</div>
					</div>
				</div>}

				<div className='row mb-3'>
					{/* address */}
					<div className='col-md-4'>

						<h5 className='font-weight-bold mt-1'>
							<span className='pr-5'>Address </span> <input type='checkbox' className='form-check-input' onChange={handleHospitalChecked} /> <span className='small'>Use Hospital Address</span>{' '}
						</h5>
						{/* <h5 className='font-weight-bold mt-1'>Address </h5> */}
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>
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
					</div>



					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>
							<span className='pr-5'>Billing Address </span> <input type='checkbox' className='form-check-input' onChange={handleBillingChecked} /> <span className='small'>Same As Address</span>{' '}
						</h5>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('billingAddress1')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.billingAddress1?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>Address Line 2 </label>
							<input type='text' className='form-control-sm' {...register('billingAddress2')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
						</div>

						<div className='row'>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									City <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('billingCity')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
								<div className='small text-danger  pb-2   '>{errors.billingCity?.message}</div>
							</div>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									State <span className='text-danger font-weight-bold '>*</span>
								</label>
								<Autocomplete
									id='combo-box-demo'
									options={stateList}
									//   value={stateOption}
									inputValue={billingStateOption}
									onInputChange={(event, newInputValue) => {
										setBillingStateOption(newInputValue);
									}}
									getOptionLabel={(option) => option.stateName}
									onChange={billingStateSelect}
									renderInput={(params) => <TextField {...params} {...register('billingState')} className='control-autocomplete' variant='outlined' />}
								/>
								<div className='small text-danger  pb-2   '>{errors.billingState?.message}</div>
							</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Zip <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('billingZip')} />
							<div className='small text-danger  pb-2   '>{errors.billingZip?.message}</div>
						</div>
					</div>

					{/* Patient Access Contact */}
					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>More info</h5>
						<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<InputMask {...register('phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={EnableMaskPhone(isEdit, getValues('phone'))} className='form-control-sm' />
							<div className='small text-danger  pb-2'>{errors.phone?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Email <span className='text-danger font-weight-bold '></span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('email')} />
							<div className='small text-danger  pb-2   '> {errors.email?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Specialty <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<select name='' id='' className='form-control-sm' {...register('speciality')}>
								<option value=''>Select</option>
								{specialityData.map((item, index) => (
									<option key={index} value={item.ID}>
										{item.speciality}
									</option>
								))}

							</select>
							<div className='small text-danger  pb-2   '> {errors.speciality?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Tax Id <span className='text-danger font-weight-bold '>{showResults ? '' : '*'}</span>
							</label>
							<input type='text' className='form-control-sm' {...register('taxId')} />
							<div className='small text-danger  pb-2   '> {errors.taxId?.message} </div>
						</div>



						<div className='form-group'>
							<label className='form-text'>
								NPI <span className='text-danger font-weight-bold '>{showResults ? '*' : ''}</span>
							</label>
							<input type='text' className='form-control-sm' {...register('nip')} />
							<div className='small text-danger  pb-2   '>{errors.nip?.message}</div>
						</div>
					</div>
				</div>

				{/* payment info */}
				{/* <h5 className='font-weight-bold mt-1'>Payment Info </h5> */}

				{/* <div className='row'> */}


				{/* secound details */}
				{/* <div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Bank Name <span className='text-danger font-weight-bold '></span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('bankName')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '> {errors.bankName?.message} </div>
						</div>



						<div className='form-group'>
							<label className='form-text'>
								Account<span className='text-danger font-weight-bold '></span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('accountNumber')} />
							<div className='small text-danger  pb-2   '> {errors.accountNumber?.message} </div>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								Routing<span className='text-danger font-weight-bold '></span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('routing')} />
							<div className='small text-danger  pb-2   '> {errors.routing?.message} </div>
						</div>
					</div> */}


				{/* </div> */}

				{partyRoleId != null && <ProviderEditFeeSchedules edit={isEdit} partyRoleId={partyRoleId} />}
				
				{isFeeSchedule==true && <ProviderAddFeeSchedules edit={isEdit} partyRoleId={saveProviderId} isFeeSchedule={isFeeSchedule}  hosId={hospitalId} hosName={hospitalName} tabId={tabId}/>}
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
