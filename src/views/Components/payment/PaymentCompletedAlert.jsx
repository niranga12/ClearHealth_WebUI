import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
// import greenTick from '../../assets/images/icons/greentick.png';
import greenTick from '../../../assets/images/icons/greentick.png';
import { getViewReceipt } from 'src/service/orderService';
const PaymentCompletedAlert = ({ orderId = null, isNotify, handleCancel }) => {



    const [modal, setModal] = useState(false);

    useEffect(() => {
        setModal(isNotify)

    }, [isNotify])

    const downlaodPdf = async () => {

        try {
debugger;
            let result = await getViewReceipt({
                orderId: orderId
            });
            debugger;
        } catch (error) {

        }
    }


    return (
        <CModal show={modal} onClose={setModal} >
            <CModalHeader closeButton>
                <CModalBody>
                    <div className="row m-2">
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="fa-6x m-auto check-circle"
                        />
                    </div>

                    <div className="text-center pb-2 font-weight-bold"><h3>Successfully Completed</h3></div>
                    <div className="text-center">Thank you for completing your order with Regional Media Center. A copy of your order will be emailed to you shortly.
                        If you're not already scheduled for your procedure, you will be receiving a call from hospital to schedule</div>

                    {/* <div className="row  m-2 pt-3">
                        <button type='button' className='btn btn-primary btn-lg col-md-6 m-auto' onClick={downlaodPdf} >
                            View Order
                        </button>
                    </div> */}
                    <div className="row m-2">
                        <button type='button' className='btn btn-lg col-md-6 m-auto' onClick={handleCancel}>
                            Back to Home
                        </button>
                    </div>


                </CModalBody>
            </CModalHeader>

        </CModal>
    )
}

export default PaymentCompletedAlert
