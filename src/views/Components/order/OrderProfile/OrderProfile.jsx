import CIcon from '@coreui/icons-react';
import { CCol, CRow } from '@coreui/react';
import React from 'react'
import { useHistory } from 'react-router';
import AdminTitle from 'src/views/common/adminTitle';
import MetaTitles from 'src/views/common/metaTitles';
import OrderForm from './OrderForm';

const OrderProfile = () => {
   


    return (
        <>
       {/* for addeing page metas  */}
       <MetaTitles title="Clear Health | Order Profile" description=" Add Order  "/>
        <div className="card  cover-content pt-2 ">
        <AdminTitle title={ 'Create New Order'} />

        <OrderForm />
    </div>
    </>
    )
}

export default OrderProfile;
