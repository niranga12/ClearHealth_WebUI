import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import OnError from 'src/_helpers/onerror';
import { ServiceMsg } from 'src/reusable/enum';
import { saveNotifyUser } from 'src/service/hospitalsService';



const schema = yup.object().shape({
    email: yup.string().required('Contact Email is required').email('Contact Email must be a valid email'),
});

const HospitalNotifyUser = ({ partyRoleId = null, isNotify }) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: 'all' });


    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState();
    useEffect(() => {
        setModal(isNotify)

    }, [isNotify])

    const onNotifyUser = async () => {
  

    

    try {
        let email = getValues('email')

        const user = {
            emailAddress: email
        }
            let result = await saveNotifyUser(partyRoleId,user);
            if (result.data.message === ServiceMsg.OK) {
        }
    } catch (error) {
        OnError(error);
    }
}

return (

    <CModal show={modal} onClose={setModal} >
        <CModalHeader closeButton>

        </CModalHeader>
        <CModalBody>Please enter the mail of the user who is to complete the onboarding process below</CModalBody>
        <form>
            <input type='text' className='ml-3 form-control-sm col-9' {...register('email')} />
            <div className='small text-danger ml-3 pb-2   '>{errors.email?.message}</div>
        </form>
        <CModalFooter>
            <CButton color='primary' onClick={onNotifyUser} >
                Send
            </CButton>{' '}
            <CButton color='secondary' onClick={() => setModal(false)}>
                Cancel
            </CButton>
        </CModalFooter>
    </CModal>

)
}

export default HospitalNotifyUser
