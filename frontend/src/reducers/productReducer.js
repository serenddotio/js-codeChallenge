import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case 'FETCH_PRODUCTS':
			return { ...state, ..._.mapKeys(action.payload, 'asin') }
		default:
			return state;
	}
}