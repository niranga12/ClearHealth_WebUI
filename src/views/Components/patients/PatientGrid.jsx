import React from 'react'
import MetaTitles from 'src/views/common/metaTitles'
import PatientTable from './PatientTable'

const PatientGrid = () => {
  return (
    <div className="card  cover-content pt-2 ">
      '{/* for addeing page metas  */}
      <MetaTitles title="Clear Health | Patients" description=" Patients  " />
      <PatientTable />
    </div>
  )
}

export default PatientGrid
