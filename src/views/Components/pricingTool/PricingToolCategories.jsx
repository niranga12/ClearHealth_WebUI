/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { csvOptions, Packages } from 'src/reusable/enum'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { ExportToCsv } from 'export-to-csv'
import 'font-awesome/css/font-awesome.min.css'

const PricingToolCategories = ({ handlePackageChange }) => {
  const [current, setCurrent] = useState(1)
  const price = useSelector((state) => state.Pricing)

  useEffect(() => {
    handlePackageChange(current)
  }, [current])

  const excelDownload = () => {
    if (price.feeSchedule.length > 0) {
      // let res=Packages.find(x=>x.id == price.package).name;
      let fileName = `${price.packageName}-${price.filterDetail.hospitalName}-${price.filterDetail.serviceTypeName}`

      //format object name same as grid
      let priceSchedule = price.feeSchedule.map((x) => {
        let res = { procedure: x.description, PrimaryCPT: x.code, ...x }
        delete res.description
        delete res.code
        return res
      })

      let option = { ...csvOptions, filename: fileName }
      const csvExporter = new ExportToCsv(option)
      csvExporter.generateCsv(priceSchedule)
    }
  }

  return (
    <div className="row">
      <div className="col-md-9 p-4">
        <ul className="list-unstyled ">
          {Packages.map((item, index) => (
            <li
              key={index}
              className={`float-left list-cat-pricing ${current == item.id ? 'active' : ''}`}
              onClick={() => setCurrent(item.id)}
            >
              {' '}
              {item.name}{' '}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-3 pt-4">
        <button className="btn btn-primary float-right" onClick={excelDownload}>
          {' '}
          <span className="fa fa-file-excel-o mr-1"></span> Export Excel
        </button>
      </div>
    </div>
  )
}

PricingToolCategories.propTypes = {
  handlePackageChange: PropTypes.func
}

export default PricingToolCategories
