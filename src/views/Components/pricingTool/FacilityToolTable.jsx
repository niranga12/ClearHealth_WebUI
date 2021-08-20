import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';
import { getFacilityPackageByHospitalId } from 'src/service/hospitalsService';
import { FacilityPackageField } from 'src/reusable/enum';
import { useDispatch } from 'react-redux';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import { CurrencyFormat } from 'src/reusable';


const FacilityToolTable = ({filterDetail}) => {

    const [facitlityData, setFacitlityData] = useState([]);
const dispatch = useDispatch()


useEffect(() => {
  
const fetchData= async()=>{
    try {
       
	
        if(filterDetail.serviceType && filterDetail.hospitalSearch){
            dispatch(loaderShow());
         let data=   { serviceType : filterDetail.serviceType}
         let result= await getFacilityPackageByHospitalId(filterDetail.hospitalSearch,data);
         setFacitlityData(result.data.data);
         
         if(filterDetail.enhancementRate && filterDetail.enhancementOn){
          let fieldName=  FacilityPackageField.find(x=>x.id==filterDetail.enhancementOn).value;
          CalculationPackage(filterDetail.enhancementRate , fieldName);

         }
         dispatch(loaderHide());
        }
       
        
    } catch (error) {
        
    }

}
fetchData();
    
}, [filterDetail])


const CalculationPackage=(enhancementPercentage,enhancementField)=>{
 let updatedData =   facitlityData.map(x=>{
    let newClearFees = ( Number(x[enhancementField])*(Number(enhancementPercentage)/100) )+ Number(x[enhancementField]);
    return {...x,clearOptimizedFee:newClearFees}

    });
    // console.log(updatedData);
    setFacitlityData(updatedData)


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
            Cell: ({row}) =>( <div  className="text-right pr-3" > {CurrencyFormat(Number(row.original.medicareRate),true)} </div>),
	
           
        },
        {
            
            Header: () => (<div className="text-right">Hospital Collection</div>),
            accessor: 'hospitalCollectionFee', // accessor is the "key" in the data
            Cell: ({row}) =>( <div  className="text-right pr-3" > {CurrencyFormat(Number(row.original.hospitalCollectionFee),true)} </div>),
	
           
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
        <DataTable columns={columns} data={facitlityData}  />
    )
}




FacilityToolTable.propTypes = {
    filterDetail:PropTypes.any
};

export default FacilityToolTable;
