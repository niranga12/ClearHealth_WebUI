/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Select from 'react-select';
import {getCPTCodesByHospital} from 'src/service/hospitalsService';
import DataTable from 'src/views/common/dataTable';
import OnError from 'src/_helpers/onerror';
import PropTypes from 'prop-types';

const OrderProcedureSelect = ({handleCPTChange}) => {
	const location = useLocation();
	const dispatch = useDispatch();

	const [selectedCPT, setSelectedCPT] = useState([]);
	const [cptList, setCptList] = useState([]);

	const handleChange = (newValue: any, actionMeta: any) => {
		setSelectedCPT(newValue);
		handleCPTChange(newValue);
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const hospitalId = params.get('hospitalId');

		const fetchData = async () => {
			try {
				let result = await getCPTCodesByHospital(hospitalId, {});
				setCptList(result.data.data);
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
	}, [location]);

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'CPT Code',
				accessor: 'code', // accessor is the "key" in the data
			},
			{
				Header: 'CPT Name',
				accessor: 'description', // accessor is the "key" in the data
			},
		],
		[]
	);

	return (
		<div className='row'>
			<div className='col-md-10 mb-3'>
				<label className='mr-4 float-left pt-2'>CPT Code </label>
				<Select options={cptList} closeMenuOnSelect={false} onChange={handleChange} isMulti getOptionLabel={(option) => `${option.code} - ${option.description}`} getOptionValue={(option) => `${option.Id}`} />
			</div>
			<div className='col-md-12'>
				<DataTable columns={columns} data={selectedCPT} />
			</div>
		</div>
	);
};

OrderProcedureSelect.propTypes = {
	handleCPTChange: PropTypes.func,
};

export default OrderProcedureSelect;
