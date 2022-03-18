import React, {useEffect, useState} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader} from '@coreui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PackageItems, ServiceMsg } from 'src/reusable/enum';
import { updateFeeSchedule } from 'src/service/hospitalsService';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'reapop';
import OnError from 'src/_helpers/onerror';
import { RESET_FEE_SCHEDULE } from 'src/constansts';

const schema = yup.object().shape({
	priceTool: yup.object().shape({}),
});

const PricingSingleEdit = ({row, category=null}) => {
	const [editMode, setEditMode] = useState(false);
    const [catType, setCatType] = useState(null);
    const dispatch = useDispatch();
    let isFeeSchedule = useSelector((state) => state.FeeSchedule.resetFeeSchedule);


	const {
		register,
		setValue,
		getValues,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema), mode: 'all'});

	const onEdit = async() => {

		let priceTool = getValues('priceTool');
        let editFee={
            id:row.original.id,
            medicareRate:priceTool.mediacareRate,
            collectionAmount:priceTool.collectionAmount,
           

            clearFee:priceTool.clearOptimizedPrice,
            ...((catType == PackageItems.Facility ) && {
                estimatedPayLaterPrice: Number(priceTool.estimatedPayLaterPrice)
            }),
        }
       
try {
    let result= await updateFeeSchedule(editFee);
    if (result.data.message == ServiceMsg.OK) {
        dispatch(notify(`Successfully updated`, 'success'));

        // history.go(0)
        setTimeout(() => {
            // setLoading(false);
            dispatch({
                type: RESET_FEE_SCHEDULE,
                payload: !isFeeSchedule
            });
            setEditMode(false);
            // dispatch(resetOrderTable(orderChanges));
        }, 1000);

    }
    
} catch (error) {
    OnError(error, dispatch);
}


		// console.log(editFee);
	};

	useEffect(() => {
		let priceTool = {
			mediacareRate: row.original.medicareRate,
			// collectionAmount: row.original.hospitalCollectionFee,   // want to change for other physician 


            ...((catType == PackageItems.Facility ) && {
                collectionAmount: row.original.collectionAmount,
            }),
            ...((catType == PackageItems.Physician ) && {
                collectionAmount: row.original.physicianCollectionFee,
            }),
			payLaterPrice: row.original.payLaterPrice,
			clearOptimizedPrice: row.original.clearOptimizedFee,
            ...((catType == PackageItems.Facility ) && {
                estimatedPayLaterPrice: row.original.estimatedPayLaterPrice
            }),
		};
		setValue('priceTool', {...priceTool});
        setCatType(category)
	}, [ row, category]);

    const paylaterPrice=()=>{
        return (
            <>
            	<div className='col-md-6'>
								<label htmlFor=''>Estimated Pay Later Price</label>
								<input type='number' className=' form-control-sm col-9' {...register('priceTool.estimatedPayLaterPrice')} />
							</div>
            </>
        );
    }

	return (
		<>
			<div onClick={() => setEditMode(true)}>
				<span className='fa fa-x  fa-pencil'></span>
			</div>

			<CModal size={'lg'} show={editMode} onClose={setEditMode} closeOnBackdrop={false}>
				<CModalHeader closeButton> <h5 className="font-weight-bold">Update FeeSchedules</h5> </CModalHeader>
				<CModalBody>
					{/* Please enter the mail of the user who is to complete the onboarding process below */}
					<form>
						<div className='row'>
							<div className='col-md-6'>
								<label htmlFor=''>CPT Code</label>
								<input type='text' className=' form-control-sm col-9' value={row.original.code} disabled />
							</div>
							<div className='col-md-6'>
								<label htmlFor=''>Procedure</label>
								<input type='text' className=' form-control-sm col-9' value={row.original.description} disabled />
							</div>
						</div>

						<div className='row'>
							<div className='col-md-6'>
								<label htmlFor=''>MediaCare Rate</label>
								<input type='number' className=' form-control-sm col-9' {...register('priceTool.mediacareRate')} />
							</div>
							<div className='col-md-6'>
								<label htmlFor=''>
                                {catType == PackageItems.Facility?  'Hospital Collection' :'Physician Collection' }  
                                
</label>
								<input type='number' className=' form-control-sm col-9' {...register('priceTool.collectionAmount')} />
							</div>
						</div>
						<div className='row'>
                            {catType == PackageItems.Facility? paylaterPrice(): ''}
							
							<div className='col-md-6'>
								<label htmlFor=''>clearOptimized Price</label>
								<input type='number' className=' form-control-sm col-9' {...register('priceTool.clearOptimizedPrice')} />
							</div>
						</div>
					</form>
				</CModalBody>

				<CModalFooter>
					<CButton color='primary' onClick={onEdit}>
						Send
					</CButton>{' '}
					<CButton color='secondary' onClick={() => setEditMode(false)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		</>
	);
};

export default PricingSingleEdit;


