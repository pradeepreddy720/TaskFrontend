import React,{Component} from 'react';
import './home.css';
import Homemain from '../../../components/home/homepage';

class Home extends Component{
	render(){		
		return(
			<div className="home-wrapper">
				<Homemain/>
			</div>
		)
	}

}

export default Home;