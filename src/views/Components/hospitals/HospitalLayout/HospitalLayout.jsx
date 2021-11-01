import CIcon from '@coreui/icons-react';
import {CCol, CRow} from '@coreui/react';
import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import MetaTitles from 'src/views/common/metaTitles';
import HospitalSubCategories from './HospitalSubCategories';

const HospitalLayout = () => {
  let history=useHistory();
	const location = useLocation();
	// eslint-disable-next-line no-unused-vars
	const [partyRoleId, setPartyRoleId] = useState(null);
	const [hospitalName, setHospitalName] = useState('');

	//if this a edit form get the data
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		const name = params.get('name');
		setPartyRoleId(id);
		setHospitalName(name);
	}, [location]);

//   const redirectHospital = () => {
// 		// history.push('/hospitals');
// 		history.goBack();
// 	};

	const goBack=()=>{
		history.goBack();
	}

	return (
		<>
		  {/* for addeing page metas  */}
		  <MetaTitles title="Clear Health | Hospital View" description=" Hospital Views  "/>
			<CRow>
				<CCol xs='12' md='12'  className='h4 font-lato-bold m-0 cursor-pointer' >
					<CIcon name='cilArrowLeft' size={'xl'}  onClick={goBack}/>
				   <span className="pl-3" onClick={goBack}>Hospitals</span>	
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
