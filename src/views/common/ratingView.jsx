import React, {useEffect, useState} from 'react';
import grayTick from '../../assets/images/icons/graytick.png';
import greenTick from '../../assets/images/icons/greentick.png';
import PropTypes from 'prop-types';


const RatingView = ({totalCount, count}) => {
	// @ts-ignore
	const [total, setTotal] = useState(totalCount);
	// @ts-ignore
	const [attempt, setAttempt] = useState(count);
	const [pending, setPending] = useState(0);

	useEffect(() => {
		setPending(total - attempt);
	}, [totalCount,count]);

	const success = () => {
return(
        // @ts-ignore
        [...Array(attempt)].map((elementInArray, index) => ( 
           
            <img src={greenTick} alt='' width='25' height='25' key={index} />
            ) 
        )
)
	};

	const noResult = () => {

        return(
            // @ts-ignore
            [...Array(pending)].map((elementInArray, index) => ( 
               
                <img src={grayTick} alt='' width='25' height='25' key={index} />
                ) 
            )
    )
	};

	return (
		<>
			<div>
				{success()}

				{noResult()}
			</div>
		</>
	);
};



RatingView.propTypes = {
	totalCount: PropTypes.number,
	count: PropTypes.number,
};

export default RatingView;
