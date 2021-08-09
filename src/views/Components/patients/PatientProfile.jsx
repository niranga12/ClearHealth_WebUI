import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPatientByPartyRoleId } from 'src/service/patientService';

import AdminTitle from 'src/views/common/adminTitle';
import PatientForm from './PatientForm';


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

	const [patientData, setPatientData] = useState(defalutFormValue);

	//if this a edit form get the data
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setPartyRoleId(id);
		id ? setEditProfile(true) : setEditProfile(false);

		const fetchData = async () => {
			if (id) {
				try {
					const result = await getPatientByPartyRoleId(id);
					const formatedData = await updateFormFields(result.data.data);
					setPatientData(formatedData);
				} catch (error) { }
			}
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
			address2:data.address2,
			city: data.city,
			state: data.state,
			zip: data.zip,
			phone: data.phone,
			
		};


		return patientDetails;

	};

	return (
		<div className="card  cover-content pt-2 ">
			<AdminTitle title={editProfile ? 'Edit Patient' : 'Add Patient'} />

			<PatientForm defaultValues={patientData} isEdit={editProfile} partyRoleId={partyRoleId} />
		</div>
	);
};

export default PatientProfile;