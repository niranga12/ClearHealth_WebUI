import { CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'

import CardWidget from 'src/views/common/cardWidget'
import average from '../../../assets/images/hos-dashboard-icon/average.svg'
import packagesent from '../../../assets/images/hos-dashboard-icon/pckagesent.svg'
import packageAccepted from '../../../assets/images/hos-dashboard-icon/packageaccepted.svg'
import conversion from '../../../assets/images/hos-dashboard-icon/conversion.svg'
import revenue from '../../../assets/images/hos-dashboard-icon/revenuecollect.svg'
import { getHospitalDashboard } from 'src/service/hospitalsService'
import CurrencyFormat from '../../../reusable/CurrencyFormat'
import HDheader from '../hospitals/HospitalChildComponents/HospitalDashboard/HDheader'
import HDwidget from '../hospitals/HospitalChildComponents/HospitalDashboard/HDwidget'
import moment from 'moment'
import OnError from 'src/_helpers/onerror'
import { useDispatch } from 'react-redux'
function AccountDashboard() {
    const [dashboardItems, setdashboardItems] = useState(null)
    const [fromDate, setfromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    // const [facilityPartyRoleID, setFacilityPartyRoleID] = useState()

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {

                let data = { toDate, fromDate }
                //if (toDate != null && fromDate != null) {
                    const result = await getHospitalDashboard(data)
                    setdashboardItems(result.data.data)
                //}

            } catch (error) {
                OnError(error, dispatch)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromDate, toDate])


    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = { toDate, fromDate }
               // if (toDate != null && fromDate != null) {
                    const result = await getHospitalDashboard(data)
                    setdashboardItems(result.data.data)
              //  }

            } catch (error) {
                OnError(error, dispatch)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleFromChange = (value) => {
        let date = moment(value.toLocaleDateString()).format('MM-DD-YYYY');
        setfromDate(date)
    }

    const handleToChange = (value) => {
        let date = moment(value.toLocaleDateString()).format('MM-DD-YYYY');
         setToDate(date) 
    }




    return (
        <div>
            <HDheader title="" handleFromChange={handleFromChange} handleToChange={handleToChange} />
            <div className="row">
                <div className="col-md-3">
                    <HDwidget
                        title="Total Packages Sent"
                        image={packagesent}
                        price={CurrencyFormat(dashboardItems?.packagesSent, false, 0)}
                    />
                </div>

                <div className="col-md-3">
                    <HDwidget
                        title="Total Packages Accepted"
                        image={packageAccepted}
                        price={CurrencyFormat(dashboardItems?.packagesAccepted, false, 0)}
                    />
                </div>

                <div className="col-md-3">
                    <HDwidget
                        title="Average Price Per Package"
                        image={average}
                        price={CurrencyFormat(dashboardItems?.avaragePricePerPackage, true, 0)}
                    />
                </div>

                <div className="col-md-3">
                    <HDwidget title="Conversion Rate" image={conversion}   price={dashboardItems?.conversionRate?dashboardItems?.conversionRate:'' + '%'}/>
                </div>


                <div className="col-md-3">
                    <HDwidget title="Total Revenue" image={revenue} price={CurrencyFormat(dashboardItems?.revenueCollected, true, 0)}/>
                </div>

                <div className="col-md-3">
                    <HDwidget title="Total Patient Responsibility Amount " image={revenue}   price={CurrencyFormat(dashboardItems?.patientResponsibilityAmountCollected, true, 0)} />
                </div>

                <div className="col-md-3">
                    <HDwidget title="Total Clear Package Amount" image={revenue}   price={CurrencyFormat(dashboardItems?.clearPackageAmountCollected, true, 0)} />
                </div>
                {/* 
          <div className="col-md-3">
            <HDwidget
              title="Average Days to collect"
              image={collectDay}
              price={dashboardItems?.avarageDaystoCollect + 'Days'}
            />
          </div> */}
            </div>

            <div className="row">
                {/* Service Offered */}
                {/* <div className="col-md-4 p-3 m-2 LatoRegular">
            <h5 className="font-weight-bold">Service Offered</h5>
            <ul className="hd-boxcover list-group p-3">
              {dashboardItems?.servicesOffered.map((service, index) => (
                <li className="list-inline-item h6 list-dashboard-li" key={index}>
                  {service}
                </li>
              ))}
            </ul>
          </div> */}



            </div>
        </div>
    )
}



export default AccountDashboard