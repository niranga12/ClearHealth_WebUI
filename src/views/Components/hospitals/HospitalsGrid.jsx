import React from 'react'
import MetaTitles from 'src/views/common/metaTitles';
import HospitalTable from './HospitalTable';

const HospitalsGrid = () => {
    return (
        <div className="card  cover-content pt-2 ">
             {/* for addeing page metas  */}
            <MetaTitles title="Clear Health | Hospital" description=" Hospital  "/>
            <HospitalTable/>
            
        </div>
    )
}

export default HospitalsGrid;
