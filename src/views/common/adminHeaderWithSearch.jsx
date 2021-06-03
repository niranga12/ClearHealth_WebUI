import React from 'react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import 'font-awesome/css/font-awesome.min.css';

const AdminHeaderWithSearch = ({handleSearchChange,handleAddNew, placeholder="&#xF002;",buttonTitle="Add New", showCount=0}) => {
  
    return (
        <div>
             <div className="row mb-2 LatoRegular mt-4 mb-3 pl-3 pr-3">
            <div className="col-md-6">
                <div className="component-header">Health Systems {showCount > 0 ? <span className="count-box">{showCount}</span>:'' } </div>
            </div>
            <div className="col-md-6">
                   
                    <button type="button" className="btn btn-primary float-right ml-3 text-white"  onClick={handleAddNew}> <CIcon content={freeSet.cilPlus}/> {buttonTitle}</button>
                    <input type="text"  onChange={handleSearchChange}  className="float-right form-control-sm w-50 mt-1 fa " placeholder={placeholder} />
            </div>
            
        </div>
        </div>
    )
}

export default AdminHeaderWithSearch;
