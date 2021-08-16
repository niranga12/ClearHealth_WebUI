import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Country } from 'src/reusable/enum';
import { getStateList } from 'src/service/commonService';
import { getPatientByPartyRoleId } from 'src/service/patientService';
import { useDispatch } from 'react-redux';
import AdminTitle from 'src/views/common/adminTitle';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import UserForm from './UserForm';


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

const UserProfile = () => {
	const location = useLocation();
	const [partyRoleId, setPartyRoleId] = useState(null);
	const [editProfile, setEditProfile] = useState(false);
	const [stateList, setstateList] = useState([])
	const [userData, setUserData] = useState(defalutFormValue);
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
			setstateList(stateResult.data.data)
			if (id) {
				try {
					const result = await getPatientByPartyRoleId(id);
					const formatedData = await updateFormFields(result.data.data);
					setUserData(formatedData);
				} catch (error) { }
			}
			dispatch(loaderHide());
		};
		fetchData();
	}, [location]);

	//updated form fields
	const updateFormFields = (data) => {
		const userDetails = {
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


		return userDetails;

	};

	return (
		<div className="card  cover-content pt-2 ">
			<AdminTitle title={editProfile ? 'Edit Patient' : 'Add Patient'} />

			<UserForm defaultValues={userData} isEdit={editProfile} partyRoleId={partyRoleId} stateList={stateList} />
		</div>
	);
};

export default UserProfile;
