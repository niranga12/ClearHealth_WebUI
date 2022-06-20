import React from 'react'
import { useHistory } from 'react-router';

import CIcon from '@coreui/icons-react';
import { CCol, CRow } from '@coreui/react';
import PropTypes from 'prop-types';


const Goback = ({step=null}) => {

    const history = useHistory();
	const redirectBack = () => {
        step?  history.go(step) : history.goBack();
       

	};
    return (
        <CRow>
		<CCol xs='12' md='12' className='h4 font-lato-bold m-0 cursor-pointer mb-3'>
			<CIcon name='cilArrowLeft' size={'xl'} onClick={redirectBack} />
			<span className='pl-3' onClick={redirectBack}>
				Back
			</span>
		</CCol>
	</CRow>
    )
}


Goback.propTypes = {
	
    step:PropTypes.number
};
export default Goback
