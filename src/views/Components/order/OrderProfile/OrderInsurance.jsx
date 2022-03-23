import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import FormatText from 'src/reusable/FormatText';
import { getPayerList, verifyInsuranceDetails } from 'src/service/orderService';
import AsyncSelect from 'react-select/async';
import { RelationshipList } from 'src/reusable/enum';
import DateSelector from 'src/views/common/dateSelector';
import moment from 'moment';


let schema = yup
    .object()
    .shape({
        insurance: yup.object().shape({
            payerId: yup.string(),
            subscriberRelationship: yup.string(),
            // subscriberId: yup.string(),
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

const OrderInsurance = ({ defaultValues, isEdit = false, handleInsuranceForm, patientDetail }) => {
    const { register, getValues, formState, setValue, } = useForm({ resolver: yupResolver(schema), mode: 'all' });
    // eslint-disable-next-line no-unused-vars
    const { isValid, errors } = formState;
    const [stateChange, setstateChange] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedPayerId, setPayerId] = useState(null);
    const relationshipList = RelationshipList;
    const [fromDate, handlefromDateChange] = useState(Date.now());
    const [alertMessage, setAlertMessage] = useState(null);
    const [fieldMessage, setfieldMessage] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');

    const loadOptions = async (inputValue) => {
        try {
            let data = { searchTerm: inputValue };
            let result = await getPayerList(data);
            return result.data.data;
        } catch (error) { }
    };


    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleChange = (value) => {
        setPayerId(value)
    };
    const verifyInsurance = async () => {

        try {
            setAlertMessage('')
            setfieldMessage([])
            setSuccessAlert('')
            const formValue = getValues('insurance');
            let data = { ...formValue, payerId: selectedPayerId?.payerID, patientBirthDate: patientDetail.dateOfBirth, patientGender: patientDetail.gender }

            let result = await verifyInsuranceDetails(data);
            if (result.data.data.statusCode == 400 || result.data.data.statusCode == '19' || result.data.data.statusCode == '3') {
                setAlertMessage(result.data.data.message)
                setfieldMessage(result.data.data.data.map(function (obj) {

                    if (obj.field == "patientLastName") {
                        obj.field = "Patient Last Name"
                    } else if (obj.field == "patientFirstName") {
                        obj.field = "Patient First Name"
                    } else if (obj.field == "patientBirthDate") {
                        obj.field = "Patient BirthDate"
                    } else if (obj.field == "subscriberRelationship") {
                        obj.field = "Relationship to Subscriber"
                    } else if (obj.field == "payerId") {
                        obj.field = "Payer Id"
                    } else if (obj.field == "memberId") {
                        obj.field = "Member Id"
                    } else if (obj.field == "patientGender") {
                        obj.field = "Patient Gender"
                    } else if (obj.field == "patient") {
                        obj.field = "Patient"
                    } else if (obj.field == "providerNpi") {
                        obj.field = "Provider Npi"
                    }
                    return <div>
                        <span>{obj.field}</span> <span>{obj.field != undefined && ':'}</span><span>  {obj.errorMessage}</span>
                    </div>
                }))
            } else if (result.data.data.statusCode == "Complete") {
                setAlertMessage('')
                setfieldMessage([])
                setSuccessAlert("Successfully Verified")
            } else if (result.data.data.statusCode == "0") {
                setAlertMessage('')
                setfieldMessage([])
                setSuccessAlert("In Progress")
            }
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        let details = patientDetail;
        const subscriberRelationship = getValues('insurance.subscriberRelationship');
        if (subscriberRelationship == '18') {
            setValue('insurance.patientFirstName', details.firstName);
            setValue('insurance.patientMiddleName', details.middleName);
            setValue('insurance.patientLastName', details.lastName);
        } else {
            // setValue('insurance.patientFirstName', '');
            // setValue('insurance.patientMiddleName', '');
            // setValue('insurance.patientLastName', '');
        }
        const formValue = getValues('insurance');

        handleInsuranceForm({ ...formValue, payerId: selectedPayerId?.payerID, patientBirthDate: patientDetail.dateOfBirth, patientGender: patientDetail.gender });

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

                            {relationshipList.sort().map((item, index) => (
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
                        <input className='form-control-sm' type='text' {...register('insurance.memberId')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.memberId?.message}</div>
                    </div>
                </div>
            </div>
            <h5 className='font-weight-bold mt-1'>Subscriber Details </h5>

            <div className='row'>
                {/* <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Subscriber ID<span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.subscriberId')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.subscriberId?.message}</div>
                    </div>
                </div> */}

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>Provider NPI<span className='text-danger font-weight-bold '>*</span></label>
                        <input className='form-control-sm' value='1104918564' type='text' {...register('insurance.providerNpi')} readOnly={true} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.providerNpi?.message}</div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Group ID
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.groupNumber')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.groupNumber?.message}</div>
                    </div>
                </div>
            </div>

            <h6 className='font-weight-bold mt-1'>If patient is not the subscriber fill below subscriber details.</h6>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            First Name <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <input className='form-control-sm' type='text' {...register('insurance.patientFirstName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
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

                {/* <div className='col-md-4'>
                    <div className='form-group'>
                        <label className='form-text'>
                            Date Of Birth <span className='text-danger font-weight-bold '>*</span>
                        </label>
                        <DateSelector className={` form-control-sm ${isEdit ? 'disable' : ''}`} selectedDate={fromDate} handleDateChange={handlefromDateChange} disableFuture={true} />
                        <div className='small text-danger  pb-2   '>{errors.insurance?.dateOfBirth?.message}</div>
                    </div>
                </div> */}

                {/* <div className='col-md-4'>
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
                </div> */}
            </div>

            <div className='row'>
                <div className='btn btn-view-account ml-3 float-right' onClick={verifyInsurance}>
                    {' '}
                    Verify Insurance
                </div>
                <div className='mr-3 ml-3 pt-2 font-weight-bold text-danger'>{alertMessage}</div>
                <div className='mr-3 ml-3 pt-2 font-weight-bold text-success'>{successAlert}</div>
            </div>
            <div className='row'>
                {fieldMessage != [] && <div className='mr-3 ml-3 pt-2 font-weight-bold text-danger'>{fieldMessage}</div>}
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
