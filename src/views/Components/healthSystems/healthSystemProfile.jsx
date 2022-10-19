/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { Country } from 'src/reusable/enum'
import { getStateList } from 'src/service/commonService'
// import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater';
import { deleteHealthSystem, getHealthSystemByPartyRoleId } from 'src/service/healthsystemService'
import AdminTitle from 'src/views/common/adminTitle'
import Goback from 'src/views/common/Goback'
import MetaTitles from 'src/views/common/metaTitles'
import OnError from 'src/_helpers/onerror'
import HealthSystemForm from './healthSystemForm'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
const defaultFormvalue = {
  name: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  shippingAddress1: '',
  shippingAddress2: '',
  shippingCity: '',
  shippingState: '',
  shippingZip: '',
  contactName: '',
  contactPhone: '',
  contactEmail: ''
}

const HealthSystemProfile = () => {
  // let { id } = useParams();
  const location = useLocation()
  const [partyRoleId, setPartyRoleId] = useState(null)
  const [editProfile, setEditProfile] = useState(false)
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  const [stateList, setstateList] = useState([])

  const [healthSystemData, setHealthSystemData] = useState(defaultFormvalue);
  let btnDelete = useRef()
  //if this a edit form get the data
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    setPartyRoleId(id)
    id ? setEditProfile(true) : setEditProfile(false)

    const fetchData = async () => {
      try {
        const stateResult = await getStateList(Country.USA)
        setstateList(stateResult.data.data)
      } catch (error) {
        OnError(error, dispatch)
      }

      if (id) {
        try {
          dispatch(loaderShow())
          const result = await getHealthSystemByPartyRoleId(id)
          const formatedData = await updateFormFields(result.data.data)
          debugger;
          if (result.data.data.hospitalCount == 0) {
            // @ts-ignore
            btnDelete.current.removeAttribute('disabled')
          } else {
            // @ts-ignore
            btnDelete.current.setAttribute('disabled', 'disabled')
          }
          setHealthSystemData(formatedData)
          dispatch(loaderHide())
        } catch (error) {
          OnError(error, dispatch)
        }
      }
    }

    fetchData()
  }, [location])

  const updateFormFields = (data) => {
    const healthData = {
      name: data.name,
      address1: data.primaryAddress1,
      address2: data.primaryAddress2,
      city: data.primaryCity,
      state: data.primaryState,
      zip: data.primaryZip,
      phone: data.phoneNumber,
      shippingAddress1: data.secondaryAddress1,
      shippingAddress2: data.secondaryAddress2,
      shippingCity: data.secondaryCity,
      shippingState: data.secondaryState,
      shippingZip: data.secondaryZip,
      contactName: data.contactName,
      contactPhone: data.contactNumber,
      contactEmail: data.contactElectronicAddress
    }

    return healthData
  }

  const onDeleteButton = () => {
    setModal(true)
  }

  const onDeleteHealthSystem = async (data) => {

    const result = await deleteHealthSystem(partyRoleId);
    if (result.data.message = 'OK') {
      setModal(false)
    }
  }

  return (
    <>
      <Goback />

      <div className="card  cover-content pt-2 ">
        {/* for addeing page metas  */}
        <MetaTitles title="Clear Health | Health system Profile" description=" Add update Health system profile  " />
        <div className="row mb-3">
          <div className="col-md-6">
            <AdminTitle title={editProfile ? 'Edit Health System' : 'Add Health System'} />
          </div>
          {editProfile && <div className="col-md-6">
            <button type="submit" ref={btnDelete} onClick={onDeleteButton} className="btn btn-primary btn-lg float-right mr-4  mt-3">
              Delete
            </button>
          </div>}
        </div>


        <HealthSystemForm
          stateList={stateList}
          defaultValues={healthSystemData}
          isEdit={editProfile}
          partyRoleId={partyRoleId}
        />


        <CModal show={modal} onClose={setModal} closeOnBackdrop={false}>
          <CModalHeader closeButton>
            <CModalTitle>Delete</CModalTitle>
          </CModalHeader>
          {/* <CModalBody>Are you Sure Delete this item {row.original.description}?</CModalBody> */}
          <CModalBody>
            <div className="text-center">Are you sure you wish to delete {healthSystemData.name} ?</div>
            {/* {healthSystemData ? <div className="text-center">{healthSystemData.name} </div> : ''} */}
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => onDeleteHealthSystem(healthSystemData)}>
              Delete
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </>
  )
}

export default HealthSystemProfile
