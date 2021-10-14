/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Country} from 'src/reusable/enum';
import {getStateList} from 'src/service/commonService';
import {getPatientByPartyRoleId} from 'src/service/patientService';
import {useDispatch} from 'react-redux';
import AdminTitle from 'src/views/common/adminTitle';
import PatientForm from './PatientForm';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import MetaTitles from 'src/views/common/metaTitles';
import Goback from 'src/views/common/Goback';

const defalutFormValue = {
	firstName: '',
	lastName: '',
	email: '',
	dateOfBirth: '',
	address1: '',
	address2: '',
	city: '',
	state: '',
	zip: '',
	phone: '',
};

const PatientProfile = () => {
	const location = useLocation();
	const [partyRoleId, setPartyRoleId] = useState(null);
	const [editProfile, setEditProfile] = useState(false);
	const [stateList, setstateList] = useState([]);
	const [patientData, setPatientData] = useState(defalutFormValue);
	const dispatch = useDispatch();
	//if this a edit form get the data
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setPartyRoleId(id);
		id ? setEditProfile(true) : setEditProfile(false);

		const fetchData = async () => {
			dispatch(loaderShow());
			const stateResult = await getStateList(Country.USA);
			setstateList(stateResult.data.data);
			if (id) {
				try {
					const result = await getPatientByPartyRoleId(id);
					const formatedData = await updateFormFields(result.data.data);
					setPatientData(formatedData);
				} catch (error) {}
			}
			dispatch(loaderHide());
		};
		fetchData();
	}, [location]);

	//updated form fields
	const updateFormFields = (data) => {
		const patientDetails = {
			firstName: data.firstName,
			lastName: data.lastName,
			dateOfBirth: data.dateOfBirth,
			email: data.email,
			address1: data.address1,
			address2: data.address2,
			city: data.city,
			state: data.state,
			zip: data.zip,
			phone: data.phone,
		};

		return patientDetails;
	};

	return (
		<>
			<Goback />

			<div className='card  cover-content pt-2 '>
				{/* for addeing page metas  */}
				<MetaTitles title='Clear Health | Patients Profile' description=' add update Patients  ' />
				<AdminTitle title={editProfile ? 'Edit Patient' : 'Add Patient'} />

				<PatientForm defaultValues={patientData} isEdit={editProfile} partyRoleId={partyRoleId} stateList={stateList} />
			</div>
		</>
	);
};

export default PatientProfile;
