import React from 'react';
import AdminHeaderWithSearch from 'src/views/common/adminHeaderWithSearch';

const selectionListDropDown=[
    { text:'Select',value:''},
    { text:'Expired',value:'Expired'},
    { text:'Valid',value:'Valid'}
]

function HospitalOrderTable() {

	const searchTextChange = () => {

    };

    const dropDownChange=(e)=>{
        console.log(e.target.value)

    }

	return (
		<>
			<div className=' pt-2 '>
				<AdminHeaderWithSearch handleSearchChange={searchTextChange} handleDropDownChange={dropDownChange}   selectionList={selectionListDropDown} placeholder='Search here..' title='Order' />
			</div>
		</>
	);
}

export default HospitalOrderTable;
