import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import FormatText from 'src/reusable/FormatText';
import { getPayerList } from 'src/service/orderService';
import AsyncSelect from 'react-select/async';
import { RelationshipList } from 'src/reusable/enum';


let schema = yup
    .object()
    .shape({
        insurance: yup.object().shape({
            payerId: yup.string(),
            subscriberRelationship: yup.string(),
            subscriberId: yup.string(),
            providerNpi: yup.string(),
            groupNumber: yup.string(),
            subscriberFirstName: yup.string(),
            patientFirstName: yup.string(),
            patientMiddleName: yup.string(),
            patientLastName: yup.string(),
            patientGender: yup.string(),
            memberId: yup.string(),
        })
    })

const OrderInsurance = ({ defaultValues, isEdit = false, handleInsuranceForm }) => {

    const { register, getValues, formState } = useForm({ resolver: yupResolver(schema), mode: 'all' });
    // eslint-disable-next-line no-unused-vars
    const { isValid, errors } = formState;
    const [stateChange, setstateChange] = useState(false);
    const [inputValue, setValue] = useState('');
    const [selectedPayerId, setPayerId] = useState(null);
    const relationshipList = RelationshipList;

    const loadOptions = async (inputValue) => {
        try {
            let data = { searchTerm: inputValue };
            let result = await getPayerList(data);
            return result.data.data;
        } catch (error) { }
    };

    const handleInputChange = (value) => {
        setValue(value);
    };

    const handleChange = (value) => {
        setPayerId(value)
    };

    useEffect(() => {
        const formValue = getValues('insurance');

        handleInsuranceForm({ ...formValue, payerId: selectedPayerId?.payerID });

    }, [stateChange])


    return (
        <div>
            <div className='hr-row'></div>
            <h5 className='font-weight-bold mt-3'>Insurance Details</h5>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Insurance Company <span className='text-danger font-weight-bold '>*</span>
                        </label>

                        <AsyncSelect cacheOptions defaultOptions getOptionLabel={(e) => e.payerID + ' - ' + e.payerName}
                            getOptionValue={(e) => e.payerID} loadOptions={loadOptions} {...register('insurance.payerId')} onBlur={() => setstateChange(!stateChange)} onInputChange={handleInputChange} onChange={handleChange} />
                        <div className='small text-danger pb-2'>{errors.insurance?.payerId?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>Relationship to Subscriber <span className='text-danger font-weight-bold '>*</span></label>
                        <select name='' id='' className='form-control-sm' {...register('insurance.subscriberRelationship')} onBlur={() => setstateChange(!stateChange)}>
                            <option value='-1'>Select</option>

                            {relationshipList.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className='small text-danger  pb-2   '>{errors.insurance?.subscriberRelationship?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Member ID<span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.memberId')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)}  />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.memberId?.message}</div>
                    </div>
                </div>
            </div>
            <h5 className='font-weight-bold mt-1'>Subscriber Details </h5>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Subscriber ID<span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.subscriberId')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.subscriberId?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>Provider NPI<span className='text-danger font-weight-bold '>*</span></label>
                        <input className='form-control-sm'  value='1104918564' type='text' {...register('insurance.providerNpi')} readOnly={true} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.providerNpi?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Group ID<span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.groupNumber')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.groupNumber?.message}</div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            First Name <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.patientFirstName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)}  />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.patientFirstName?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>Middle Name</label>
                        <input className='form-control-sm' type='text' {...register('insurance.patientMiddleName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.patientMiddleName?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Last Name <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.patientLastName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.patientLastName?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Gender <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <select name='' id='' className='form-control-sm' {...register('insurance.patientGender')} onBlur={() => setstateChange(!stateChange)}>
                            <option value='0'>Select</option>
                            <option value='M'>Male</option>
                            <option value='F'>Female</option>

                        </select>
                        <div className='small text-danger  pb-2   '>{errors.insurance?.patientGender?.message}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}





OrderInsurance.propTypes = {
    defaultValues: PropTypes.any,
    isEdit: PropTypes.bool,
    handleInsuranceForm: PropTypes.func,
};

export default OrderInsurance
