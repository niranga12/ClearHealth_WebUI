import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {Country} from 'src/reusable/enum';
import {getStateList} from 'src/service/commonService';
// import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater';
import {getHealthSystemByPartyRoleId} from 'src/service/healthsystemService';
import AdminTitle from 'src/views/common/adminTitle';
import OnError from 'src/_helpers/onerror';
import HealthSystemForm from './healthSystemForm';

const defaultFormvalue = {
	name: '',
	address1: '',
	address2: '',
	city: '',
	state: '',
	zip: '',
	phone: '',
	shippingAddress1: '',
	shippingAddress2: '',
	shippingCity: '',
	shippingState: '',
	shippingZip: '',
	contactName: '',
	contactPhone: '',
	contactEmail: '',
};

const HealthSystemProfile = () => {
	// let { id } = useParams();
	const location = useLocation();
	const [partyRoleId, setPartyRoleId] = useState(null);
	const [editProfile, setEditProfile] = useState(false);
	const dispatch = useDispatch();

	const [stateList, setstateList] = useState([]);

	const [healthSystemData, setHealthSystemData] = useState(defaultFormvalue);
	//if this a edit form get the data
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setPartyRoleId(id);
		id ? setEditProfile(true) : setEditProfile(false);

		const fetchData = async () => {
			try {
				const stateResult = await getStateList(Country.USA);
				setstateList(stateResult.data.data);
			} catch (error) {
				OnError(error, dispatch);
			}

			if (id) {
				try {
					dispatch(loaderShow());
					const result = await getHealthSystemByPartyRoleId(id);
					const formatedData = await updateFormFields(result.data.data);

					setHealthSystemData(formatedData);
					dispatch(loaderHide());
				} catch (error) {
					OnError(error, dispatch);
				}
			}
		};

		fetchData();
	}, [location]);

	const updateFormFields = (data) => {
		
		const healthData = {
			name: data.name,
			address1: data.primaryAddress1,
			address2: data.primaryAddress2,
			city: data.primaryCity,
			state: data.primaryState,
			zip: data.primaryZip,
			phone: data.phoneNumber,
			shippingAddress1: data.secondaryAddress1,
			shippingAddress2: data.secondaryAddress2,
			shippingCity: data.secondaryCity,
			shippingState: data.secondaryState,
			shippingZip: data.secondaryZip,
			contactName: data.contactName,
			contactPhone: data.contactNumber,
			contactEmail: data.contactElectronicAddress,
		};

		return healthData;
	};

	return (
		<div className='card  cover-content pt-2 '>
			<AdminTitle title={editProfile ? 'Edit Health System' : 'Add Health System'} />

			<HealthSystemForm stateList={stateList} defaultValues={healthSystemData} isEdit={editProfile} partyRoleId={partyRoleId} />
		</div>
	);
};

export default HealthSystemProfile;
