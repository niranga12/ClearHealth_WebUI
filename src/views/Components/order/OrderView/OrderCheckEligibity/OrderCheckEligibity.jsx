import React from 'react'
import HealthBenefitPlan from './HealthBenefitPlanCoverage/HealthBenefitPlan'
import HospitalInPatient from './HospitalInPatient/HospitalInPatient'




const OrderCheckEligibity = () => {
    return (



        <div className='card  cover-content pt-2 '>
            <div className='card-header'>
                <div className='row'>
                    <div className='col-md-6 component-header '>Check Eligibility </div>
                    {/* <div className='col-md-6'>{isEdit ? saveButton() : editButton()}</div> */}
                </div>
            </div>
            <div className='card-body pb-0'>
                <div className='row'>



                    <HealthBenefitPlan />

                </div>
                <div className='row'>



                    <HospitalInPatient />
                </div>
            </div>
        </div>

    )
}

export default OrderCheckEligibity
