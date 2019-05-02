import * as actionTypes from '../actions/action-types';

let initialState={
	count:0,
	log:false,
	cartDetails:null,
	loginPopup:false,
	userdata:null
}

const reducer = (state=initialState,action)=>{
	switch(action.type){
		case actionTypes.CART_COUNT:
		return{
			...state,
			count:action.count,
			cartDetails:action.cartDetails
		}
		case actionTypes.USER_LOG:
			return{
				...state,
				log:action.user
			}
		case actionTypes.LOGIN_POPUP:
			return{
				...state,
				loginPopup:action.status
			}	
		case actionTypes.USER_DATA:
			return{
				...state,
				userdata:action.userdata
			}
		default:
		return state;
	}
}	

export default reducer;