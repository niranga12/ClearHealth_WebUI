import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ValidationPatterns } from 'src/reusable/enum';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import FormatText from 'src/reusable/FormatText';


let schema = yup
    .object()
    .shape({
        insurance: yup.object().shape({
            insuranceCompany: yup.string(),
            relationshipToSubscriber: yup.string(),
            subscriberId: yup.string(),
            providerNPI: yup.string(),
            groupID: yup.string(),
            subscriberFirstName:yup.string(),
            subscriberMiddleName:yup.string(),
            subscriberLastName:yup.string(),
        })
    })



const OrderInsurance = ({ defaultValues, isEdit = false, handleInsuranceForm }) => {

    const { register, unregister, getValues, reset, formState } = useForm({ resolver: yupResolver(schema), mode: 'all' });
    // eslint-disable-next-line no-unused-vars
    const { isValid, errors } = formState;
    const [relationshipList, setRelationshipList] = useState([]);
    const [insuranceList, setInsuranceList] = useState([]);
    const [stateChange, setstateChange] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setRelationshipList([{ id: "Self", name: "Self" }, { id: "Spouse", name: "Spouse" },
                { id: "Dependant", name: "Dependant" }, { id: "Other", name: "Other" }])
                setInsuranceList([{ id: "1", name: "1199 NATIONAL BENEFIT FUND" },
                { id: "2", name: "137654 CALIFORNIA INCORPORATED" },
                { id: "3", name: "1ST AUTO AND CASUALTY" }, { id: "Other", name: "Other" }])

            } catch (error) {

            }
        };
        fetchData();
       
    }, []);


    useEffect(() => {
        const formValue = getValues('insurance');
        handleInsuranceForm(formValue);

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
                        <select name='' id='' className='form-control-sm' {...register('insurance.insuranceCompany')} onBlur={() => setstateChange(!stateChange)}>
                            <option value='-1'>Select</option>

                            {insuranceList.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className='small text-danger  pb-2   '>{errors.insurance?.insuranceCompany?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>Relationship to Subscriber <span className='text-danger font-weight-bold '>*</span></label>
                        <select name='' id='' className='form-control-sm' {...register('insurance.relationshipToSubscriber')} onBlur={() => setstateChange(!stateChange)}>
                            <option value='-1'>Select</option>

                            {relationshipList.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className='small text-danger  pb-2   '>{errors.insurance?.relationshipToSubscriber?.message}</div>
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
                        <input className='form-control-sm' type='text' {...register('insurance.providerNPI')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.providerNPI?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Group ID<span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.groupID')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.groupID?.message}</div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            First Name <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.subscriberFirstName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.subscriberFirstName?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>Middle Name</label>
                        <input className='form-control-sm' type='text' {...register('insurance.subscriberMiddleName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.subscriberMiddleName?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Last Name <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.subscriberLastName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.subscriberLastName?.message}</div>
                    </div>
                </div>
            </div>

            <div className='hr-row'></div>
            <h5 className='font-weight-bold mt-1'>Procedures</h5>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>CTP Code</label>
                        <select name='' id='' className='form-control-sm' {...register('insurance.ctpCodeDropDown')} onBlur={() => setstateChange(!stateChange)}>
                            <option value='-1'>Select</option>
                            {/* {orderTypeList.map((item, index) => (
                                <option key={index} value={item.orderTypeId}>
                                    {item.description}
                                </option>
                            ))} */}
                        </select>
                        <div className='small text-danger  pb-2   '>{errors.insurance?.ctpCodeDropDown?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>CPT Code</label>
                        <input className='form-control-sm' type='text' {...register('insurance.ctpCode')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.ctpCode?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            CPT Name <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.ctpName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.ctpName?.message}</div>
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
