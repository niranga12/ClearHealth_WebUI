/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {ActiveList, RoleType, ServiceMsg} from 'src/reusable/enum';
import {useHistory} from 'react-router-dom';
import OnError from 'src/_helpers/onerror';
import {notify} from 'reapop';
import {saveUser, updateUserByPartyRoleId} from 'src/service/userService';
import {getSpecificRoleList} from 'src/service/commonService';
import FormatText from 'src/reusable/FormatText';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import Select from 'react-select';
import {getHealthSystemList} from 'src/service/healthsystemService';
import {getHospitalsList} from 'src/service/hospitalsService';

const initialSearch = {
	itemsPerPage: '',
	pageNumber: '',
	searchTerm: '',
	sortOrder: 'desc',
	orderBy: 'id',
};

const schema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	roleTypeId: yup.string().required('Role type is required'),
	status: yup.string().required('Status is required'),
	email: yup.string().required('Email is required').email('Email must be a valid email'),
});

const UserForm = ({defaultValues, isEdit = false, partyRoleId = null}) => {
	const {
		register,
		handleSubmit,

		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const {dirtyFields} = useFormState({control});
	const dispatch = useDispatch();
	let history = useHistory();
	const [roleTypeDta, setRoleTpeData] = useState([]);

	const [isHealthSystem, setHealthSystem] = useState(false);
	const [isHospital, setHospital] = useState(false);

	const [healthSystemList, setHealthSystemList] = useState([]);
	const [selectedHealthSystem, setselectedHealthSystem] = useState(null);
	const [selectedHospital, setSelectedHospital] = useState(null);

	const [hospitalList, sethospitalList] = useState(null);

	const [defaultHospital, setDefaultHospital] = useState(null);
	const [defaultHealth, setDefaultlHealth] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const healthSystems = await getHealthSystemList(initialSearch);
				setHealthSystemList(healthSystems.data.data);

				const RoleTypeList = await getSpecificRoleList();
				setRoleTpeData(RoleTypeList.data.data);
				reset(defaultValues);
				setDefaultHospital(defaultValues.hospitalList);
				setDefaultlHealth(defaultValues.healthSystemList);

			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, [defaultValues]);

	useEffect(() => {
		const fetchData = async () => {
			if (selectedHealthSystem?.length > 0) {
				try {
					const searchQuery = {healthSystemPartyRoleId: selectedHealthSystem};
					const result = await getHospitalsList(searchQuery);
					sethospitalList(result.data.data);
				} catch (error) {}
			}
		};
		fetchData();
	}, [selectedHealthSystem]);

	// role type selection
	const roleTypeChange = (e) => {
		switch (Number(e.target.value)) {
			case RoleType.HealthSystemAdmin:
				setHealthSystem(true);
				setHospital(false);

				break;
			case RoleType.HospitalAdmin:
				setHealthSystem(true);
				setHospital(true);
				break;
			case RoleType.HospitalStaff:
				setHealthSystem(true);
				setHospital(true);
				break;
			default:
				setHealthSystem(false);
				setHospital(false);
				break;
		}
	};

	// health sytem change
	const handleHealthSystemChange = (newValue: any, actionMeta: any) => {
		let selHealthSys = [];
		newValue.forEach((x) => {
			selHealthSys.push(Number(x.partyRoleId));
		});
		setselectedHealthSystem(selHealthSys);
		// console.log(selHealthSys);
	};

	const handleHospitalChange = (newValue: any, actionMeta: any) => {
		// console.log(newValue);
		let setHospitalVal = [];
		newValue.forEach((x) => {
			setHospitalVal.push(Number(x.partyRoleId));
		});
		setSelectedHospital(setHospitalVal);
	};

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
		dispatch(loaderShow());
		const newUser = {
			firstName: data.firstName,
			lastName: data.lastName,
			roleTypeId: data.roleTypeId,
			status: data.status,
			email: data.email,
			hospitalList: selectedHealthSystem,
			healthSystemList: selectedHospital,
		};

		try {
			if (newUser) {
				let result = await saveUser(newUser);
				if (result.data.message === ServiceMsg.OK) {
					dispatch(loaderHide());
					dispatch(notify(`Successfully added`, 'success'));
					history.push('/users');
				}
			}
		} catch (error) {
			dispatch(loaderHide());
			OnError(error, dispatch);
		}
	};

	// update User
	const updateUserInfo = async () => {
		try {
			dispatch(loaderShow());
			const updateUser = {
				...((dirtyFields.firstName || dirtyFields.lastName || dirtyFields.roleTypeId || dirtyFields.status || dirtyFields.email) && {
					firstName: getValues('firstName'),
					lastName: getValues('lastName'),
					roleTypeId: getValues('roleTypeId'),
					status: getValues('status'),
					email: getValues('email'),
					hospitalList: selectedHealthSystem,
					healthSystemList: selectedHospital,
				}),
			};
			if (Object.keys(updateUser).length == 0) {
				dispatch(notify(`No record to update`, 'error'));
			} else {
				try {
					const result = await updateUserByPartyRoleId(partyRoleId, updateUser);
					if (result.data.message == ServiceMsg.OK) {
						dispatch(loaderHide());
						dispatch(notify(`Successfully updated`, 'success'));
						history.push('/users');
					}
				} catch (error) {
					OnError(error, dispatch);
					dispatch(loaderHide());
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
				<div className='row mb-2'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								First Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('firstName')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.firstName?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Last Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('lastName')} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.lastName?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								Role Type <span className='text-danger font-weight-bold '>*</span>
							</label>
							<select name='roleTypeId' id='roleTypeId' className='form-control-sm' {...register('roleTypeId')} onChange={roleTypeChange}>
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

				<div className='row mb-2'>
					{isHealthSystem && (
						<div className='col-md-4'>
							<div className='form-group'>
								<label className='form-text'>
									Health System <span className='text-danger font-weight-bold '>*</span>
								</label>
								<Select options={healthSystemList} defaultValue={defaultHealth}  closeMenuOnSelect={false} onChange={handleHealthSystemChange} isMulti getOptionLabel={(option) => `${option.name}`} getOptionValue={(option) => `${option.partyRoleId}`} />
							</div>
						</div>
					)}

					{isHospital && (
						<div className='col-md-4'>
							<div className='form-group'>
								<label className='form-text'>
									Hospital <span className='text-danger font-weight-bold '>*</span>
								</label>
								<Select options={hospitalList} defaultValue={defaultHospital}  closeMenuOnSelect={false} onChange={handleHospitalChange} isMulti getOptionLabel={(option) => `${option.name}`} getOptionValue={(option) => `${option.partyRoleId}`} />
							</div>
						</div>
					)}

					<div className='col-md-4'>
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

					<div className='col-md-4'>
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
