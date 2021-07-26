import React from 'react';
import CIcon from '@coreui/icons-react';
import {freeSet} from '@coreui/icons';
import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';

const AdminHeaderWithSearch = ({handleSearchChange, handleAddNew, handleDropDownChange, title = '', selectionList=[], placeholder = '&#xF002;', buttonTitle = null, showCount = 0}) => {


	//add new button 
	const addNewButton = () => {
		return (
			<button type='button' className='btn btn-primary float-right ml-3 text-white' onClick={handleAddNew}>
				{' '}
				<CIcon content={freeSet.cilPlus} color='white' className='add-icon-set' /> <span className='pt-1'> {buttonTitle}</span>
			</button>
		);
	};

	// dropdown select
	const dropDownSelect=()=>{
		return (
			<>
				<select name='' id='' className='form-control-sm float-right  w-25 mr-2' onChange={handleDropDownChange} >
								
								{selectionList.map((item, index) => (
									<option key={index} value={item.value}>
										{item.text}
									</option>
								))}
							</select>
			</>
		)
	}



	return (
		<div>
			<div className='row mb-2 LatoRegular mt-4 mb-3 pl-3 pr-3'>
				<div className='col-md-6'>

               

					<div className='component-header'>
						{title} {showCount > 0 ? <span className='count-box'>{showCount}</span> : ''}{' '}

					</div>
				</div>
				<div className='col-md-6'>

				    {buttonTitle ? addNewButton() :''}
					<div className='float-right w-50'>
						{' '}
						<span className='fa fa-search search-icon'></span> <input type='text' onBlur={handleSearchChange} className=' form-control-sm  search-space ' placeholder={placeholder} />{' '}
					</div>

					{selectionList.length>0 ? dropDownSelect() :'' }
				</div>
			</div>
		</div>
	);
};

AdminHeaderWithSearch.propTypes = {
	handleSearchChange: PropTypes.func,
	handleAddNew: PropTypes.func,
	handleDropDownChange:PropTypes.func,
	title: PropTypes.string,
	placeholder: PropTypes.string,
	buttonTitle: PropTypes.string,
	showCount: PropTypes.any,
	selectionList:PropTypes.any,

};

export default AdminHeaderWithSearch;
