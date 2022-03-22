import React, {useEffect, useState} from 'react';
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader} from '@coreui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FacilityPackageField, PackageItems, PhysicianPackageField, ServiceMsg } from 'src/reusable/enum';
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
	const [isEdit, setisEdit] = useState(true)

	const [mediacareRateDisable, setMediacareRateDisable] = useState(false)
	const [collectionAmountDisable, setCollectionAmountDisable] = useState(false)
    const dispatch = useDispatch();
    let isFeeSchedule = useSelector((state) => state.FeeSchedule.resetFeeSchedule);
	let filterDetail = useSelector((state) => state.Pricing.filterDetail);


	
	


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


                   if ( filterDetail && (filterDetail?.clPrice == 'Auto'  && filterDetail?.enhancementOn == '') ||(filterDetail?.clPrice == 'Auto'  && filterDetail?.enhancementRate == ''))  {
						setisEdit(false);
							
						
					} else {
					setisEdit(true);}


				
		
		let priceTool = {
			mediacareRate: row.original.medicareRate,
			// collectionAmount: row.original.hospitalCollectionFee,   // want to change for other physician 


            ...((catType == PackageItems.Facility ) && {
                collectionAmount: row.original.hospitalCollectionFee,
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
	}, [ row, category, filterDetail]);


	// useEffect(() => {
	// 	if(filter?.clPrice=='Auto' && (!filter.enhancementOn || !filter.enhancementOn)){
	// 		setIsEdit(false)
	// 	}else{
	// 		setIsEdit(true)
	// 	}
	  
	// }, [filter])

	const mediaRateChange=()=>{
		debugger;
		if(filterDetail?.clPrice == 'Auto' ){
			let mediaCareRate = getValues('priceTool.mediacareRate');
			let newClearFees = Number(mediaCareRate) * (Number(filterDetail?.enhancementRate) / 100) + Number(mediaCareRate);
			setValue('priceTool.clearOptimizedPrice',String(newClearFees))
		}

	}

	const hospitalRateChange=()=>{
		if(filterDetail?.clPrice == 'Auto' ){
			let collectionAmount = getValues('priceTool.collectionAmount');
			let newClearFees = Number(collectionAmount) * (Number(filterDetail?.enhancementRate) / 100) + Number(collectionAmount);
			setValue('priceTool.clearOptimizedPrice',String(newClearFees))

		}
	}



    const paylaterPrice=()=>{
        return (
            <>
            	<div className='col-md-6'>
								<label htmlFor=''>Estimated Pay Later Price</label> 
								<input type='number'  className={`form-control-sm col-9 ${filterDetail?.clPrice == 'Auto' ? 'avoid-clicks':''} `} {...register('priceTool.estimatedPayLaterPrice')} />
							</div>
            </>
        );
    }
	const editButton=()=>{
		return (
			<>
			<div onClick={() => setEditMode(true)}>
				<span className='fa fa-x  fa-pencil'></span>
			</div>
			</>
		);

	}

	return (
		<>
		{ isEdit && editButton() }
		{/* <div onClick={() => setEditMode(true)}>
				<span className='fa fa-x  fa-pencil'></span>
			</div> */}

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
								<label htmlFor=''>Medicare Rate</label>
								<input type='number' className=' form-control-sm col-9' {...register('priceTool.mediacareRate')} onBlur={mediaRateChange} disabled={mediacareRateDisable} />
							</div>
							<div className='col-md-6'>
								<label htmlFor=''>
                                {catType == PackageItems.Facility?  'Hospital Collection' :'Physician Collection' }  
                                
</label>
								<input type='number' className=' form-control-sm col-9' {...register('priceTool.collectionAmount')}  onBlur={hospitalRateChange} disabled={collectionAmountDisable}/>
							</div>
						</div>
						<div className='row'>
                            {catType == PackageItems.Facility? paylaterPrice(): ''}
							
							<div className='col-md-6'>
								<label htmlFor=''>Clear Optimized Price</label>
								
								<input type='number' className={`form-control-sm col-9 ${filterDetail?.clPrice == 'Auto' ? 'avoid-clicks':''} `} {...register('priceTool.clearOptimizedPrice')}   />
							</div>
						</div>
					</form>
				</CModalBody>

				<CModalFooter>
					<CButton color='primary' onClick={onEdit}>
						Save
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


