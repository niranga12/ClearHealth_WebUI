import React from 'react'
import MetaTitles from 'src/views/common/metaTitles'
// import HealthPagination from './healthPagination';
import HealthTable from './HealthTable'
// import Table from './Table'

const HealthSystemGrid = () => {
  return (
    <div className="card  cover-content  pt-2">
      <MetaTitles title="Clear Health || Health System " description=" Health Systems " />
      <HealthTable />
    </div>
  )
}
export default HealthSystemGrid
