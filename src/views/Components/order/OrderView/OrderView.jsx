import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { getOrderByOrderId } from 'src/service/orderService'
import OnError from 'src/_helpers/onerror'
import OrderList from './OrderList'
import OrderViewPatient from './OrderViewPatient'

const OrderView = () => {

    const dispatch = useDispatch();
	const location = useLocation();
    const [orderId, setOrderId] = useState(null);
    const [orderList, setOrderList] = useState(null)

    
useEffect(() => {

	const params = new URLSearchParams(location.search);
		const id = params.get('orderId');
		setOrderId(id);

    const fetchData = async () => {
        try {
          dispatch(loaderShow());
              const result = await getOrderByOrderId(id);
              setOrderList(result.data.data[0]);
               dispatch(loaderHide());
  
          // console.log(count)
        } catch (error) {
          OnError(error, dispatch);
        }
      };
      fetchData();
}, [location])



    return (
        <div>
            <OrderViewPatient patientDetail={orderList?.orderPatientDetails}/>

            <OrderList orderDetail={orderList}/>
            {/* <OrderList/> */}
           
           
        </div>
    )
}

export default OrderView
