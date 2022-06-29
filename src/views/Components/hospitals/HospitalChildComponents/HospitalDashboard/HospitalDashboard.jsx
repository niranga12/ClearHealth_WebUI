import React, { useEffect, useState } from 'react'
import HDheader from './HDheader'
import average from '../../../../../assets/images/hos-dashboard-icon/average.svg'
import packagesent from '../../../../../assets/images/hos-dashboard-icon/pckagesent.svg'
import packageAccepted from '../../../../../assets/images/hos-dashboard-icon/packageaccepted.svg'
import conversion from '../../../../../assets/images/hos-dashboard-icon/conversion.svg'
import revenue from '../../../../../assets/images/hos-dashboard-icon/revenuecollect.svg'
import increment from '../../../../../assets/images/hos-dashboard-icon/incremental.svg'
import livepackages from '../../../../../assets/images/hos-dashboard-icon/livepackages.svg'

import collectDay from '../../../../../assets/images/hos-dashboard-icon/collectday.svg'

import { getHospitalDashboard } from 'src/service/hospitalsService'
import OnError from 'src/_helpers/onerror'
import { useDispatch } from 'react-redux'
import HDwidget from './HDwidget'
import CurrencyFormat from '../../../../../reusable/CurrencyFormat'
import CurrencyConvertorInt from 'src/reusable/CurrencyConvertorInt'

// const initialSearch={
// 	toDate: '2020-02-02',
//     fromDate: '2021-06-02'
// }

const HospitalDashboard = () => {
  const [dashboardItems, setdashboardItems] = useState(null)
  const [fromDate, setfromDate] = useState()
  const [toDate, setToDate] = useState()
  // const [searchQuery,setsearchQuery]=useState(initialSearch)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = { toDate, fromDate }
        const result = await getHospitalDashboard(data)
        setdashboardItems(result.data.data)
      } catch (error) {
        OnError(error, dispatch)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate])

  const handleFromChange = (value) => {
    setfromDate(value.toLocaleDateString())
    // let search={...searchQuery ,fromDate:value.toLocaleDateString()}

    // setsearchQuery({...searchQuery ,fromDate:value.toLocaleDateString()});
  }

  const handleToChange = (value) => {
    setToDate(value.toLocaleDateString())
    // setsearchQuery({...searchQuery, toDate:value.toLocaleDateString()});
  }

  return (
    <div>
      <HDheader title="Dashboard" handleFromChange={handleFromChange} handleToChange={handleToChange} />
      <div className="row">
        <div className="col-md-3">
          <HDwidget
            title="Packages Sent"
            image={packagesent}
            price={CurrencyFormat(dashboardItems?.packagesSent, false, 0)}
          />
        </div>

        <div className="col-md-3">
          <HDwidget
            title="Packages Accepted"
            image={packageAccepted}
            price={CurrencyFormat(dashboardItems?.packagesAccepted, false, 0)}
          />
        </div>

        <div className="col-md-3">
          <HDwidget
            title="Average Price Per Package"
            image={average}
            price={CurrencyFormat(dashboardItems?.avaragePricePerPackage, true)}
          />
        </div>

        <div className="col-md-3">
          <HDwidget title="Conversion Rate" image={conversion} price={dashboardItems?.conversionRate + '%'} />
        </div>
        <div className="col-md-3">
          <HDwidget
            title="Incremental Revenue "
            image={increment}
            price={CurrencyConvertorInt(dashboardItems?.incrementalRevenue, true)}
          />
        </div>

        <div className="col-md-3">
          <HDwidget
            title="Revenue Collected "
            image={revenue}
            price={CurrencyConvertorInt(dashboardItems?.revenueCollected, true)}
          />
        </div>

        <div className="col-md-3">
          <HDwidget title="Live Packages " image={livepackages} price={dashboardItems?.livePackages} />
        </div>

        <div className="col-md-3">
          <HDwidget
            title="Average Days to collect"
            image={collectDay}
            price={dashboardItems?.avarageDaystoCollect + 'Days'}
          />
        </div>
      </div>

      <div className="row">
        {/* Service Offered */}
        <div className="col-md-4 p-3 m-2 LatoRegular">
          <h5 className="font-weight-bold">Service Offered</h5>
          <ul className="hd-boxcover list-group p-3">
            {dashboardItems?.servicesOffered.map((service, index) => (
              <li className="list-inline-item h6 list-dashboard-li" key={index}>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* top package sold */}
        <div className="col-md-4 p-3 m-2 LatoRegular">
          <h5 className="font-weight-bold">Top Packages Sold</h5>
          <ul className="hd-boxcover list-group p-3">
            {dashboardItems?.topPackagesSold.map((soldPackage, index) => (
              <li className="list-inline h6 list-dashboard-li" key={index}>
                {soldPackage.name} <span className=" float-right list-right-res "> {soldPackage.sales} Sold</span>{' '}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HospitalDashboard
