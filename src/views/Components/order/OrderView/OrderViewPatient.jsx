import React, { useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';


const OrderViewPatient = () => {
        const [isEdit, setisEdit] = useState(false);


    const editButton=()=>{
        return (
            <button className="btn btn-primary float-right ml-3 text-white" onClick={()=>setisEdit(true)}> <span className="fa fa-x fa-pencil pr-2"></span> <span>Edit Details</span></button>
        )

    }    

    const saveButton=()=>{
        return (
            <button className="btn btn-primary float-right ml-3 text-white" onClick={()=>setisEdit(false)}> <span className="fa fa-x fa-save pr-2"></span> <span>Update Details</span></button>
        )

    }  


    return (
       <div className="card  cover-content pt-2 ">
           <div className="card-header">
               <div className="row">
                   <div className="col-md-6 component-header ">   Tittle </div>
                   <div className="col-md-6">
                       {isEdit ? saveButton(): editButton()}
                   </div>
               </div>      
           </div>
            <div className="card-body pb-0">

                <div className="row">
                {/*First Name */}
                    <div className="col-md-2">
                    <div className='form-group'>
							<label className='form-text'> First Name <span className='text-danger font-weight-bold '>*</span>{' '}</label>
						{isEdit? <input className='form-control-sm' type='text'  /> : <div className="h5">First Name</div> }
   	
						</div>
					</div>

                    {/*Middle Name */}
                    <div className="col-md-2">
                    <div className='form-group'>
							<label className='form-text'> Middle Name <span className='text-danger font-weight-bold '>*</span>{' '}</label>
                            {isEdit? <input className='form-control-sm' type='text'  /> : <div className="h5">Middle Name </div> }
						</div>
					</div>

                    {/*Last Name */}
                    <div className="col-md-2">
                    <div className='form-group'>
							<label className='form-text'> Last Name <span className='text-danger font-weight-bold '>*</span>{' '}</label>
                            {isEdit? <input className='form-control-sm' type='text'  /> : <div className="h5"> Last Name</div> }
						</div>
					</div>

                    {/* Date Of Birth */}

                    <div className="col-md-2">
                    <div className='form-group'>
							<label className='form-text'>	Date Of Birth <span className='text-danger font-weight-bold '>*</span>{' '}</label>
							{isEdit? <input className='form-control-sm' type='text'  /> : <div className="h5">Date Of Birth</div> }
						</div>
                    </div>

                      {/* Email*/}
                    <div className="col-md-2">
                    <div className='form-group'>
							<label className='form-text'>	Email <span className='text-danger font-weight-bold '>*</span>{' '}</label>
                            {isEdit? <input className='form-control-sm' type='text'  /> : <div className="h5">Email</div> }
						</div>
                    </div>
           {/* Phone*/}
                    <div className="col-md-2">
                    <div className='form-group'>
							<label className='form-text'>	Phone <span className='text-danger font-weight-bold '>*</span>{' '}</label>
                            {isEdit? <input className='form-control-sm' type='text'  /> : <div className="h5">Phone</div> }
						</div>
                    </div>
                   

                </div>
            </div>
            </div>

    
    )
}

export default OrderViewPatient
