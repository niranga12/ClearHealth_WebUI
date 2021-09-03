import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'src/views/common/dataTable';

const data =[
    {
    service:"MRI UPPer Extremity W/dye",
    CPT:"CPT Code",
    EHRAccNum:"31342424",
    Ref:"Jacquline LIkoki",
    Price:"$563.00",
    Hospital:"Regional Medical Center"
},{
    service:"MRI UPPer Extremity W/dye",
    CPT:"CPT Code",
    EHRAccNum:"31342424",
    Ref:"Jacquline LIkoki",
    Price:"$563.00",
    Hospital:"Regional Medical Center"
}

]

const serviceDetail=({row})=>{
return (
    <>
    <div className="pl-4">
    <h5 className="font-weight-normal text-black">{row.original.service}</h5>
    <div className="rectangle-intable">{row.original.Hospital}</div>
    </div>
    </>
);
}



function ActionOrderSystem({row}) {
	// let history = useHistory();

	const redirectToEdit = () => {
		// history.push();
	};

	

	return (
		<>
			<CDropdown className='m-1'>
				<CDropdownToggle>
					<div className='text-center text-gray font-15re cursor-point  ml-3'>
						<span className='fa fa-ellipsis-h '></span>
					</div>
				</CDropdownToggle>
				<CDropdownMenu>
					<CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>
					<CDropdownItem >Delete</CDropdownItem>
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}



const OrderList = () => {

     // for table
//SETTING COLUMNS NAMES
const columns = useMemo(

    () => [
        {
            Header: 'service',
            accessor: 'service', // accessor is the "key" in the data
            disableSortBy: true,
            Cell: serviceDetail,
        },
        {
            Header:'CPT',
            accessor: 'CPT',
        },
        {
            Header:'EHRAccNum',
            accessor: 'EHRAccNum',
        },
        {
            Header:'Ref',
            accessor: 'Ref',
        },
        {
            Header:'Price',
            accessor: 'Price',
        },
     
       
        {
            
            Header:"Action",
            accessor: '', // accessor is the "key" in the data
            disableSortBy: true,
            Cell:ActionOrderSystem 
        },
          
        
    ],
    []
);


	return (
		<div className='card  cover-content pt-2 '>
			<div className='card-header border-none'>
				<div className='row'>
					<div className='col-md-6  '>
						<div className='h4 mb-1 text-black'>Order #990077</div>
						<div>01/18/2021</div>
					</div>

                    <div className="col-md-6">
                      <div className='btn btn-view-account ml-3 float-right'>Approve</div>
                    </div>
				</div>
			</div>

            <div className="card-body p-0">
            <DataTable columns={columns} data={data}  />
            </div>

		</div>
	);
};

export default OrderList;
