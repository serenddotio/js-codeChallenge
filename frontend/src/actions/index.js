import { db } from '../api/api';

// Action creator
export const fetchProducts = () => async dispatch => {
	const response = await db.get('/products');

	dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
};
