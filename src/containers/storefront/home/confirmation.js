import React,{Component} from 'react';
import './home.css';
import axios from '../../../axios-order';
import  { Redirect } from 'react-router-dom';

class confirmation extends Component{
	state = {Redirect : false};
		componentDidMount(){ 
		let headers = {
		    "accept": "application/json",
		    "content-type": "application/json"
		}
		axios.post('api/confirmEmail', {
			"code" : this.props.match.params.id
		},{headers: headers}).then(res=>{
			if(res.data.status == 200){
				this.setState({Redirect : true});
			}else{
				alert("some problem occrred plase try again later.");
			}
		});	
	}
	render(){
		if(this.state.Redirect){
			return <Redirect to="/"/>;
		}		
		return(
			<div className="home-wrapper">
				confirmation
			</div>
		)
	}

}

export default confirmation;