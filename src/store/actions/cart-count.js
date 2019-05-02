import * as action from './action-types';
import axios from "../../axios-order";


export const setCount = (count,cartDetails)=>{
	return{
		type:action.CART_COUNT,
		count:count,
		cartDetails:cartDetails
	}
}

export const cartSummary = ()=>{
	if(sessionStorage.getItem('uLdata')!=null){
		const header={
			"Accept":"application/json",
			"Content-Type":"application/json",
			"Authorization":"Bearer "+sessionStorage.getItem('logintoken')
		}
		return dispatch=>{
			axios.post('api/cart',{"UserID" : JSON.parse(sessionStorage.getItem('uLdata')).UserId},{headers:header}).then(resp=>{
				if(resp.data.status==200){
					dispatch(setCount(resp.data.summary.CartCount,resp.data));
				}else{
					dispatch(setCount(0,null));
				}
			}).catch(error=>{
				dispatch(()=>{
					console.log("error");				
				});
			})
		}
	}else{
		return setCount(0,null);
	}
}

export const user=()=>{
	let log=false;
	if(sessionStorage.getItem('uLdata')!=null){
		log=true;
	}
	return{
		type:action.USER_LOG,
		user:log
	}
}

export const LoginPopup=(status)=>{
	return{
		type:action.LOGIN_POPUP,
		status:status
	}
}

export const UserData=()=>{
	let uid = null;
	let userdata = null;
	if(sessionStorage.getItem('uLdata')!=null){
		uid = sessionStorage.getItem('uLdata');
    	userdata = JSON.parse(uid);
	}
	return{
		type:action.USER_DATA,
		userdata:userdata
	}
}

