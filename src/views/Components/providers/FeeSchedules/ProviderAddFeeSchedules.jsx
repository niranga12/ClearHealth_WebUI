import React, { useEffect, useRef, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getSpecialityList, saveProviderFeeSchedule } from 'src/service/providerService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';


const schema = yup.object().shape({
    speciality: yup.string().required('Speciality is required'),
    file: yup.string().required('File is required'),

});

const ProviderAddFeeSchedules = ({ edit, partyRoleId, isFeeSchedule,hosId, hosName, tabId }) => {
    let history = useHistory();
    let btnRef = useRef();
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
    const [specialityData, setSpecialityData] = useState([]);
    const [specialityList, setspecialityList] = useState([]);
    const [submittedFile, setSubmittedFile] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [selectedSpeciality, setSelectedSpeciality] = useState();
    const [table, setTable] = useState([]);

    useEffect(() => {

        // @ts-ignore
        btnRef.current.setAttribute('disabled', 'disabled');

        const fetchData = async () => {
            setModal(isFeeSchedule);
            const speciality = await getSpecialityList();
            setSpecialityData(speciality.data.data);
            setspecialityList(speciality.data.data);

        };
        fetchData();

    }, [isFeeSchedule])


    useEffect(() => {

        if (selectedSpeciality != undefined && selectedFile != undefined) {
            // @ts-ignore
            btnRef.current.removeAttribute('disabled');
        }
    }, [selectedFile, selectedSpeciality])

    const onClickDelete = (event) => {

        let index = submittedFile.findIndex(x => x.speciality === event.speciality);
        let selected = specialityData.filter(x => x.ID == event.speciality);
        specialityList.push(selected);
        setspecialityList(specialityList);
        submittedFile.splice(index, 1)
        setSubmittedFile(submittedFile);
        let data = submittedFile.map(function (obj) {
            let selected = specialityData.filter(x => x.ID == obj.speciality);
            return <div key={obj} className='row ml-2 '>
                <div className='col-5'>{selected[0].speciality}</div>
                <div className='col-5'>{obj.file.name} </div>
                <div className='col-2'>
                    <div onClick={() => onClickDelete(obj)}  >
                        <FontAwesomeIcon icon={faTimesCircle} className="pr-1 fa-2x" />
                    </div>
                </div>
            </div>
        });

        setTable(data)
    }

    const onChangeFile = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onChangeSpeciality = (event) => {
        setSelectedSpeciality(event.target.value);
    };

    const handleSubmission = async () => {
       
        const formData = new FormData();
        formData.append(selectedSpeciality, selectedFile);
        let speciality = specialityList.filter(x => x.ID != selectedSpeciality);
        setspecialityList(speciality)
        let result = await saveProviderFeeSchedule(partyRoleId, formData);
        if (result.data.message == 'OK') {
            submittedFile.push({ 'speciality': selectedSpeciality, file: selectedFile })
            let data = submittedFile.map(function (obj) {
                let selected = specialityData.filter(x => x.ID == obj.speciality);
                return <div key={obj.speciality} className='row ml-2 '>
                    <div className='col-5'>{selected[0].speciality}</div>
                    <div className='col-5'>{obj.file.name} </div>
                    <div className='col-2'>
                        <div onClick={() => onClickDelete(obj)}  >
                            <FontAwesomeIcon icon={faTimesCircle} className="pr-1 fa-2x" />
                        </div>
                    </div>
                </div>
            });
            setSelectedFile(null);
            setSelectedSpeciality(null);
            // @ts-ignore
            btnRef.current.setAttribute('disabled', 'disabled');
            setValue('speciality', '');
            setValue('file', '');
            setTable(data)
        }

    };

    const onClose = (event) => {
        setModal(false);
        history.push(`/hospitals/hospital?id=${hosId}&&name=${hosName}&tap=${tabId}`);
    };



    return (
        <CModal show={modal} onClose={setModal} closeOnBackdrop={false} size="lg">
            <CModalHeader closeButton>
                <CModalTitle>Add Fee Schedules
                </CModalTitle>
            </CModalHeader>

            <CModalBody>
                <div className='row ml-2 '>
                    <div className='col-5'>
                        <label className='form-text'>
                            {' '}
                            Select Speciality <span className='text-danger font-weight-bold '>*</span>{' '}
                        </label>

                        <select name='' id='' className='form-control-sm'   {...register('speciality')} onChange={onChangeSpeciality}>
                            <option value=''>Select</option>
                            {specialityList.map((item, index) => (
                                <option key={index} value={item.ID}>
                                    {item.speciality}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className='col-5'>
                        <label className='form-text'>
                            {' '}
                            Select File <span className='text-danger font-weight-bold '>*</span>{' '}
                        </label>
                        <input type="file" name="file" className="form-control"  {...register('file')} onChange={onChangeFile} />
                    </div>

                    <div className='col-2 mt-5'>
                        <button type="button" className="btn btn-primary" ref={btnRef} onClick={handleSubmission} >
                            Submit
                        </button>
                    </div>
                </div>
                {table.length != 0 && <div className='row ml-2 mt-3'>
                    <div className='col-5'><h5>Speciality</h5></div>
                    <div className='col-5'><h5>File Name</h5></div>
                </div>}
                {table}

            </CModalBody>
            <CModalFooter>
            <CButton color='secondary' onClick={onClose}>
                Close
            </CButton>
            </CModalFooter>

        </CModal>
    )
}

export default ProviderAddFeeSchedules
