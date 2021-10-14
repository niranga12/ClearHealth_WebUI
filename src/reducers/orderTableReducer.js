const {   RESET_ORDER_Table} = require('src/constansts');

const initialState = {
	changeProgress: false,
};


const orderTableReducer = (state = initialState, action) => {
	switch (action.type) {
		// case CHANGE_ORDER_Table:
		// 	return {
		// 		...state,
		// 		changeProgress: true,
		// 	};
		case RESET_ORDER_Table:
                return {
                    ...state,
                    changeProgress: action.payload,
                }; 
           
			

		

		default: {
			return state;
		}
	}
};

export default orderTableReducer;
