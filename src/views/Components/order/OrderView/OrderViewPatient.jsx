import React, {useEffect, useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import InputMask from 'react-input-mask';
import moment from 'moment';
import {EnableMaskPhone} from 'src/reusable';
import {MaskFormat, ServiceMsg} from 'src/reusable/enum';
import DateSelector from 'src/views/common/dateSelector';
import NormalizePhone from 'src/reusable/NormalizePhone';
import {updatePatientByPartyRoleId} from 'src/service/patientService';
import OnError from 'src/_helpers/onerror';
import {useDispatch} from 'react-redux';
import {notify} from 'reapop';

const schema = yup.object().shape({
	patientForm: yup.object().shape({
		firstName: yup.string(),
		middleName: yup.string(),
		lastName: yup.string().required(),
		phoneNumber: yup.string(),
		email: yup.string(),
		DOB: yup.string(),
		// enhancementOn:yup.string().required()
	}),
});

const OrderViewPatient = ({patientDetail}) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,

		formState,
		// formState: {errors},
	} = useForm({resolver: yupResolver(schema), mode: 'all'});

	const [isEdit, setisEdit] = useState(false);
	const [patient, setPatient] = useState(patientDetail);
	const [fromDate, handlefromDateChange] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		setPatient(patientDetail);
		handlefromDateChange(patientDetail?.DOB);
	}, [patientDetail]);

	useEffect(() => {
		if (isEdit) {
			let detail = {patientForm: {...patient}};
			reset(detail);
		}
	}, [isEdit]);

	const update = async () => {
		let updateDetail = getValues('patientForm');
		let data = {
			patient: {
				firstName: updateDetail.firstName,
				middleName: updateDetail?.middleName,
				lastName: updateDetail.lastName,
				email: updateDetail.email,
				dateOfBirth: moment(fromDate).format('MM-DD-YYYY'),
				phone: NormalizePhone(updateDetail.phoneNumber),
			},
		};
		

		try {
			let result = await updatePatientByPartyRoleId(patient.patientPartyRoleID, data);
			if (result.data.message == ServiceMsg.OK) {
				dispatch(notify(`Successfully updated`, 'success'));
				let newData = {...patient, firstName: updateDetail.firstName, middleName: updateDetail?.middleName, lastName: updateDetail.lastName, email: updateDetail.email, DOB: moment(fromDate).format('MM-DD-YYYY'), phoneNumber: NormalizePhone(updateDetail.phoneNumber)};
				setPatient(newData);
				setisEdit(false);
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const editButton = () => {
		return (
			<button className='btn btn-primary float-right ml-3 text-white' onClick={() => setisEdit(true)}>
				{' '}
				<span className='fa fa-x fa-pencil pr-2'></span> <span>Edit Details</span>
			</button>
		);
	};

	const saveButton = () => {
		return (
			<>
				<button className='btn btn-primary float-right ml-3 text-white' onClick={() => update()}>
					{' '}
					<span className='fa fa-x fa-save pr-2'></span> <span>Update </span>
				</button>
				<button className='btn btn-secondary float-right ml-3 ' onClick={() => setisEdit(false)}>
					{' '}
					<span className='fa fa-x fa-close pr-2'></span> <span>Cancel </span>
				</button>
			</>
		);
	};

	return (
		<div className='card  cover-content pt-2 '>
			<div className='card-header'>
				<div className='row'>
					<div className='col-md-6 component-header '> Patient Information </div>
					<div className='col-md-6'>{isEdit ? saveButton() : editButton()}</div>
				</div>
			</div>
			<div className='card-body pb-0'>
				<div className='row'>
					{/*First Name */}
					<div className='col-md-2'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								First Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							{isEdit ? <input className='form-control-sm' type='text' {...register('patientForm.firstName')} /> : <div className='h5'>{patient?.firstName}</div>}
						</div>
					</div>

					{/*Middle Name */}
					<div className='col-md-2'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Middle Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							{isEdit ? <input className='form-control-sm' type='text' {...register('patientForm.middleName')} /> : <div className='h5'>{patient?.middleName} </div>}
						</div>
					</div>

					{/*Last Name */}
					<div className='col-md-2'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Last Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							{isEdit ? <input className='form-control-sm' type='text' {...register('patientForm.lastName')} /> : <div className='h5'> {patient?.lastName}</div>}
						</div>
					</div>

					{/* Date Of Birth */}

					<div className='col-md-2'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Date Of Birth <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							{isEdit ? <DateSelector className='form-control-sm' selectedDate={fromDate} handleDateChange={handlefromDateChange} disableFuture={true} /> : <div className='h5'> {patient?.DOB}</div>}
						</div>
					</div>

					{/* Email*/}
					<div className='col-md-2'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Email <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							{isEdit ? <input className='form-control-sm' type='text' {...register('patientForm.email')} /> : <div className='h5'>{patient?.email}</div>}
						</div>
					</div>
					{/* Phone*/}
					<div className='col-md-2'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Phone <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							{isEdit ? <InputMask {...register('patientForm.phoneNumber')} mask={MaskFormat.phoneNumber} alwaysShowMask={EnableMaskPhone(isEdit, getValues('patientForm.phoneNumber'))} className='form-control-sm' /> : <div className='h5'>{patient?.phoneNumber}</div>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

OrderViewPatient.propTypes = {
	patientDetail: PropTypes.any,
};

export default OrderViewPatient;
