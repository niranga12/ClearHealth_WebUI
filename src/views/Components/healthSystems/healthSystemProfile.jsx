import React from 'react'
import { useParams } from 'react-router-dom';
import AdminTitle from 'src/views/common/adminTitle'
import HealthSystemForm from './healthSystemForm'

const HealthSystemProfile = () => {
    let { id } = useParams();

    return (
        <div>
            <AdminTitle title="Add Health System"/>

            <HealthSystemForm partyRoleId={id}/>
        </div>
    )
}

export default HealthSystemProfile
