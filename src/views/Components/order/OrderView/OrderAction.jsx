/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { useLocation } from 'react-router';
import { deleteOrderCpt, updateOrder } from 'src/service/orderService';
import { ServiceMsg } from 'src/reusable/enum';
import { useDispatch } from 'react-redux';
import { notify } from 'reapop';
import OnError from 'src/_helpers/onerror';
import { changeOrder } from 'src/actions/orderAction';
import OrderActionEdit from './OrderActionEdit';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';

const OrderAction = ({ row }) => {
	const [modal, setModal] = useState(false);
	const [primary, setPrimary] = useState(false);
	const [updateData, setUpdateData] = useState(null);

	const location = useLocation();
	const [orderId, setOrderId] = useState(null);
	const dispatch = useDispatch();
	let btnRef = useRef();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const id = params.get('orderId');
		setOrderId(id);
		if (btnRef.current) {
			btnRef.current.removeAttribute('disabled');
		}

	}, [location]);

	const deleteOrder = async () => {
		try {
			let result = await deleteOrderCpt(orderId, row.original.orderDetailId);
			if (result.data.message == ServiceMsg.OK) {
				dispatch(notify(`Successfully Deleted`, 'success'));
				dispatch(changeOrder());
				setModal(false);
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const redirectToEdit = () => {
		setPrimary(!primary);
	};


	const update = async () => {
		if (btnRef.current) {
			btnRef.current.setAttribute('disabled', 'disabled');
		}
		try {
			dispatch(loaderShow());
			// btnRef.current.setAttribute('disabled', 'disabled');
			let result = await updateOrder(orderId, updateData);
			if (result.data.message == ServiceMsg.OK) {
				dispatch(loaderHide());
				dispatch(notify(`Successfully updated`, 'success'));
				dispatch(changeOrder());
				setPrimary(false);
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const editCpt = (detail) => {
		setUpdateData(detail);
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
					<CDropdownItem onClick={() => setModal(!modal)}>Delete</CDropdownItem>
				</CDropdownMenu>
			</CDropdown>

			<CModal show={modal} onClose={setModal} >
				<CModalHeader closeButton>
					<CModalTitle>Delete</CModalTitle>
				</CModalHeader>
				<CModalBody>Are you Sure Delete this item {row.original.description}?</CModalBody>
				<CModalFooter>
					<CButton color='danger' onClick={deleteOrder}>
						Delete
					</CButton>{' '}
					<CButton color='secondary' onClick={() => setModal(false)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>

			<CModal show={primary} onClose={() => setPrimary(!primary)} >
				<CModalHeader closeButton>
					<CModalTitle>Update</CModalTitle>
				</CModalHeader>
				<CModalBody>{primary && <OrderActionEdit data={row.original} handleChangeCpt={editCpt} />}</CModalBody>
				<CModalFooter>
					<button className='btn btn-primary' ref={btnRef} disabled={!updateData} onClick={update}>
						Update
					</button>{' '}
					<CButton color='secondary' onClick={() => setPrimary(!primary)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		</>
	);
};

export default OrderAction;
