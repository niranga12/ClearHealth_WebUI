import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminTitle from 'src/views/common/adminTitle';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import UserForm from './UserForm';


const defalutFormValue = {
	firstName: '',
	lastName: '',
	roleType: '',
	status: '',
	email: '',

};

const UserProfile = () => {
	const location = useLocation();
	const [partyRoleId, setPartyRoleId] = useState(null);
	const [editProfile, setEditProfile] = useState(false);
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
			if (id) {
				try {
					// const result = await getPatientByPartyRoleId(id);
					// const formatedData = await updateFormFields(result.data.data);
					// setUserData(formatedData);
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
			roleType: data.roleType,
			status: data.status,
			email: data.email

		};


		return userDetails;

	};

	return (
		<div className="card  cover-content pt-2 ">
			<AdminTitle title={editProfile ? 'Edit User' : 'Add User'} />

			<UserForm defaultValues={userData} isEdit={editProfile} partyRoleId={partyRoleId} />
		</div>
	);
};

export default UserProfile;
