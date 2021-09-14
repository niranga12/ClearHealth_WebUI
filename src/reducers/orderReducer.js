const { CHANGE_ORDER_STATUS, RESET_ORDER_STATUS} = require('src/constansts');

const initialState = {
	changeOrderProgress: false,
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_ORDER_STATUS:
			return {
				...state,
				changeOrderProgress: true,
			};
		case RESET_ORDER_STATUS:
			return {
				...state,
				changeOrderProgress: false,
			};

		default: {
			return state;
		}
	}
};

export default orderReducer;
