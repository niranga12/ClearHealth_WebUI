import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import DataTable from 'src/views/common/dataTable';

const options = [
	{value: '122', label: 'afsadf'},
	{value: '4555', label: 'dsfsafdsa'},
	{value: '555', label: 'fdsafsadfdsa'},
];

const OrderProcedureSelect = () => {
    const [selectedCPT, setSelectedCPT] = useState([]);
	// const onSelect=(selectedList, selectedItem)=>{
	//     console.log(selectedList);
	//     console.log(selectedItem);

	// }
	const handleChange = (newValue: any, actionMeta: any) => {
		// console.group('Value Changed');
		// console.log(newValue);
		// console.log(`action: ${actionMeta.action}`);
		// console.groupEnd();
        setSelectedCPT(newValue);
	};

//SETTING COLUMNS NAMES
const columns = useMemo(
    () => [
        {
            Header: 'value',
            accessor: 'value', // accessor is the "key" in the data
           
        },
        {
            Header: 'label',
            accessor: 'label', // accessor is the "key" in the data
          
        },

        
      
    ],
    []
);



	return (
		<div className='row'>
			<div className='col-md-6 mb-3'>
                <label className="mr-4 float-left pt-2">CPT Code </label>
				<Select options={options} closeMenuOnSelect={false} onChange={handleChange} isMulti />
			</div>
			<div className='col-md-12'>
            <DataTable columns={columns} data={selectedCPT} />
            </div>
		</div>
	);
};

export default OrderProcedureSelect;
