import CIcon from '@coreui/icons-react';
import { CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { RoleType } from 'src/reusable/enum';
import { getHospitalsList } from 'src/service/hospitalsService';
import MetaTitles from 'src/views/common/metaTitles';
import HospitalSubCategories from './HospitalSubCategories';
import OnError from 'src/_helpers/onerror';
const HospitalLayout = () => {
	
	let history = useHistory();
	const location = useLocation();
	// eslint-disable-next-line no-unused-vars
	const [partyRoleId, setPartyRoleId] = useState(null);
	const [hospitalName, setHospitalName] = useState('');
	const [isGoback, setIsGoBack] = useState(true);
	const [hospitalData, setHospitalData] = useState([]);
	const dispatch = useDispatch();
	let roleTypeId = useSelector((state) => state.Login.roleTypeId);
	//if this a edit form get the data
	useEffect(() => {
		
		const fetchData = async () => {
			try {

				const hospitalList = await getHospitalsList();
				setHospitalData(hospitalList.data.data);
			
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		if (roleTypeId == RoleType.HospitalAdmin || roleTypeId == RoleType.HospitalStaff) {
			fetchData();
		}

		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		const name = params.get('name');
		setPartyRoleId(id);
		setHospitalName(name);

	}, [location]);




	useEffect(() => {
		if (roleTypeId == RoleType.HospitalAdmin || roleTypeId == RoleType.HospitalStaff) {
			if (hospitalData.length > 0) {
				setIsGoBack(true)
			} else {
				setIsGoBack(false)
			}

		}

	}, [hospitalData]);

	const goBack = () => {
		history.goBack();
	}

	return (
		<>
			{/* for addeing page metas  */}
			<MetaTitles title="Clear Health | Hospital View" description=" Hospital Views  " />
			<CRow>
				<CCol xs='12' md='12' className='h4 font-lato-bold m-0 cursor-pointer' >
					{isGoback && <CIcon name='cilArrowLeft' size={'xl'} onClick={goBack} />}
					{isGoback && <span className="pl-3" onClick={goBack}>Hospitals</span>}
				</CCol>
				<CCol xs='12' md='12' className='h2 font-lato-bold hospital-heading'>
					{hospitalName}
				</CCol>
			</CRow>

			<div className='card  cover-content  min-height-99 '>
				<HospitalSubCategories />
			</div>
		</>
	);
};

export default HospitalLayout;
