/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';
import {getGlobalPackageByHospitalId} from 'src/service/hospitalsService';
import { useDispatch } from 'react-redux';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import { CurrencyFormat } from 'src/reusable';

const GlobalToolTable = ({filterDetail}) => {
	const [globalPackage, setGlobalPackage] = useState([]);
    const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setGlobalPackage([]);
				if (filterDetail.serviceType && filterDetail.hospitalSearch) {
                    dispatch(loaderShow());

					let data = {serviceType: filterDetail.serviceType};
					let result = await getGlobalPackageByHospitalId(filterDetail.hospitalSearch, data);
					setGlobalPackage(result.data.data);

					 if(filterDetail.enhancementRate){

					  CalculationPackage(filterDetail.enhancementRate);

					 }
                     dispatch(loaderHide());
				}
			} catch (error) {}
		};
		fetchData();
	}, [filterDetail]);




    const CalculationPackage=(enhancementPercentage)=>{
        let updatedData =   globalPackage.map(x=>{
           let packagesTotal =Number(x.optimizedFacilityRate)+Number(x.optimizedPhysicianRate)+Number(x.anesthesiaRate)+Number(x.pathologyRate);
           let clearFees=(packagesTotal*Number(enhancementPercentage)/100);
           let total=packagesTotal+clearFees;
        //    let newClearFees = ( Number(x[enhancementField])*(Number(enhancementPercentage)/100) )+ Number(x[enhancementField]);
        return {...x,clearTransactionalFee:clearFees, packagePrice:total }
       
           });
           // console.log(updatedData);
           setGlobalPackage(updatedData)
       
       
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
				disableSortBy: true,
				accessor: 'code', // accessor is the "key" in the data
				
			},
			{
				
				Header: () => (<div className="text-right oneline-th">Optimized Facility Rate</div>),
				accessor: 'optimizedFacilityRate', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) =>( <div className="text-right " > {CurrencyFormat(Number(row.original.optimizedFacilityRate),true)} </div>),	
			},
			{
				
				Header: () => (<div className="text-right oneline-th">Optimized Physician Rate</div>),
				accessor: 'optimizedPhysicianRate', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) =>( <div  className="text-right " > {CurrencyFormat(Number(row.original.optimizedPhysicianRate),true)} </div>),
			},
			{
				
				Header: () => (<div className="text-right oneline-th">Anesthesia Rate</div>),
				accessor: 'anesthesiaRate', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) =>( <div  className="text-right " > {CurrencyFormat(Number(row.original.anesthesiaRate),true)} </div>),
			},
			{
				
				Header: () => (<div className="text-right oneline-th">Pathology Rate</div>),
				accessor: 'pathologyRate', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) =>( <div  className="text-right "> {CurrencyFormat(Number(row.original.pathologyRate),true)} </div>),
			},
			{
			
				Header: () => (<div className="text-right oneline-th">Clear Transactional Fee</div>),
				
				accessor: 'clearTransactionalFee', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) =>( <div  className="text-right " > {CurrencyFormat(Number(row.original.clearTransactionalFee),true)} </div>),
			},
			{
				
				Header: () => (<div className="text-right oneline-th">Package Price</div>),
				accessor: 'packagePrice', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) =>( <div  className="text-right " > {CurrencyFormat(Number(row.original.packagePrice),true)} </div>),
			},
		],
		[]
	);

	return <DataTable columns={columns} data={globalPackage} />;
};

GlobalToolTable.propTypes = {
	filterDetail: PropTypes.any,
};
export default GlobalToolTable;
