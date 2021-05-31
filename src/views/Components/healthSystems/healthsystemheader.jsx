import React from 'react'

import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import 'font-awesome/css/font-awesome.min.css';
 
const HealthSystemHeader = () => {
    return (
        <div className="row mb-2 LatoRegular mt-4 mb-3 pl-3 pr-3">
            <div className="col-md-6">
                <div className="component-header">Health Systems</div>
            </div>
            <div className="col-md-6">
                   
                    <button className="btn btn-primary float-right ml-3 text-white"> <CIcon content={freeSet.cilPlus}/> New Health System</button>
                    <input type="text"  className="float-right form-control-sm w-50 mt-1 fa " placeholder="&#xF002; Search Patient name order no" />
            </div>
            
        </div>
    )
}

export default HealthSystemHeader;

