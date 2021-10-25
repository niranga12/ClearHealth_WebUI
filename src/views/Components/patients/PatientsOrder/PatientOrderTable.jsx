import React, {useEffect, useMemo, useState} from 'react';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';
import moment from 'moment';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';

function ActionPatientOrder({row}) {
	// let history = useHistory();
	// const [editPE, setEditPE] = useState(false);
	// let permissionList= useSelector((state) => state.Permission.UiPermissions);

	// useEffect(() => {
	// 	let Permission=PermissionButton(ScreenPermissions.Hospital,ButtonPermissions.EditHospital,permissionList);
	// 	setEditPE(Permission);
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	const redirectToEdit = () => {
		// history.push({
		// 	pathname: `/hospitals/profile`,
		// 	search: `?id=${row.original.partyRoleId}`,
		// 	// state: { detail: 'some_value' }
		// });
	};

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
					<CDropdownItem onClick={redirectToEdit}>Edit </CDropdownItem>
					<CDropdownItem onClick={redirectAccount}>View </CDropdownItem>
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const viewInvoice = ({row}) => {
	return (
		<>
			<div className='rectangle-invoice'>View Invoice</div>
		</>
	);
};

const PatientOrderTable = ({orderDetails}) => {
	const [orderDetail, setorderDetail] = useState(orderDetails);

	useEffect(() => {
		setorderDetail(orderDetails);
	}, [orderDetails]);

	const searchTextChange = () => {};

	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'orders',
				accessor: 'orders', // accessor is the "key" in the data
				Cell: ({row}) => <h5 className='font-weight-normal text-black ml-4'> {row.original.orders} </h5>,
			},
			{
				Header: 'orderId',
				accessor: 'orderId',
			},

			{
				Header: 'orderDate',
				accessor: 'orderDate',
				Cell: ({row}) => <div className='font-weight-normal text-black '> {moment(row.original.orderDate).format('MM-DD-YYYY')} </div>,
			},
			{
				Header: 'refferingProvider',
				accessor: 'refferingProvider',
			},
			{
				Header: 'status',
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
};
export default PatientOrderTable;
