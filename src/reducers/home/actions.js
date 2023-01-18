export const SET_DATA_CHECKOUT = 'SET_DATA_CHECKOUT'

export const setCheckout = (data) => {
	return {
		type: SET_DATA_CHECKOUT,
		payload: data
	}
}