import React, { useEffect, useState } from 'react'
import HealthBenefitPlan from './HealthBenefitPlanCoverage/HealthBenefitPlan'
import HospitalInPatient from './HospitalInPatient/HospitalInPatient'
import PropTypes from 'prop-types';



const OrderCheckEligibity = ({ orderDetail }) => {
    const [benefitPlan, setHealthBenefitPlan] = useState(null);
    const [inPatient, setHospitalInPatient] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if (Object.entries(orderDetail.insuranceInfo).length !== 0) {
           // if (orderDetail.insuranceInfo[0].name != 'Error' && Object.entries(orderDetail.insuranceInfo)[0][0]!='0') {
                if (orderDetail?.insuranceInfo[0]?.name != 'Error' && orderDetail?.insuranceInfo[0].length!=undefined ) {
                let planA = orderDetail.insuranceInfo[0].find(x => x.type == "50");
                let PlanB = orderDetail.insuranceInfo[0].find(x => x.type == 30);
                setHospitalInPatient(planA);
                setHealthBenefitPlan(PlanB);
            }else{
                setShowAlert(true)
            }
        }else{
            setShowAlert(true)
        }

    }, [orderDetail])

    return (


        <div>
              {showAlert && <div><h4>No records available </h4></div>}
            {(benefitPlan || inPatient) && <div className='card  cover-content pt-2 '>
                <div className='card-header'>
                    <div className='row'>
                        {(benefitPlan || inPatient) && <div className='col-md-6 component-header '>Check Eligibility </div>}
                       
                        {/* <div className='col-md-6'>{isEdit ? saveButton() : editButton()}</div> */}
                    </div>
                </div>
                <div className='card-body pb-0'>
                    <div className=''>



                        {benefitPlan && <HealthBenefitPlan healthBenefitPlan={benefitPlan} />}

                    </div>
                    <div className=''>



                        {inPatient && <HospitalInPatient hospitalInPatient={inPatient} />}
                    </div>
                </div>
            </div>}

        </div>

    )
}
OrderCheckEligibity.propTypes = {
    orderDetail: PropTypes.any,

};

export default OrderCheckEligibity
