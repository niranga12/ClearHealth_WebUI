import {FETCH_PERMISSION} from 'src/constansts';

const initialState = {
	UiPermissions: [],
};

const permissionReducer = (state = initialState, action) => {

	switch (action.type) {
		case FETCH_PERMISSION: {
			return (state = action.payload);
		}
        default: {
            return state;
        }
	}
};

export default permissionReducer;
