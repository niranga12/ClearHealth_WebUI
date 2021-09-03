import React from 'react'
import OrderList from './OrderList'
import OrderViewPatient from './OrderViewPatient'

const OrderView = () => {
    return (
        <div>
            <OrderViewPatient/>

            <OrderList/>
            <OrderList/>
           
           
        </div>
    )
}

export default OrderView
