import React, { useEffect, useMemo, useState } from 'react'
import { viewProcedureByProviderId } from 'src/service/providerService';
import DataTable from 'src/views/common/dataTable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loaderHide, loaderShow } from 'src/actions/loaderAction';
import OnError from 'src/_helpers/onerror';


const ViewProcedure = ({providerId}) => {

	const dispatch = useDispatch();
    const [viewProcedure, setViewProcedure] = useState([])

    useEffect(() => {
        

        const fetchData = async () => {
			try {
                dispatch(loaderShow());
                let result =await viewProcedureByProviderId(providerId);
                setViewProcedure(result.data.data);
                dispatch(loaderHide());
			} catch (error) {
				 OnError(error, dispatch);
			}
		};

		fetchData();
        
      
       
    }, [providerId])

    const subColumns = useMemo(
		() => [
			{
				Header: 'Code',
				accessor: 'code', // accessor is the "key" in the data				
			},
			{
				Header: 'Description',
				accessor: 'description', // accessor is the "key" in the data				
			},
			{
				Header: 'Facility',
				accessor: 'facility', // accessor is the "key" in the data				
			},
			{
				Header: 'Anesthesia',
				accessor: 'anesthesia', // accessor is the "key" in the data				
			},
          
            {
				Header: 'Pathology',
				accessor: 'pathology', // accessor is the "key" in the data				
			},

            {
				Header: 'Physician',
				accessor: 'physician', // accessor is the "key" in the data				
			},
            {
				Header: 'Clear Fee',
				accessor: 'clearFee', // accessor is the "key" in the data				
			},
            {
				Header: 'Total',
				accessor: 'total', // accessor is the "key" in the data				
			}






		],[]
		);
        
    return (
        <div>
            <DataTable columns={subColumns} data={viewProcedure}  />
            
        </div>
    )
}


ViewProcedure.propTypes = {
	providerId: PropTypes.string,
   
};


export default ViewProcedure;
