import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'src/views/common/dataTable';
import { PhysicianPackageField } from 'src/reusable/enum';
import { getPhysicianPackageByHospitalId } from 'src/service/hospitalsService';
import { useDispatch } from 'react-redux';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import { CurrencyFormat } from 'src/reusable';


const PhysicianToolTable = ({filterDetail}) => {
    const [physicianData, setPhysicianData] = useState([]);
    const dispatch = useDispatch();


    
useEffect(() => {
  
    const fetchData= async()=>{
        try {
           
            if(filterDetail.serviceType && filterDetail.hospitalSearch){
                dispatch(loaderShow());
             let data=   { serviceType : filterDetail.serviceType}
             let result= await getPhysicianPackageByHospitalId(filterDetail.hospitalSearch,data);
             setPhysicianData(result.data.data);
             
             if(filterDetail.enhancementRate && filterDetail.enhancementOn){
              let fieldName=   PhysicianPackageField.find(x=>x.id==filterDetail.enhancementOn).value;
              CalculationPackage(filterDetail.enhancementRate , fieldName);
    
             }
             dispatch(loaderHide());
            }
          
        } catch (error) {
            
        }
    
    }
    fetchData();
        
    }, [filterDetail])




    const CalculationPackage=(enhancementPercentage,enhancementField) => {
        let updatedData =   physicianData.map(x=>{
           let newClearFees = ( Number(x[enhancementField])*(Number(enhancementPercentage)/100) )+ Number(x[enhancementField]);
           return {...x,clearOptimizedFee:newClearFees}
           });
         
           setPhysicianData(updatedData)

       }

   // for table
//SETTING COLUMNS NAMES
const columns = useMemo(

    () => [
        {
            Header: 'procedure',
            accessor: 'description', // accessor is the "key" in the data
            Cell: ({value}) => <h5 className='font-weight-normal text-black ml-4'> {value} </h5>,
        },
        {
            Header: 'primaryCPT',
            accessor: 'code', // accessor is the "key" in the data   
        },
        {  
            Header: () => (<div className="text-right">Medicare Rate</div>),
            accessor: 'medicareRate', // accessor is the "key" in the data
            Cell: ({row}) =>( <div  className="text-right" > {CurrencyFormat(Number(row.original.medicareRate),true)} </div>),
            
           
        },
        {
           
            Header: () => (<div className="text-right">Physician Collection</div>),
            accessor: 'physicianCollectionFee', // accessor is the "key" in the data
            Cell: ({row}) =>( <div  className="text-right " > {CurrencyFormat(Number(row.original.physicianCollectionFee),true)} </div>),
           
           
        },
        {
          
            Header: () => (<div className="text-right">Clear Optimized Price</div>),
            accessor: 'clearOptimizedFee', // accessor is the "key" in the data
            Cell: ({row}) =>( <div  className="text-right pr-3" > {CurrencyFormat(Number(row.original.clearOptimizedFee),true)} </div>),
            
           
        },
          
        
    ],
    []
);

    return (
        <DataTable columns={columns} data={physicianData}  />
    )
}



PhysicianToolTable.propTypes = {
    filterDetail:PropTypes.any
};
export default PhysicianToolTable
