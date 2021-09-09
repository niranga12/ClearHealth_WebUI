import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react';
import React, {useEffect, useMemo, useState} from 'react';
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';



const serviceDetail = ({row}) => {
	return (
		<>
			<div className='pl-4'>
				<h5 className='font-weight-normal text-black'>{row.original.description}</h5>
				<div className='rectangle-intable'>{row.original.facilityName}</div>
			</div>
		</>
	);
};

function ActionOrderSystem({row}) {
	// let history = useHistory();

	const redirectToEdit = () => {
		// history.push();
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
					<CDropdownItem onClick={redirectToEdit}>Edit</CDropdownItem>
					<CDropdownItem>Delete</CDropdownItem>
				</CDropdownMenu>
			</CDropdown>
		</>
	);
}

const OrderList = ({orderDetail}) => {
	const [order, setOrder] = useState(orderDetail);
	const [orderData, setOrderData] = useState([]);

	useEffect(() => {
		setOrder(orderDetail);
	}, [orderDetail]);

	useEffect(() => {
		let facilityName = order?.orderPatientDetails?.facilityName;
		let result = order?.orderDetails.map((x) => {
			return {...x, facilityName};
		});
		setOrderData(result);
	}, [order]);

	// for table
	//SETTING COLUMNS NAMES
	const columns = useMemo(
		() => [
			{
				Header: 'service',
				accessor: 'description', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: serviceDetail,
			},
			{
				Header: 'CPT',
				accessor: 'code',
			},
			{
				Header: 'EHRAccNum',
				accessor: 'EHRAccNum',
			},
			{
				Header: 'Ref',
				accessor: 'Ref',
			},
			{
				Header: 'Price',
				accessor: 'packagePrice',
			},

			{
				Header: 'Action',
				accessor: '', // accessor is the "key" in the data
				disableSortBy: true,
				Cell: ActionOrderSystem,
			},
		],
		[]
	);

	return (
		<div className='card  cover-content pt-2 '>
			<div className='card-header border-none'>
				<div className='row'>
					<div className='col-md-6  '>
						<div className='h4 mb-1 text-black'>Order #{order?.orderPatientDetails?.orderNumber}</div>
						<div>{order?.orderPatientDetails?.orderDate}</div>
					</div>

					<div className='col-md-6'>
						<div className='btn btn-view-account ml-3 float-right'>Approve</div>
					</div>
				</div>
			</div>

			<div className='card-body p-0'>{orderData && <DataTable columns={columns} data={orderData} />}</div>
		</div>
	);
};

OrderList.propTypes = {
	orderDetail: PropTypes.any,
};
export default OrderList;
