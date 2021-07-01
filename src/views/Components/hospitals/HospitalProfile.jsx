import React from 'react'
import AdminTitle from 'src/views/common/adminTitle';
import HospitalForm from './HospitalForm';

const HospitalProfile = () => {
    return (
        <div>
            
            <AdminTitle title= 'Add Hospital' />

           < HospitalForm/>
        </div>
    )
}

export default HospitalProfile;
