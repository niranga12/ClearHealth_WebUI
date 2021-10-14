
import { CHANGE_ORDER_STATUS, RESET_ORDER_STATUS, RESET_ORDER_Table } from "src/constansts";


export const changeOrder = () => {
	return function (dispatch) {
		dispatch({
			type: CHANGE_ORDER_STATUS,
		});
	};
};

export const resetOrder = () => {
	return function (dispatch) {
		dispatch({
			type: RESET_ORDER_STATUS,
		});
	};
};


// export const changeOrderTable = () => {
// 	return function (dispatch) {
// 		dispatch({
// 			type: CHANGE_ORDER_Table,
// 		});
// 	};
// };


export const resetOrderTable = (orderChanges) => {

	return function (dispatch) {
		

		dispatch({
			type:RESET_ORDER_Table,
			payload: !orderChanges,
		});
	};
};