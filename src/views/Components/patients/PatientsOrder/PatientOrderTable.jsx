import React, {useEffect, useMemo, useState} from 'react';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';
import moment from 'moment';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';
import { useHistory } from 'react-router-dom';

function ActionPatientOrder({row}) {
	

	

	const redirectAccount = () => {
		// history.push({
		// 	pathname: `/hospitals/hospital`,
		// 	search: `?id=${row.original.partyRoleId}&&name=${row.original.name}`,
		// 	// state: { detail: 'some_value' }
		// });
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
					
					<CDropdownItem onClick={redirectAccount}>View </CDropdownItem>
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const viewInvoice = ({row}) => {

	// eslint-disable-next-line react-hooks/rules-of-hooks
	let history = useHistory();

	const redirectAccount = () => {
		
	history.push({
			pathname: `/order/view`,
			search: `?orderId=${row.original.orderId}`,
			// state: { detail: 'some_value' }
		});
	}


	return (
		<>
			<div className='rectangle-invoice' onClick={redirectAccount}>View Invoice</div>
		</>
	);
};

const PatientOrderTable = ({orderDetails,searchChange}) => {
	const [orderDetail, setorderDetail] = useState(orderDetails);

	useEffect(() => {
		setorderDetail(orderDetails);
	}, [orderDetails]);

	const searchTextChange = (e) => {
		searchChange(e.target.value);
	};

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'Orders',
				accessor: 'orders', // accessor is the "key" in the data
				Cell: ({row}) => <h5 className='font-weight-normal text-black ml-4'> {row.original.orders} </h5>,
			},
			{
				Header: 'Order Id',
				accessor: 'orderId',
			},

			{
				Header: 'Order Date',
				accessor: 'orderDate',
				Cell: ({row}) => <div className='font-weight-normal text-black '> {moment(row.original.orderDate).format('MM-DD-YYYY')} </div>,
			},
			{
				Header: 'Reffering Provider',
				accessor: 'refferingProvider',
			},
			{
				Header: 'Status',
				accessor: 'status',
			},
			{
				Header: '',
				accessor: 'patientID',
				disableSortBy: true,
				// accessor: '[row identifier to be passed to button]',
				Cell: viewInvoice,
			},
			{
				Header: '',
				accessor: 'patientPartyRoleID',
				disableSortBy: true,
				// accessor: '[row identifier to be passed to button]',
				Cell: ActionPatientOrder,
			},
		],
		[]
	);

	return (
		<div>
			<AdminHeaderWithSearch handleSearchChange={searchTextChange} placeholder='Search here..' title='Orders' />
			{orderDetail?.length>0 && <DataTable columns={columns} data={orderDetail} />}
		</div>
	);
};

PatientOrderTable.propTypes = {
	orderDetails: PropTypes.any,
	searchChange:PropTypes.func
};
export default PatientOrderTable;
