/* eslint-disable eqeqeq */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import DataTable from 'src/views/common/dataTable'
import PropTypes from 'prop-types'
import OrderAction from './OrderAction'
import { useDispatch } from 'react-redux'
import OnError from 'src/_helpers/onerror'
import { useHistory, useLocation } from 'react-router-dom'
import { notify } from 'reapop'
import { getOutOfPocketReasons, orderAprove } from 'src/service/orderService'
import { OrderType, ServiceMsg } from 'src/reusable/enum'
import moment from 'moment'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

import OrderActionAdd from './OrderActionAdd'
import { addCPTCodesByHospital } from 'src/service/hospitalsService'

const serviceDetail = ({ row }) => {
  return (
    <>
      <div className="pl-4">
        <h5 className="font-weight-normal text-black">{row.original.description}</h5>
        <div className="rectangle-intable">{row.original.facilityName}</div>
      </div>
    </>
  )
}

const OrderList = ({ orderDetail, handleAddCPT }) => {
  const [order, setOrder] = useState(orderDetail)
  const [orderData, setOrderData] = useState([])
  const dispatch = useDispatch()
  const location = useLocation()
  const [orderId, setOrderId] = useState(null)
  let history = useHistory()
  const [isAction, setIsAction] = useState(true)
  const [isNotify, setIsNotify] = useState(false)
  const [hospitalName, setHospitalName] = useState(null)
  const [hospitalId, setHospitalId] = useState(null)
  const [addDetails, setAddDetails] = useState(null)
  const [visible, setVisible] = useState(false)
  const [outOfPocketList, setOutOfPocketList] = useState([])
  const [reason, setReason] = useState()
  const btnRef = useRef()

  const [editAction, setEditAction] = useState(false)
  //const [modelCancel, setModelCancel] = useState(null);
  //let btnRef = useRef();
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('orderId')
    const hospital_id = params.get('hospitalId')
    const hospital_name = params.get('hospitalName')
    setHospitalId(hospital_id)
    setHospitalName(hospital_name)
    setOrderId(id)
  }, [location])

  useEffect(() => {
    setOrder(orderDetail)
    const fetchData = async () => {
      try {
        const reasons = await getOutOfPocketReasons()
        setOutOfPocketList(reasons.data.data)
        const outOfPocketReason = reasons.data.data.find(
          (x) => x.id == orderDetail?.orderSummary.outOfPocketReason
        )?.reason
        setReason(outOfPocketReason)
      } catch (error) {
        OnError(error, dispatch)
      }
    }

    try {
      fetchData()
    } catch (error) {
      OnError(error, dispatch)
    }

    if (
      orderDetail?.orderPatientDetails?.orderStatus == 'Paid' ||
      orderDetail?.orderPatientDetails?.orderStatus == 'Expired'
    ) {
      setIsAction(false)
    } else {
      setIsAction(true)
    }

    if (
      orderDetail?.orderPatientDetails?.attempts > 0 || orderDetail?.orderPatientDetails?.orderStatus == 'Paid' ||
      orderDetail?.orderPatientDetails?.orderStatus == 'Expired'
    ) {
      setEditAction(false)
    } else {
      setEditAction(true)
    }
  }, [orderDetail])

  useEffect(() => {
    try {
      if (order?.orderDetails.length) {
        let facilityName = order?.orderPatientDetails?.facilityName
        let result = order?.orderDetails?.map((x) => {
          return { ...x, facilityName }
        })
        setOrderData(result)
      } else {
        setOrderData([])
      }
    } catch (error) {
      console.error(error)
    }
  }, [order])

  const approveOrder = async () => {
    try {
      // @ts-ignore
      btnRef.current.setAttribute('disabled', 'disabled')
      const result = await orderAprove(orderId)
      if (result.data.message == ServiceMsg.OK) {
        dispatch(notify(`Successfully updated`, 'success'))

        if (hospitalId && hospitalName) {
          history.push({
            pathname: `/hospitals/hospital`,
            search: `?id=${hospitalId}&&name=${hospitalName}`
          })
        } else {
          history.goBack()
        }
      }
    } catch (error) {
      OnError(error, dispatch)
    }
  }

  const AddCPTCode = async () => {
    setIsNotify(true)
  }

  const addCpt = async (detail) => {
    setAddDetails(detail)
  }

  const addCPTtoDB = async (detail) => {
    let result = await addCPTCodesByHospital(orderId, addDetails)
    if (result.data.message == ServiceMsg.OK) {
      dispatch(notify(`Successfully added`, 'success'))
      handleAddCPT(true)
      setIsNotify(false)
    }
  }

  // for table
  //SETTING COLUMNS NAMES
  const columns = useMemo(
    () => [
      {
        Header: 'Service',
        accessor: 'description', // accessor is the "key" in the data
        disableSortBy: true,
        Cell: serviceDetail
      },

      {
        Header: 'Facility Account Number',
        accessor: 'facilityAccountNumber'
      },
      {
        Header: 'Ancillary Account Number',
        accessor: 'ancillaryAccountNumber'
      },
      {
        Header: 'Scheduled Date Of Procedure',
        accessor: 'scheduleServiceDate'
      },
      {
        Header: 'CPT Code',
        accessor: 'code'
      },
      {
        Header: 'Provider',
        accessor: 'providerFirstName',
        //Cell: ({row}) => <h6 className='font-weight-normal text-black '> {row.original.providerFirstName} {row.original.providerLastName}</h6>,
        Cell: ({ row }) => <h6 className="font-weight-normal text-black "> {row.original.providerFirstName}</h6>
      },
      // {
      // 	Header: 'Acc. Num',
      // 	accessor: 'EHRAccNum',
      // },
      // {
      // 	Header: 'Ref',
      // 	accessor: 'Ref',
      // },
      {
        Header: 'Facility Price',
        accessor: 'facilityPrice',
        Cell: ({ row }) => <div>$ {row.original.facilityPrice}</div>
      },
      {
        Header: 'Provider Price',
        accessor: 'providerPrice',
        Cell: ({ row }) => <div>$ {row.original.providerPrice}</div>
      },
      {
        Header: 'Clear Charge',
        accessor: 'clearCharge',
        Cell: ({ row }) => <div>$ {row.original.clearCharge}</div>
      },

      {
        Header: 'Package Price',
        accessor: 'packagePrice',
        Cell: ({ row }) => <div>$ {row.original.packagePrice}</div>
      },

      {
        Header: '',
        accessor: 'id', // accessor is the "key" in the data
        disableSortBy: true,

        Cell: editAction ? OrderAction : ''
      }
    ],
    [editAction]
  )

  return (
    <div className="card  cover-content pt-2 ">
      <div className="card-header border-none">
        <div className="row">
          <div className="col-md-6  ">
            <div className="h4 mb-1 text-black">Order #{order?.orderPatientDetails?.orderNumber}</div>
            <div>{moment(order?.orderPatientDetails?.orderDate).format('MM-DD-YYYY')}</div>
            <div>OrderType : {order?.orderSummary?.orderTypeDescription}</div>
            <div>Date Paid : {order?.orderSummary?.datePaid}</div>
            <div>Date Sent : {order?.orderSummary?.dateSent}</div>
            <div>Estimated Full Cost : $ {order?.orderSummary?.estimatedFullCost}</div>
            <div>Out of Pocket Reason : {reason} </div>
            {order?.orderSummary?.orderTypeId === OrderType.PatientResponsibility && (
              <div>Order Total : {order?.orderSummary?.orderTotal} </div>
            )}
          </div>

          <div className="col-md-6">
            {/* disabled={order?.orderPatientDetails?.totalAttempts <=order?.orderPatientDetails?.attempts || !orderData } */}
            {order?.orderSummary?.orderTypeId == OrderType.ClearPackage && order?.orderDetails.length != 0 && (
              <button
                className="btn btn-view-account ml-3 float-right"
                ref={btnRef}
                disabled={
                  order?.orderPatientDetails?.totalAttempts <= order?.orderPatientDetails?.attempts || !isAction
                }
                onClick={approveOrder}>
                Approve
              </button>
            )}
            {order?.orderSummary?.orderTypeId == OrderType.PatientResponsibility && (
              <button
                className="btn btn-view-account ml-3 float-right"
                ref={btnRef}
                disabled={
                  order?.orderPatientDetails?.totalAttempts <= order?.orderPatientDetails?.attempts || !isAction
                }
                onClick={approveOrder}>
                Approve
              </button>
            )}
            {order?.orderSummary?.orderTypeId == OrderType.ClearPackage && (
              <button
                className="btn btn-view-account ml-3 float-right"
                disabled={
                  order?.orderPatientDetails?.totalAttempts <= order?.orderPatientDetails?.attempts ||
                  order?.orderPatientDetails?.attempts > 0
                }
                onClick={AddCPTCode}>
                Add CPT code
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card-body p-0">
        {orderData && order?.orderSummary?.orderTypeId === OrderType.ClearPackage && (
          <DataTable columns={columns} data={orderData} />
        )}
      </div>
      {/* onClose={() => setPrimary(!primary)} */}
      <CModal show={isNotify} onClose={() => setIsNotify(false)} closeOnBackdrop={false}>
        <CModalHeader closeButton>
          <CModalTitle>Add CPT code</CModalTitle>
        </CModalHeader>
        <CModalBody>{isNotify && <OrderActionAdd data={order} handleChangeCpt={addCpt} />}</CModalBody>
        <CModalFooter>
          <button className="btn btn-primary" onClick={addCPTtoDB}>
            Add
          </button>{' '}
          <CButton color="secondary" onClick={() => setIsNotify(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

OrderList.propTypes = {
  orderDetail: PropTypes.any,
  handleAddCPT: PropTypes.func
}
export default OrderList
