import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProviderByPartyRoleId } from 'src/service/providerService';
import AdminTitle from 'src/views/common/adminTitle';
import PatientForm from './PatientForm';


const defalutFormValue = {
	hospitalName: '',
	healthSystemPartyRoleId: '',
	firstName: '',
	middleName: '',
	lastName: '',
	address1: '',
	address2: '',
	city: '',
	state: '',
	zip: '',
	billingAddress1: '',
	billingAddress2: '',
	billingCity: '',
	billingState: '',
	billingZip: '',
	phone: '',
	speciality: '',
	taxId: '',
	nip: '',
	bankName: '',
	accountNumber: '',
	routing: '',
};

const ProviderProfile = () => {
	const location = useLocation();
	const [partyRoleId, setPartyRoleId] = useState(null);
	const [editProfile, setEditProfile] = useState(false);

	const [providerData, setProviderData] = useState(defalutFormValue);

	//if this a edit form get the data
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setPartyRoleId(id);
		id ? setEditProfile(true) : setEditProfile(false);

		const fetchData = async () => {
			if (id) {
				try {
					const result = await getProviderByPartyRoleId(id);
					const formatedData = await updateFormFields(result.data.data);
					setProviderData(formatedData);
				} catch (error) { }
			}
		};
		fetchData();
	}, [location]);

	//updated form fields
	const updateFormFields = (data) => {
		const providerDetails = {
			hospitalName: '',
			healthSystemPartyRoleId: '',
			firstName: data.firstName,
			middleName: data.middleName,
			lastName: data.lastName,
			address1: data.primaryAddress1,
			address2:data.primaryAddress2,
			city: data.primaryCity,
			state: data.primaryState,
			zip: data.primaryZip,
			billingAddress1: data.secondaryAddress1,
			billingAddress2:data.secondaryAddress2,
			billingCity: data.secondaryCity,
			billingState: data.secondaryState,
			billingZip: data.secondaryZip,
			phone: data.phone,
			speciality:data.speciality,
			taxId: data.taxId,
			nip: data.NIP,
			bankName: data.bankName,
			accountNumber: data.accountNumber,
			routing: data.routing
		};


		return providerDetails;

	};

	return (
		<div className="card  cover-content pt-2 ">
			<AdminTitle title={editProfile ? 'Edit Provider' : 'Add Provider'} />

			<PatientForm defaultValues={providerData} isEdit={editProfile} partyRoleId={partyRoleId} />
		</div>
	);
};

export default ProviderProfile;
