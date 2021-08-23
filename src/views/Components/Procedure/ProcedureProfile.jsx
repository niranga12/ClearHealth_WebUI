import {freeSet} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {notify} from 'reapop';
import {loaderHide, loaderShow} from 'src/actions/loaderAction';
import {ServiceMsg, ServiceType} from 'src/reusable/enum';
import {getProcedureByProvideId, saveProcedureByProviderId} from 'src/service/providerService';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import DataTable from 'src/views/common/dataTable';
import OnError from 'src/_helpers/onerror';
import ProcedureForm from './ProcedureForm';

const initialSearch = {
	serviceTypeId: '',
	searchTerm: '',
};

const ProcedureProfile = () => {
	const location = useLocation();
	const [providerName, setProviderName] = useState('');
	const [providerId, setProviderId] = useState('');

	const [searchQuery, setSearchQuery] = useState(initialSearch);
	const [procedureData, setProcedureData] = useState([]);
	const [deleteProcedureList, setDeleteProcedureList] = useState([]);
	const [addProcedureList, setAddProcedureList] = useState([]);
	const [savePrcoedureData, setSavePrcoedureData] = useState([]);

	const dispatch = useDispatch();
	let history = useHistory();

	// AdminHeaderWithSearch
	const searchTextChange = (e) => {};

	const dropDownChange = (e) => {
		let updateSearch = {...searchQuery, serviceTypeId: e.target.value};

		setSearchQuery(updateSearch);
	};

	// getting all Codes from API with selected Type
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const ProviderName = params.get('providerName');
		const proId = params.get('providerId');

		setProviderName(ProviderName);
		setProviderId(proId);
		const fetchData = async () => {
			try {
				dispatch(loaderShow());
				const result = await getProcedureByProvideId(proId, searchQuery);
				setProcedureData(result.data.data);
				dispatch(loaderHide());
			} catch (error) {}
		};

		fetchData();
	}, [location, searchQuery]);

	// set addProcedures set   to right form
	useEffect(() => {
		let newData = [...addProcedureList, deleteProcedureList];
		let listProcedure = newData.filter((value) => Object.keys(value).length !== 0);
		let listProcedureWithServiceType = listProcedure.map((x) => {
			return {...x, serviceType: Number(searchQuery.serviceTypeId)};
		});
		setAddProcedureList(listProcedureWithServiceType);
	}, [deleteProcedureList]);

	// from list add  set delete record from list and add it to  right data
	const addCodes = (value, data) => {
		if (value.original.Id) {
			//  let addedServiceType={...value.original,serviceType:searchQuery.serviceTypeId}
			// setDeleteProcedureList(addedServiceType);
			setDeleteProcedureList(value.original);

			setProcedureData(data.filter((item) => item.Id !== value.original.Id));
		}
	};

	const ActionProcedure = ({row, data}) => {
		// console.log(procedureData)

		return (
			<>
				<button className='btn btn-primary min-width-70p' onClick={() => addCodes(row, data)}>
					{' '}
					<CIcon content={freeSet.cilPlus} color='white' className='add-icon-set' /> Add
				</button>
			</>
		);
	};

	// form on change organize data with values
	const handleSave = (detail) => {
		let existData = savePrcoedureData.findIndex((item) => item.Id === detail.Id);
		if (existData >= 0) {
			savePrcoedureData[existData] = detail;
			setSavePrcoedureData(savePrcoedureData);
		} else {
			let saveData = [...savePrcoedureData, detail];
			setSavePrcoedureData(saveData);
		}
	};

	//  add api to save save
	const save = async () => {
		let checkEmptyData = savePrcoedureData;
		let emptyData = checkEmptyData.filter((x) => {
			return !x.facility && !x.physician ? true : false;
		}); // this following conditon for radiology

		if (emptyData.length > 0) {
			dispatch(notify(`Please update Empty field`, 'error'));
		} else {
			try {
				let saveProcedure = {procedures: savePrcoedureData};
				const result = await saveProcedureByProviderId(providerId, saveProcedure);
				if (result.data.message === ServiceMsg.OK) {
					dispatch(notify(`Successfully updated`, 'success'));
					history.push('/hospitals');
				}
			} catch (error) {
				OnError(error, dispatch);
			}
		}
	};

	// for table
	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'CPT',
				accessor: 'code', // accessor is the "key" in the data
				Cell: ({value}) => <h5 className='font-weight-normal text-black ml-4'> {value} </h5>,
			},
			{
				Header: 'Procedure',
				accessor: 'description', // accessor is the "key" in the data
				Cell: ({value}) => <h5 className='font-weight-normal text-black'> {value} </h5>,
			},

			{
				Header: '',
				accessor: 'id',
				disableSortBy: true,
				// accessor: '[row identifier to be passed to button]',
				Cell: ActionProcedure,
			},
		],
		[]
	);

	return (
		<div className='card  cover-content pt-2 '>
			<AdminHeaderWithSearch title={providerName} handleSearchChange={searchTextChange} selectionList={ServiceType.Types} handleDropDownChange={dropDownChange} placeholder='Search here..' selectionTitle='Service Type' subHeader='Provider Name' />
			<div className='divider m-1'></div>
			<div className='row'>
				<div className='col-md-4 '>
					<DataTable columns={columns} data={procedureData} />
				</div>
				<div className='col-md-8 divder-left '>
					<div className='row'>
						<div className='col-md-12'>
							<button className='btn btn-primary float-right mr-3 mb-2 mt-2 col-md-3' disabled={savePrcoedureData.length < 1} onClick={save}>
								{' '}
								Save
							</button>
						</div>
					</div>

					{addProcedureList.map((item) => (
						<ProcedureForm key={item.Id} data={item} handleSave={handleSave} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProcedureProfile;
