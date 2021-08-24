import React, { useEffect, useState } from 'react';
import {Packages} from 'src/reusable/enum';
import PropTypes from 'prop-types';


const PricingToolCategories = ({handlePackageChange}) => {
 
    const [current, setCurrent] = useState(1);

    useEffect(() => {


        handlePackageChange(current);
      
    }, [current])


	return (
		<div className='row'>
			<div className='col-md-12  p-4'>
				<ul className='list-unstyled '>
					{Packages.map((item, index) => (
						<li key={index}  className={`float-left list-cat-pricing ${current==item.id ? "active" : ""}`}  onClick={()=>setCurrent(item.id)}>	{item.name}	</li>
					))}

					
				</ul>
			</div>
		</div>
	);
};



PricingToolCategories.propTypes = {
	handlePackageChange: PropTypes.func,

};

export default PricingToolCategories;
