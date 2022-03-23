/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, {useEffect, useMemo, useState} from 'react';
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';
import {getFacilityPackageByHospitalId} from 'src/service/hospitalsService';
import {FacilityPackageField, PackageItems, Packages} from 'src/reusable/enum';
import {useDispatch, useSelector} from 'react-redux';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {CurrencyFormat} from 'src/reusable';
import {SHOW_PRICE_DATA} from 'src/constansts';
import PricingSingleEdit from './pricingSingleEdit';

const FacilityToolTable = ({filterDetail}) => {
	const [facitlityData, setFacitlityData] = useState([]);
	// const [isEdit, setIsEdit] = useState(true);

	// const [selectedFilterDetail, setSelectedFilterDetail] = useState(filterDetail);
	const dispatch = useDispatch();
	let isFeeSchedule = useSelector((state) => state.FeeSchedule.resetFeeSchedule);

	useEffect(() => {
		// setSelectedFilterDetail(filterDetail);
	
		const fetchData = async () => {
			try {
				if (filterDetail.serviceType && filterDetail.hospitalId) {
					dispatch(loaderShow());
					let data = {serviceType: filterDetail.serviceType};
					let result = await getFacilityPackageByHospitalId(filterDetail.hospitalId, data);

				
				  setFacitlityData(result.data.data);
				

					if (filterDetail.enhancementRate && filterDetail.enhancementOn) {
						let fieldName = FacilityPackageField.find((x) => x.id == filterDetail.enhancementOn).value;
						CalculationPackage(filterDetail.enhancementRate, fieldName);
					}
					dispatch(loaderHide());
				}
			} catch (error) {}
		};
		fetchData();
	}, [filterDetail, isFeeSchedule]);

	useEffect(() => {
		let packageName = Packages.find((x) => x.id == PackageItems.Facility).name;
		let data = {feeSchedule: facitlityData, packageName, filterDetail};

		dispatch({
			type: SHOW_PRICE_DATA,
			payload: data,
		});
	}, [facitlityData]);

	const CalculationPackage = (enhancementPercentage, enhancementField) => {
		let updatedData = facitlityData.map((x) => {
			let newClearFees = Number(x[enhancementField]) * (Number(enhancementPercentage) / 100) + Number(x[enhancementField]);
			return {...x, clearOptimizedFee: newClearFees};
		});
		

		setFacitlityData(updatedData);
	};

	function CellAction({row}) {
		

		return <> <PricingSingleEdit row={row} category={PackageItems.Facility}  /></>;
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
				Header: () => <div className=' oneline-th'>Primary CPT</div>,
				disableSortBy: true,
				accessor: 'code', // accessor is the "key" in the data
			},
			{
				Header: () => <div className='text-right oneline-th'>Medicare Rate</div>,
				accessor: 'medicareRate', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) => <div className='text-right pr-3'> {CurrencyFormat(Number(row.original.medicareRate), true)} </div>,
			},
			{
				Header: () => <div className='text-right oneline-th'>Hospital Collection</div>,
				accessor: 'hospitalCollectionFee', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) => <div className='text-right pr-3'> {CurrencyFormat(Number(row.original.hospitalCollectionFee), true)} </div>,
			},
			{
				Header: () => <div className='text-right oneline-th'>Estimated pay later price </div>,
				accessor: 'estimatedPayLaterPrice', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) => <div className='text-right pr-3'> {CurrencyFormat(Number(row.original.estimatedPayLaterPrice), true)} </div>,
			},
			{
				Header: () => <div className='text-right oneline-th'>Clear Optimized Price</div>,
				accessor: 'clearOptimizedFee', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ({row}) => <div className='text-right pr-3'> {CurrencyFormat(Number(row.original.clearOptimizedFee), true)} </div>,
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

	return <DataTable columns={columns} data={facitlityData} />;
};

FacilityToolTable.propTypes = {
	filterDetail: PropTypes.any,
};

export default FacilityToolTable;
