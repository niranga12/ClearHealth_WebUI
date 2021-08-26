import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


const schema = yup.object().shape({
    procedure:yup.object().shape({
        service: yup.string().required('Service is required'),
        cptcode: yup.string(),
        ehr: yup.string(),
        referringPhysician: yup.string(),
        price: yup.string(),
    })
        
});

const OrderProcedureForm = ({handleRemove}) => {

    const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema), mode: 'all'});
    
    return (
        <form >
        {/* hospital details */}
      
        <div className='row'>
            {/* procedure.service */}
            <div className='col-md-4'>
                <div className='form-group'>
                    <label className='form-text'>
                    Service <span className='text-danger font-weight-bold '>*</span>
                    </label>
                    <input className='form-control-sm' type='text' {...register('procedure.service')}   />
                    <div className='small text-danger  pb-2   '>{errors.procedure?.service?.message}</div>
                </div>
            </div>

          {/* procedure.cptcode */}
               <div className='col-md-4'>
                <div className='form-group'>
                    <label className='form-text'>
                    CPT Code <span className='text-danger font-weight-bold '>*</span>
                    </label>
                    <input className='form-control-sm' type='text' {...register('procedure.cptcode')}   />
                    <div className='small text-danger  pb-2   '>{errors.procedure?.cptcode?.message}</div>
                </div>
            </div>

            
          {/* procedure.ehr */}
          <div className='col-md-4'>
                <div className='form-group'>
                    <label className='form-text'>
                    EHR Account Number <span className='text-danger font-weight-bold '>*</span>
                    </label>
                    <input className='form-control-sm' type='text' {...register('procedure.ehr')}   />
                    <div className='small text-danger  pb-2   '>{errors.procedure?.ehr?.message}</div>
                </div>
            </div>

           

        </div>

        <div className='row '>
           
           {/* procedure.referringPhysician */}
           <div className='col-md-4'>
                <div className='form-group'>
                    <label className='form-text'>
                    Referring Physician <span className='text-danger font-weight-bold '>*</span>
                    </label>
                    <input className='form-control-sm' type='text' {...register('procedure.referringPhysician')}   />
                    <div className='small text-danger  pb-2   '>{errors.procedure?.referringPhysician?.message}</div>
                </div>
            </div>

               {/* procedure.price */}
           <div className='col-md-4'>
                <div className='form-group'>
                    <label className='form-text'>
                    Price <span className='text-danger font-weight-bold '>*</span>
                    </label>
                    <input className='form-control-sm' type='text' {...register('procedure.price')}   />
                    <div className='small text-danger  pb-2   '>{errors.procedure?.price?.message}</div>
                </div>
            </div>

            <div className="col-md-4">
   <button className="btn btn-danger float-right mt-5" onClick={handleRemove}>Remove</button>
</div>

          </div>




        
          <div className='border-bottom mt-1 mb-2'></div>
      

    
    </form>
    )
}

export default OrderProcedureForm
