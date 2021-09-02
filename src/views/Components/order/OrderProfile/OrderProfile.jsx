import React from 'react'
import AdminTitle from 'src/views/common/adminTitle';
import OrderForm from './OrderForm';

const OrderProfile = () => {
    return (
        <div className="card  cover-content pt-2 ">
        <AdminTitle title={ 'Add Order'} />

        <OrderForm />
    </div>
    )
}

export default OrderProfile;
