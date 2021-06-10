import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getHealthSystemByPartyRoleId } from 'src/service/healthsystemService';
import AdminTitle from 'src/views/common/adminTitle'
import HealthSystemForm from './healthSystemForm'

const defaultFormvalue={
    name:"",
    address1:"",
    address2: "",
    city: "",
    state:"",
    zip:"",
    phone: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingCity:"",
    shippingState: "",
    shippingZip: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
}

const HealthSystemProfile = () => {
    // let { id } = useParams();
    const location = useLocation();
    const [partyRoleId, setPartyRoleId] = useState(null)
    const [editProfile, setEditProfile] = useState(false)

    





    
  const [healthSystemData, setHealthSystemData] = useState(defaultFormvalue);
  //if this a edit form get the data
  useEffect(() => {
    const params=new URLSearchParams(location.search);
    const id= params.get('id')
    setPartyRoleId(id)
    id? setEditProfile(true):setEditProfile(false)

  const fetchData = async () => {
    if (id) {
      try {
       const result= await getHealthSystemByPartyRoleId(id);
       const formatedData=  await updateFormFields(result.data.data)
        
        setHealthSystemData(formatedData);
      } catch (error) {}
    }
  };

  fetchData();


  }, [location]);



  const updateFormFields=(data)=>{
      const healthData={
        name:data.name,
        address1:data.primaryAddress1,
        address2: data.primaryAddress2,
        city: data.primaryCity,
        state: data.primaryState,
        zip: data.primaryZip,
        phone: data.phoneNumber,
        shippingAddress1: data.secondaryAddress1,
        shippingAddress2: data.secondaryAddress2,
        shippingCity:data.secondaryCity,
        shippingState: data.secondaryState,
        shippingZip: data.secondaryZip,
        contactName: data.contactName,
        contactPhone: data.contactNumber,
        contactEmail: data.contactElectronicAddress
      }
    
    return healthData;

    

  }

    return (
        <div>
            <AdminTitle title={editProfile? 'Edit Health System': 'Add Health System' }/>

            <HealthSystemForm defaultValues={healthSystemData} isEdit={editProfile}  partyRoleId={partyRoleId}/>
        </div>
    )
}

export default HealthSystemProfile
