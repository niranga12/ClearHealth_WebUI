import React from 'react'
import PropTypes from 'prop-types';



const HDwidget = ({title,price,image}) => {
    return (
        <div className="card p-3 m-2 hd-boxcover" >
            <img src={image} alt=""  width="30" height="30" />
            <h5 className="LatoRegular pb-1 pt-3  ">{title}</h5>
            <h3 className="hd-subtitle font-weight-bold">{price}</h3>  
        </div>
    )
}



HDwidget.propTypes = {
	title: PropTypes.string,
    price: PropTypes.any,
    image: PropTypes.any
};

export default HDwidget
