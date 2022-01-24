import React, { useEffect, useState } from 'react'
import HealthBenefitPlan from './HealthBenefitPlanCoverage/HealthBenefitPlan'
import HospitalInPatient from './HospitalInPatient/HospitalInPatient'
import PropTypes from 'prop-types';



const OrderCheckEligibity = ({ orderDetail }) => {
    const [benefitPlan, setHealthBenefitPlan] = useState(null);
    const [inPatient, setHospitalInPatient] = useState(null);

    useEffect(() => {
     if(orderDetail.insuranceInfo[0].name!='Error'){
        let planA=  orderDetail.insuranceInfo[0].find(x=>x.type=="50");
        let PlanB=  orderDetail.insuranceInfo[0].find(x=>x.type==30);
       setHospitalInPatient(planA);
       setHealthBenefitPlan(PlanB);
     }
     
    }, [orderDetail])

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



                  {benefitPlan && <HealthBenefitPlan healthBenefitPlan={benefitPlan}/>}  

                </div>
                <div className='row'>



                   {inPatient && <HospitalInPatient hospitalInPatient={inPatient}/>}
                </div>
            </div>
        </div>

    )
}
OrderCheckEligibity.propTypes = {
    orderDetail: PropTypes.any,

};

export default OrderCheckEligibity
