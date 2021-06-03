import React from 'react'
import AdminTitle from 'src/views/common/adminTitle'
import HealthSystemForm from './healthSystemForm'

const HealthSystemProfile = () => {
    return (
        <div>
            <AdminTitle title="Add Health System"/>
            <HealthSystemForm/>
        </div>
    )
}

export default HealthSystemProfile
