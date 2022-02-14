import React, { useEffect, useRef, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import greenTick from '../../assets/images/icons/greentick.png';
import { getViewReceipt } from 'src/service/orderService';
import { getSpecialityList } from 'src/service/providerService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
    speciality: yup.string().required('Speciality is required'),
    file: yup.string().required('File is required'),

});


const AddFeeSchedules = ({ data = null, isFeeSchedule, handleCancel, }) => {
    //let submittedFile = [];
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
    const [submittedFile, setSubmittedFile] = useState([]);
    const [fileData, setFileData] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [selectedSpeciality, setSelectedSpeciality] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [table, setTable] = useState([]);
    //   const [facilityName, setFacilityName] = useState(null);
    useEffect(() => {
        //   if (btnRef.current) {
        // @ts-ignore
        btnRef.current.setAttribute('disabled', 'disabled');
        //    }

        const fetchData = async () => {
            setModal(isFeeSchedule);
            const specialityList = await getSpecialityList();
            setSpecialityData(specialityList.data.data);

        };
        fetchData();
        //   setFacilityName(orderDetail.orderPatientDetails.facilityName)

    }, [isFeeSchedule])


    useEffect(() => {



        if (selectedSpeciality != undefined && selectedFile != undefined) {
            btnRef.current.removeAttribute('disabled');
        }


    }, [selectedFile, selectedSpeciality])

    const onClickAdd = () => {
        //setFeeSchedule(true);

    }

    const onClickDelete = (event) => {
        //setFeeSchedule(true);

    }

    const onChangeFile = (event) => {
        setSelectedFile(event.target.files[0]);
        //	setIsSelected(true);
    };

    const onChangeSpeciality = (event) => {
        setSelectedSpeciality(event.target.value);
        //	setIsSelected(true);
    };
    const handleSubmission = () => {
        submittedFile.push({ 'speciality': selectedSpeciality, file: selectedFile })


        let data = submittedFile.map(function (obj) {
            let selected = specialityData.filter(x => x.ID == obj.speciality);
            return <div className='row ml-2 '>

                <div className='col-5'>{selected[0].speciality}</div>

                <div className='col-5'>{obj.file.name}</div>
                <a onClick={()=>onClickDelete(obj)}  >
                    <i className="fa fa-times"></i>
                </a>
                {/* <div><i className="fa fa-times" aria-hidden="true"></i>
                </div> */}

            </div>
        });
        setSelectedFile(null);
        setSelectedSpeciality(null);
        btnRef.current.setAttribute('disabled', 'disabled');
        setValue('speciality', '');
        setValue('file', '');
        setTable(data)
        // const formData = new FormData();

        // formData.append('File', selectedFile);

        // fetch(
        //     'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
        //     {
        //         method: 'POST',
        //         body: formData,
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
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
                            {specialityData.map((item, index) => (
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
                        {/* <button >Submit</button> */}
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
                <CButton color='primary' onClick={onClickAdd} >
                    Add
                </CButton>{' '}
                <CButton color='secondary' onClick={handleCancel}>
                    Cancel
                </CButton>
            </CModalFooter>

        </CModal>
    )
}

export default AddFeeSchedules
