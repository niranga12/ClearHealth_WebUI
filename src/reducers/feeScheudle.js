const { RESET_FEE_SCHEDULE} = require('src/constansts');

const initialState = {
	resetFeeSchedule: false,
};

const feeScheduleReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_FEE_SCHEDULE:
			return {
				...state,
				resetFeeSchedule: action.payload,
			};
		
		default: {
			return state;
		}
	}
};

export default feeScheduleReducer;