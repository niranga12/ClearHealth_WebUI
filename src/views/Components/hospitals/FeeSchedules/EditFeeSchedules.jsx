import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, } from '@fortawesome/free-solid-svg-icons';
import { getSpecialityList } from 'src/service/providerService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { deleteFeeSchedule, getFeeSchedule, saveFeeSchedule } from 'src/service/hospitalsService';

const schema = yup.object().shape({
    speciality: yup.string().required('Speciality is required'),
    file: yup.string().required('File is required'),
});


const EditFeeSchedules = ({ edit, partyRoleId }) => {
    let btnRef = useRef();
    const { register, handleSubmit, setValue, getValues, reset, control, formState: { errors }, }
        = useForm({ resolver: yupResolver(schema), mode: 'all' });

    const [specialityData, setSpecialityData] = useState([]);
    const [submittedFile, setSubmittedFile] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState();
    const [table, setTable] = useState([]);

    useEffect(() => {
        if (btnRef.current) {
            // @ts-ignore
            btnRef.current.setAttribute('disabled', 'disabled');
        }

        const fetchData = async () => {
            const specialityList = await getSpecialityList();
            setSpecialityData(specialityList.data.data);
            const list = await getFeeSchedule(partyRoleId);
            setSubmittedFile(list.data.data)
            let data = list.data.data.map(function (obj) {

                let selected = specialityList.data.data.filter(x => x.ID == obj.speciality);
                return <div key={obj.speciality} className='row'>

                    <div className='col-2'>{selected[0].speciality}</div>

                    <div className='col-2'>{obj.fileName} </div>
                    <div className='col-2'>
                        <div onClick={() => onClickDelete(obj)}  >
                            <FontAwesomeIcon icon={faTimesCircle} className="pr-1 fa-2x" />
                        </div>
                    </div>
                </div>
            });
            setTable(data)
        };
        fetchData();
    }, [edit])


    useEffect(() => {
        if (selectedSpeciality != undefined && selectedFile != undefined) {
            // @ts-ignore
            btnRef.current.removeAttribute('disabled');
        }
    }, [selectedFile, selectedSpeciality])



    const onClickDelete = (event) => {
        const fetchData = async () => {
            const result = await deleteFeeSchedule(partyRoleId, event.speciality);
            if (result.data.message == 'OK') {
                let index = submittedFile.findIndex(x => x.speciality === event.speciality);
                submittedFile.splice(index, 1)
                setSubmittedFile(submittedFile);
                let data = submittedFile.map(function (obj) {
                    let selected = specialityData.filter(x => x.ID == obj.speciality);
                    return <div key={obj} className='row'>

                        <div className='col-2'>{selected[0].speciality}</div>

                        <div className='col-2'>{obj.fileName} </div>
                        <div className='col-2'>
                            <div onClick={() => onClickDelete(obj)}  >
                                <FontAwesomeIcon icon={faTimesCircle} className="pr-1 fa-2x" />
                            </div>
                        </div>
                    </div>
                });
                setTable(data)
            }
        };
        fetchData();

    }

    const onChangeFile = (event) => {
        setSelectedFile(event.target.files[0]);

    };

    const onChangeSpeciality = (event) => {
        setSelectedSpeciality(event.target.value);
    };
    const handleSubmission = async () => {

        const fetchData = async () => {
            const formData = new FormData();

            formData.append(selectedSpeciality, selectedFile);
            let result = await saveFeeSchedule(partyRoleId, formData);
            if (result.data.message == 'OK') {
                submittedFile.push({ fileName: selectedFile?.name, speciality: selectedSpeciality, })
                let data = submittedFile.map(function (obj) {

                    let selected = specialityData.filter(x => x.ID == obj.speciality);
                    return <div key={obj} className='row'>
                        <div className='col-2'>{selected[0].speciality}</div>
                        <div className='col-2'>{obj.fileName} </div>
                        <div className='col-2'>
                            <div onClick={() => onClickDelete(obj)}  >
                                <FontAwesomeIcon icon={faTimesCircle} className="pr-1 fa-2x" />
                            </div>
                        </div>
                    </div>
                });
                setSelectedFile(null);
                setSelectedSpeciality(null);
                //btnRef.current.setAttribute('disabled', 'disabled');
                setValue('speciality', '');
                setValue('file', '');
                setTable(data)

            }
        };
        fetchData();
    };

    return (
        <div>
            <div>
                <h5 className='font-weight-bold mt-1'>Fee Schedule</h5>
                <div className='row'>
                    <div className='col-4'>
                        <label className='form-text'>
                            {' '}
                            Select Speciality <span className='text-danger font-weight-bold '>*</span>{' '}
                        </label>

                        <select name='' id='' className='form-control-sm'   {...register('speciality')} onChange={onChangeSpeciality}>
                            <option value=''>Select</option>
                            {specialityData.map((item, index) => (
                                <option key={index} value={item.ID}>
                                    {item.speciality}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='col-4'>
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

                {table.length != 0 && <div className='row mt-3'>
                    <div className='col-2'><h5>Speciality</h5></div>
                    <div className='col-2'><h5>File Name</h5></div>

                </div>}
                {table}
            </div>

        </div>

    )
}

export default EditFeeSchedules
