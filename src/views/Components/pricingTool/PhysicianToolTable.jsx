/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'src/views/common/dataTable';
import { PackageItems, Packages, PhysicianPackageField } from 'src/reusable/enum';
import { getPhysicianPackageByHospitalId } from 'src/service/hospitalsService';
import { useDispatch, useSelector } from 'react-redux';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import { CurrencyFormat } from 'src/reusable';
import { SHOW_PRICE_DATA } from 'src/constansts';
import PricingSingleEdit from './pricingSingleEdit';

function CellAction({row}) {


	return (
		<>
         <PricingSingleEdit row={row} category={PackageItems.Physician}/>			
		</> 
	);
}


const PhysicianToolTable = ({filterDetail}) => {
    const [physicianData, setPhysicianData] = useState([]);
    const dispatch = useDispatch();
    let isFeeSchedule = useSelector((state) => state.FeeSchedule.resetFeeSchedule);

    
useEffect(() => {
  
    const fetchData= async()=>{
        try {
           
            if(filterDetail.serviceType && filterDetail.hospitalId){
                dispatch(loaderShow());
             let data=   { serviceType : filterDetail.serviceType, providerPartyRoleID: filterDetail.provider}
             let result= await getPhysicianPackageByHospitalId(filterDetail.hospitalId,data);
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
        
    }, [filterDetail,isFeeSchedule])



    
useEffect(() => {
    
    let packageName = Packages.find(x=>x.id== PackageItems.Physician).name;
    let data={feeSchedule:physicianData, packageName, filterDetail };
	
	dispatch({
		type: SHOW_PRICE_DATA,
		payload: data,
	  }); 
		
	}, [physicianData])


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
            Header: 'Procedure',
            accessor: 'description', // accessor is the "key" in the data
            disableSortBy: true,
            Cell: ({value}) => <h5 className='font-weight-normal text-black ml-4'> {value} </h5>,
        },
        {
            Header: () => (<div className=" oneline-th">Primary CPT</div>),
            accessor: 'code', // accessor is the "key" in the data   
            disableSortBy: true,
        },
        {  
            Header: () => (<div className="text-right oneline-th">Medicare Rate</div>),
            accessor: 'medicareRate', // accessor is the "key" in the data
            disableSortBy: true,
            Cell: ({row}) =>( <div  className="text-right" > {CurrencyFormat(Number(row.original.medicareRate),true)} </div>),
            
           
        },
        {
           
            Header: () => (<div className="text-right oneline-th">Physician Collection</div>),
            accessor: 'physicianCollectionFee', // accessor is the "key" in the data
            disableSortBy: true,
            Cell: ({row}) =>( <div  className="text-right " > {CurrencyFormat(Number(row.original.physicianCollectionFee),true)} </div>),
           
           
        },
        {
          
            Header: () => (<div className="text-right oneline-th">Clear Optimized Price</div>),
            accessor: 'clearOptimizedFee', // accessor is the "key" in the data
            disableSortBy: true,
            Cell: ({row}) =>( <div  className="text-right pr-3" > {CurrencyFormat(Number(row.original.clearOptimizedFee),true)} </div>),
            
           
        },
        {
            Header: () => <div className='text-right oneline-th'></div>,
            accessor: 'id', // accessor is the "key" in the data
            disableSortBy: true,
            Cell: CellAction,
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
