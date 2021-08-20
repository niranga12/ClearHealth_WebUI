/* eslint-disable eqeqeq */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {notify} from 'reapop';

import {FacilityPackageField, PackageItems, PhysicianPackageField, ServiceMsg} from 'src/reusable/enum';
import {updateFacilityPackage, updateGlobalPackage, updatePhysicianPackage} from 'src/service/hospitalsService';
import OnError from 'src/_helpers/onerror';
import FacilityToolTable from './FacilityToolTable';
import GlobalToolTable from './GlobalToolTable';
import PhysicianToolTable from './PhysicianToolTable';
import PricingToolCategories from './PricingToolCategories';
import PricingToolFilter from './PricingToolFilter';

const PricingToolGrid = () => {
	const [isNotGlobal, setIsNotGlobal] = useState(false);
	const [fieldsList, setIsFieldsList] = useState([]);
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [filterDetails, setfilterDetails] = useState();
	const [hospitalId, setHospitalId] = useState(null);
	const location = useLocation();

	const dispatch = useDispatch();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		setHospitalId(id);
	}, [location]);

	const loadSelectedTable = () => {
		switch (selectedPackage) {
			case PackageItems.Facility:
				return <FacilityToolTable filterDetail={filterDetails} />;
			case PackageItems.Physician:
				return <PhysicianToolTable filterDetail={filterDetails} />;
			case PackageItems.GlobalPackage:
				return <GlobalToolTable filterDetail={filterDetails} />;
			default:
				break;
		}
	};

	const handlePackageChange = (value) => {
		setSelectedPackage(value);
		setfilterDetails(null);
		PackageItems.GlobalPackage == value ? setIsNotGlobal(false) : setIsNotGlobal(true);

		switch (value) {
			case PackageItems.Facility:
				setIsFieldsList(FacilityPackageField);
				break;
			case PackageItems.Physician:
				setIsFieldsList(PhysicianPackageField);
				break;
			default:
				setIsFieldsList([]);
				break;
		}
	};

	const handleFilterChange = (e) => {
		setfilterDetails(e);
	};

	const saveChange = (data) => {
		switch (selectedPackage) {
			case PackageItems.Facility:
				updateFacility(data);
				break;
			case PackageItems.Physician:
				updatePhysician(data);
				break;
			case PackageItems.GlobalPackage:
				updateGlobal(data);
				break;
			default:
				break;
		}
		
	};

	const updateFacility = async (value) => {
		// value.hospitalSearch
		try {
			let data = {enhancementRate: value.enhancementRate, enhancementOn: value.enhancement};
			let result = await updateFacilityPackage(value.hospitalSearch, data);
			if (result.data.message === ServiceMsg.OK) {
				dispatch(notify(`Successfully Updated`, 'success'));
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const updatePhysician = async (value) => {
		try {
			let data = {enhancementRate: value.enhancementRate, enhancementOn: value.enhancement};
			let result = await updatePhysicianPackage(value.hospitalSearch, data);
			if (result.data.message === ServiceMsg.OK) {
				dispatch(notify(`Successfully Updated`, 'success'));
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const updateGlobal = async (value) => {
		try {
			let data = {enhancementRate: value.enhancementRate};
			let result = await updateGlobalPackage(value.hospitalSearch, data);
			if (result.data.message === ServiceMsg.OK) {
				dispatch(notify(`Successfully Updated`, 'success'));
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	return (
		<>
		  <div className={`${hospitalId ? "" : "card  cover-content pt-2 "}`}    >
			<PricingToolFilter isNotGlobal={isNotGlobal} fieldsList={fieldsList} handleFilterChange={handleFilterChange} saveChange={saveChange} selectedPackage={selectedPackage} />
			<PricingToolCategories handlePackageChange={handlePackageChange} />
			{loadSelectedTable()}

			</div>
		</>
	);
};

export default PricingToolGrid;
