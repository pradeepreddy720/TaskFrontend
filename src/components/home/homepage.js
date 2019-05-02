import React,{Component} from 'react';
import axios from '../../axios-order';

class Homemain extends Component{	
	state = {
		company : null,
		userData : null,
		isLogedin : false,
		favourite : null,
		isLoginpopup : false,
		isSigninpopup : false,
		iemailVerified : false,
		searchQuery : null,
		sortVal : null,
		isFavList : false,
		favcount : 0,
		resetPasspopup : false,
		resetcomplete : false,
		msgpopup : false,
		popupmsg : null,
		initilizepassword : {
			email : {
				value : "",
				error : "",
				isValid : false
			}
		}, 
		resetpascodeId : null,
		resetPassword : {
			otp : {
				value : "",
				error : "",
				isValid : false
			},
			password:{
                value:"",
				error:"",
				isValid:false
			},
			c_password:{
                value:"",
				error:"",
				isValid:false
			}
		}, 
		login : {
			email : {
				value : "",
				error : "",
				isValid : false
			},
			password : {
				value : "",
				error : "",
				isValid : false
			}
		},
		signup:{
			name:{
               	value:"",
				error:"",
				isValid:false
			},
			email:{
                value:"",
				error:"",
				isValid:false
			},
			password:{
                value:"",
				error:"",
				isValid:false
			},
			c_password:{
                value:"",
				error:"",
				isValid:false
			}
		},
	}
	// initilizeing the view.
	componentDidMount(){ 
		let headers = {
		    "accept": "application/json",
		    "content-type": "application/json"
		}
		axios.get('api/getCompany', {headers: headers}).then(company=>{
			let data = company.data.company.map((v)=>{
				v.isFavourite = false;
				return v;
			});
			let newHeaders = {
		    	"accept": "application/json",
		    	"content-type": "application/json",
		    	"authorization": "Bearer "+sessionStorage.getItem('logintoken'),
			}
			if(sessionStorage.uLdata && sessionStorage.getItem('logintoken')){
				axios.get('api/getFavourite', {headers: newHeaders}).then(favourite=>{
					let d, count = 0;
					if(favourite.data.status == 200){
						count = favourite.data.company.length;
						d = data.map(v=>{
							favourite.data.company.filter(a=>{
								if(v.id == a.id){
									v.isFavourite = true;
								}
							});
							return v;
						});
					}else{
						d = data;
					}
					this.setState({company: d, favcount: count, userData: JSON.parse(sessionStorage.uLdata), isLogedin: true, favourite: favourite.data.company}); 	
				});
			}else{
				this.setState({company:company.data.company});
			}		
		});	
	}
	// showLoginpopup function will trigger the login popup.
	showLoginpopup = (e)=>{
		this.setState({isLoginpopup:true});
	}
	// showSignuppopup function will trigger the sign up popup.
	showSignuppopup = (e)=>{
		this.setState({isSigninpopup:true});
	}
	// closePopup function will close all the popups.
	closePopup = (e)=>{
		this.setState({isSigninpopup:false,isLoginpopup:false,resetPasspopup:false,msgpopup:false,popupmsg:null});
	}
	// onChangefun function will snyc the state data and input fields values.
	onChangeloginfun=(e)=> {
		let logindetails={...this.state.login};
		logindetails[e.target.name].value=e.target.value;
		this.setState({login: logindetails});
	}	
	onChangeresetfun=(e)=>{
		let resetdetails={...this.state.resetPassword};
		resetdetails[e.target.name].value=e.target.value;
		this.setState({resetPassword: resetdetails});
	}
	onChangeemailfun=(e)=>{
		let resetdetails={...this.state.initilizepassword};
		resetdetails[e.target.name].value=e.target.value;
		this.setState({initilizepassword: resetdetails});
	}
	onChangefun=(e)=> {
		let signupdetails={...this.state.signup};
		signupdetails[e.target.name].value=e.target.value;
		this.setState({signup: signupdetails});
	}
	// validateLogin function will validate all the login form fields.
	validateLogin=(fn,v)=>{
		switch(fn){
			case "email":
				if(v.value.trim().length<1){
					return "Email cannot be empty.";
				}else if(v.value.trim().length>0 && !v.value.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
					return "Please enter valid email address."
				}else{
					return "";
				}
			case "password":
				if(v.value.trim().length>5){
					return "";
				}else if(v.value.trim().length<1){
					return "Password cannot be empty.";
				}else{
					return "Password should be minimum 6 characters.";
				}
		}
	}
	// validatereset function will validate all the reset password form fields.
	validatereset=(fn,v)=>{
		switch(fn){
			case "otp":
				if(v.value.trim().length<1){
					return "Name cannot be empty.";
				}else{
					return "";
				}
			case "email":
				if(v.value.trim().length<1){
					return "Email cannot be empty.";
				}else if(v.value.trim().length>0 && !v.value.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
					return "Please enter valid email address."
				}else{
					return "";
				}
			case "password":
				if(v.value.trim().length>5){
					return "";
				}else if(v.value.trim().length<1){
					return "Password cannot be empty.";
				}else{
					return "Password should be minimum 6 characters.";
				}
			case "c_password":
				if(v.value.trim().length>5){
					if(v.value.trim()===this.state.resetPassword.password.value.trim()){
						return "";
					}else{
						return "Password & Confirm password must be same.";
					}
				}else if(v.value.trim().length<1){
					return "Confirm password cannot be empty.";
				}
		}
	}
	// validateSignup function will validate all the sign up form fields.
    validateSignup=(fn,v)=>{
       switch(fn){
			case "name":
				if(v.value.trim().length<1){
					return "Name cannot be empty.";
				}else if(v.value.trim().length>0 && !v.value.trim().match(/^[a-zA-Z]+$/)){
					return "Name should contain only letters.";
				}else{
					return "";
				}
			case "email":
				if(v.value.trim().length<1){
					return "Email cannot be empty.";
				}else if(v.value.trim().length>0 && !v.value.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
					return "Please enter valid email address."
				}else{
					return "";
				}
			case "password":
				if(v.value.trim().length>5){
					return "";
				}else if(v.value.trim().length<1){
					return "Password cannot be empty.";
				}else{
					return "Password should be minimum 6 characters.";
				}
			case "c_password":
				if(v.value.trim().length>5){
					if(v.value.trim()===this.state.signup.password.value.trim()){
						return "";
					}else{
						return "Password & Confirm password must be same.";
					}
				}else if(v.value.trim().length<1){
					return "Confirm password cannot be empty.";
				}
		}
    }
    // handleSubmit function will login the user into application.
    handleSubmit = (e)=>{ 
	    e.preventDefault(); 
	    let self = this,err="",validLogin=true;
		let validation = {...self.state.login};
		Object.keys(validation).map((v,i)=>{
				err = self.validateLogin(v, validation[v])
				if(err.length>0){
					validation[v].error = err;
					validation[v].isValid=false;
				}else{
					validation[v].isValid=true;
				}
				validLogin = validation[v].isValid && validLogin;			
		});
		if(validLogin){
			axios.post("api/login",{"email": self.state.login.email.value,"password": self.state.login.password.value}).then((res)=>{
				if(res.data.success.status == 200){
					var respo = res.data.success.token;
					var uLdata = res.data.success.userData;
					sessionStorage.setItem('uLdata', JSON.stringify(uLdata));
					sessionStorage.setItem('logintoken', respo);
					this.setState({userData : uLdata,isLogedin:true});
					self.closePopup();
				}else if(res.data.success.status == 409){
					this.closePopup();
					this.setState({msgpopup:true,popupmsg:res.data.success.message});
					setTimeout(function(){ self.closePopup(); }, 3000);
				}
			}).catch((error)=>{
				console.log(error);
				this.closePopup();
				this.setState({msgpopup:true,popupmsg:"login Failed, Please try again."});
				setTimeout(function(){ self.closePopup(); }, 3000);
			});
		}else{
			self.setState({login:validation});
		}	    
  	}
  	// handleSubmit function will logout the user from application.
  	logout = (e)=>{
  		sessionStorage.clear();
  		this.setState({userData: null, isLogedin:false});
  	}
  	// handleSubmit function will sign up the user into application.
	signupfun = (e)=>{
        let self = this,err="",validSignup=true;
		let validation = {...self.state.signup};
		Object.keys(validation).map((v,i)=>{
				err = self.validateSignup(v, validation[v]);
				if(err.length>0){
					validation[v].error = err;
					validation[v].isValid=false;
				}else{
					validation[v].isValid=true;
				}
				validSignup = validation[v].isValid && validSignup;			
		});
		var name = self.state.signup.name.value;
		var email = self.state.signup.email.value;
		var pwd = self.state.signup.password.value;
		var cpwd = self.state.signup.c_password.value;
        
        if(validSignup){
        	axios.post("api/register",{
				"name": name,
				"email": email,
				"password": pwd,
				"c_password": cpwd
			}).then((res)=>{
				var respo = res.data.success.token;
				var uLdata = res.data.success.userData;
				sessionStorage.setItem('uLdata', JSON.stringify(uLdata));
				sessionStorage.setItem('logintoken', respo);
				this.setState({userData : uLdata,isLogedin:true});
				self.closePopup();
			}).catch((error)=>{
				console.log(error);
				this.closePopup();
				this.setState({msgpopup:true,popupmsg:"login Failed, Please try again."});
				setTimeout(function(){ self.closePopup(); }, 3000);
			});
        }else{
			self.setState({signup:validation}); 
		}
	}
	// search function will search the company in the list.
	search = (e)=>{
		this.setState({searchQuery:e.target.value},()=>{
			let headers = {
			    "accept": "application/json",
			    "content-type": "application/json"
			}
			axios.post('api/searchAndSort', {
				"sortBy" : this.state.sortVal,
				"query" : this.state.searchQuery
			},{headers: headers}).then(company=>{
				let data = company.data.company.map((v)=>{
					v.isFavourite = false;
					return v;
				});
				let newHeaders = {
			    	"accept": "application/json",
			    	"content-type": "application/json",
			    	"authorization": "Bearer "+sessionStorage.getItem('logintoken'),
				}
				if(sessionStorage.uLdata && sessionStorage.getItem('logintoken')){
					axios.get('api/getFavourite', {headers: newHeaders}).then(favourite=>{
						let d;
						if(favourite.data.status == 200){
							d = data.map(v=>{
								favourite.data.company.filter(a=>{
									if(v.id == a.id){
										v.isFavourite = true;
									}
								});
								return v;
							});
						}else{
							d = data;
						}
						this.setState({company: d, userData: JSON.parse(sessionStorage.uLdata), isLogedin: true, favourite: favourite.data.company}); 	
					});
				}else{
					this.setState({company:company.data.company});
				}	
			});
		});
	}
	// sort function will sort the company in the list.
	sort = (e)=>{
		this.setState({sortVal:e.target.value},()=>{
			let headers = {
			    "accept": "application/json",
			    "content-type": "application/json"
			}
			axios.post('api/searchAndSort', {
				"sortBy" : this.state.sortVal,
				"query" : this.state.searchQuery
			},{headers: headers}).then(company=>{
				let data = company.data.company.map((v)=>{
					v.isFavourite = false;
					return v;
				});
				let newHeaders = {
			    	"accept": "application/json",
			    	"content-type": "application/json",
			    	"authorization": "Bearer "+sessionStorage.getItem('logintoken'),
				}
				if(sessionStorage.uLdata && sessionStorage.getItem('logintoken')){
					axios.get('api/getFavourite', {headers: newHeaders}).then(favourite=>{
						let d;
						if(favourite.data.status == 200){
							d = data.map(v=>{
								favourite.data.company.filter(a=>{
									if(v.id == a.id){
										v.isFavourite = true;
									}
								});
								return v;
							});
						}else{
							d = data;
						}
						this.setState({company: d, userData: JSON.parse(sessionStorage.uLdata), isLogedin: true, favourite: favourite.data.company}); 	
					});
				}else{
					this.setState({company:company.data.company});
				}	
			});
		});
	}
	// addfav function will add the company to fav list.
	addfav = (id)=>{
		let self = this;
		if(this.state.isLogedin){
			let Headers = {
		    	"accept": "application/json",
		    	"content-type": "application/json",
		    	"authorization": "Bearer "+sessionStorage.getItem('logintoken'),
			}
			let isExist = false; 
			if(this.state.favourite && this.state.favourite.length){
				this.state.favourite.filter((v)=>{
					if(id == v.id){
						isExist = true;
					}
				});
			}
			if(!isExist){
				axios.post('api/addFavourite',{
					"id" : id
				} ,{headers: Headers}).then(res=>{
					if(res.data.status == 200){
						let companys = this.state.company;
						let count = this.state.favcount+1;
						let fav = this.state.favourite;
						if(!fav) fav = [];
						let companydata = companys.map((v,i)=>{
							if(v.id == id){
								fav.push(v);
								v.isFavourite = true;
							}
							return v;
						});
						this.setState({company : companydata, favcount : count, favourite : fav});
					}else{
						this.closePopup();
						this.setState({msgpopup:true,popupmsg:res.data.message});
						setTimeout(function(){ self.closePopup(); }, 3000);
					}
				});
			}else{
				axios.post('api/removeFavourite',{
					"id" : id
				} ,{headers: Headers}).then(res=>{
					if(res.data.status == 200){
						let companys = this.state.company;
						let count = this.state.favcount-1;
						let fav = this.state.favourite;
						let companydata = companys.map((v,i)=>{
							if(v.id == id){
								v.isFavourite = false;
							}
							return v;
						});
						var newfav = fav.filter((v)=>{return v.id == id ? false : true;});
						this.setState({company : companydata, favcount : count, favourite : newfav});
					}else{
						this.closePopup();
						this.setState({msgpopup:true,popupmsg:res.data.message});
						setTimeout(function(){ self.closePopup(); }, 3000);
					}
				});
			}
		}else{
			this.showLoginpopup();
		}
	}
	// showFavList function will show the company to fav list.
	showFavList = (e)=>{
		this.setState({isFavList : true});
	}
	// hideFavList function will hide the company to fav list.
	hideFavList = (e)=>{
		this.setState({isFavList : false});
	}
	// forgotfun function will trigger the reset password popup.
	forgotfun = (e)=>{
		this.setState({isLoginpopup:false,resetPasspopup : true});
	}
	// initilizereset function will begin reset password process.
	initilizereset = (e)=>{
		e.preventDefault(); 
	    let self = this,err="",validLogin=true;
		let validation = {...self.state.initilizepassword};
		Object.keys(validation).map((v,i)=>{
				err = self.validatereset(v, validation[v])
				if(err.length>0){
					validation[v].error = err;
					validation[v].isValid=false;
				}else{
					validation[v].isValid=true;
				}
				validLogin = validation[v].isValid && validLogin;			
		});
		if(validLogin){
			axios.post("api/resetPassword",{"email" : self.state.initilizepassword.email.value}).then((res)=>{
				if(res.data.status == 200){
					this.setState({resetpascodeId : res.data.id, resetcomplete : true});
				}else if(res.data.status == 404){
					this.closePopup();
					this.setState({msgpopup:true,popupmsg:res.data.message});
					setTimeout(function(){ self.closePopup(); }, 3000);
				}else if(res.data.status == 500){
					this.closePopup();
					this.setState({msgpopup:true,popupmsg:res.data.message});
					setTimeout(function(){ self.closePopup(); }, 3000);
				}
			}).catch((error)=>{
				console.log(error);
				this.closePopup();
				this.setState({msgpopup:true,popupmsg:"reset password Failed, Please try again."});
				setTimeout(function(){ self.closePopup(); }, 3000);
			});
		}else{
			self.setState({login:validation});
		}	
	}
	// completeReset function will complete reset password process.
	completeReset = (e)=>{
		e.preventDefault(); 
	    let self = this,err="",validLogin=true;
		let validation = {...self.state.resetPassword};
		Object.keys(validation).map((v,i)=>{
				err = self.validatereset(v, validation[v])
				if(err.length>0){
					validation[v].error = err;
					validation[v].isValid=false;
				}else{
					validation[v].isValid=true;
				}
				validLogin = validation[v].isValid && validLogin;			
		});
		if(validLogin){
			axios.post("api/completeReset",{
					"id" : this.state.resetpascodeId,
					"password" : self.state.resetPassword.password.value,
					"c_password" : self.state.resetPassword.c_password.value,
					"otp" : self.state.resetPassword.otp.value
				}).then((res)=>{
				if(res.data.status == 200){
					this.closePopup();
					this.setState({msgpopup:true,popupmsg:"password reset success."});
					setTimeout(function(){ self.closePopup(); }, 3000);
				}else if(res.data.status == 409){
					this.closePopup();
					this.setState({msgpopup:true,popupmsg:res.data.message});
					setTimeout(function(){ self.closePopup(); }, 3000);
				}else if(res.data.status == 500){
					this.closePopup();
					this.setState({msgpopup:true,popupmsg:res.data.message});
					setTimeout(function(){ self.closePopup(); }, 3000);
				}
			}).catch((error)=>{
				console.log(error);
				this.closePopup();
				this.setState({msgpopup:true,popupmsg:"reset password Failed, Please try again."});
				setTimeout(function(){ self.closePopup(); }, 3000);
			});
		}else{
			self.setState({login:validation});
		}	
	}
	render(){
		let headingItems = null, loginpopup = null, body = null, companies = null, favListitems = null;
		if(this.state.isLoginpopup){
			loginpopup = (
				<div className="popcointainer">
					<div className="loginandSignup">
						<div className="closeicon" onClick={()=>this.closePopup()}>&#10006;</div>
						<div className="loginSection">
							<form onSubmit={e=>this.handleSubmit(e)}>
								<div className="Login-heading">login</div> 
								<div className="email-heading label">Enter Email</div>
								<div className="email-textbox inputCointainer">
									<input type="text" name="email" value={this.state.login.email.value} onChange={e=>this.onChangeloginfun(e)} className="emailtextbox"/>
									<span className="error">{this.state.login.email.isValid?"":this.state.login.email.error}</span>
								</div>
								<div className="password-heading label">Enter password</div>
								<div className="password-textbox inputCointainer">
									<input type="password" name="password" value={this.state.login.password.value} onChange={e=>this.onChangeloginfun(e)} className="passwordtextbox"/>
									<span className="error">{this.state.login.password.isValid?"":this.state.login.password.error}</span>
								</div>
				                <div className="forgotpass-link" onClick={()=>this.forgotfun()}>Forgot Password?</div>
	    		                <input type="submit" className="login-button" value="Login"/>
			                </form>
						</div>
					</div>
				</div>
			);
		}else if(this.state.isSigninpopup){
			loginpopup = (
				<div className="popcointainer">
					<div className="loginandSignup">
						<div className="closeicon" onClick={()=>this.closePopup()}>&#10006;</div>
						<div className="signupSection">
							<form>
			             		<div className="signup-heading">signup</div>
								<div className="div-fname-textbox inputCointainer">
									<input type="text" className="nametextbox" value={this.state.signup.name.value} placeholder="Enter name" name="name" onChange={e=>this.onChangefun(e)}/>
									<span className="error">{this.state.signup.name.isValid?"":this.state.signup.name.error}</span>
								</div>
								<div className="div-email-textbox inputCointainer">
									<input type="text" className="divemailtextbox" value={this.state.signup.email.value} placeholder="Enter your Email" name="email" onChange={e=>this.onChangefun(e)}/>
									<span className="error">{this.state.signup.email.isValid?"":this.state.signup.email.error}</span>
								</div>
								<div className="div-password-textbox inputCointainer">
									<input type="password" className="divpasswordtextbox" value={this.state.signup.password.value} placeholder="Password" name="password" onChange={e=>this.onChangefun(e)}/>
									<span className="error">{this.state.signup.password.isValid?"":this.state.signup.password.error}</span>
								</div>
								<div className="div-conpassword-textbox inputCointainer">
									<input type="password" className="conpasswordtextbox" value={this.state.signup.c_password.value} placeholder="Confirm Password" name="c_password" onChange={e=>this.onChangefun(e)}/>
									<span className="error">{this.state.signup.c_password.isValid?"":this.state.signup.c_password.error}</span>
								</div>
								<div className="signup-button" onClick={()=>this.signupfun()}>sign up</div>    
							</form>
						</div>
					</div>
				</div>
			);
		}else if(this.state.resetPasspopup){
			let restcontent = null;
			if(this.state.resetcomplete){
				restcontent = (
					<form>
	             		<div className="signup-heading">Reset password</div>
						<div className="div-otp-textbox inputCointainer">
							<input type="text" className="divotptextbox" value={this.state.resetPassword.otp.value} placeholder="Enter otp" name="otp" onChange={e=>this.onChangeresetfun(e)}/>
							<span className="error">{this.state.resetPassword.otp.isValid?"":this.state.resetPassword.otp.error}</span>
						</div>
						<div className="div-password-textbox inputCointainer">
							<input type="password" className="divpasswordtextbox" value={this.state.resetPassword.password.value} placeholder="Password" name="password" onChange={e=>this.onChangeresetfun(e)}/>
							<span className="error">{this.state.resetPassword.isValid?"":this.state.resetPassword.password.error}</span>
						</div>
						<div className="div-conpassword-textbox inputCointainer">
							<input type="password" className="conpasswordtextbox" value={this.state.resetPassword.c_password.value} placeholder="Confirm Password" name="c_password" onChange={e=>this.onChangeresetfun(e)}/>
							<span className="error">{this.state.resetPassword.c_password.isValid?"":this.state.resetPassword.c_password.error}</span>
						</div>
						<div className="signup-button" onClick={(e)=>this.completeReset(e)}>Resert Password</div>    	
					</form>
				);
			}else{
				restcontent = (
					<form>
	             		<div className="signup-heading">Reset password</div>
						<div className="div-email-textbox inputCointainer">
							<input type="text" className="divemailtextbox" value={this.state.initilizepassword.email.value} placeholder="Enter your Email" name="email" onChange={e=>this.onChangeemailfun(e)}/>
							<span className="error">{this.state.initilizepassword.email.isValid?"":this.state.initilizepassword.email.error}</span>
						</div>
						<div className="signup-button" onClick={(e)=>this.initilizereset(e)}>Request Otp</div>    	
					</form>
				);
			}
			loginpopup = (
				<div className="popcointainer">
					<div className="loginandSignup">
						<div className="closeicon" onClick={()=>this.closePopup()}>&#10006;</div>
						<div className="signupSection">
							{restcontent}
						</div>
					</div>
				</div>
			);
		}else if(this.state.msgpopup){
			loginpopup = (
				<div className="popcointainer">
					<div className="loginandSignup">
						<div className="closeicon" onClick={()=>this.closePopup()}>&#10006;</div>
						<div className="signupSection">
							<div className="signup-heading">{this.state.popupmsg}</div>
						</div>
					</div>
				</div>
			);
		}
		if(this.state.isLogedin){
			headingItems = (
				<div className="welcomeSec">
					<span className="welcomemsg">Hi {this.state.userData.name}</span>
					<span className="favList" onClick={()=>this.showFavList()}>
						&#9825;
						<span className="favcount">{this.state.favcount}</span>
					</span>
					<span className="logout" onClick={()=>this.logout()}>logout</span>
				</div>
			);
		}else{
			headingItems = (
				<div className="loginandlogin">
					<span className="login" onClick={()=>this.showLoginpopup()}>login</span>
					<span className="register" onClick={()=>this.showSignuppopup()}>register</span>
				</div>
			);
		}
		if(this.state.company && this.state.company.length){
			companies  = this.state.company.map((v,i)=>{
				let fav = null; if(v.isFavourite){fav = <span className="favicon" onClick={()=>this.addfav(v.id)}>&#9829;</span>}else{fav = <span className="favicon" onClick={()=>this.addfav(v.id)}>&#9825;</span>}
				return (
					<div key={i} className="listItem">
						<span className="name">{v.name}</span>
						<span className="phonenumber">{v.phone}</span>
						<span className="addTofav">{fav}</span>
						<span className="address">{v.address}</span>
					</div>
				);
			});
		}else{
			companies = <div className="noitems">No companies found.</div>;
		}
		if(this.state.favourite && this.state.favourite.length){
			favListitems = this.state.favourite.map((v,i)=>{
				return (
					<div key={i} className="listItem">
						<span className="name">{v.name}</span>
						<span className="phonenumber">{v.phone}</span>
						<span className="addTofav"><span className="favicon" onClick={()=>this.addfav(v.id)}>&#9829;</span></span>
						<span className="address">{v.address}</span>
					</div>
				);
			});
		}else{
			favListitems = <div className="noItems">there are no items in your favourite list.</div>
		}
		if(this.state.isFavList){
			body = (
				<div className="favListCointainer">
					<h3>Your Favourite List</h3>
					<span className="backBtncointainer"><span className="backBtn" onClick={()=>this.hideFavList()}>&#8592; Back</span></span>
					<div className="favListitem">
						{favListitems}
					</div>
				</div>
			);
		}else{
			body = (
				<div className="bodyContent">
					<div className="bodytop">
						<div className="search">
							<input value={this.state.searchQuery} onChange={e=>this.search(e)} className="searchBox" type="text" name="search" />
						</div>
						<div className="sort">
							<select className="sortSelect" onChange={e=>this.sort(e)}>
								<option value="">Default</option>
								<option value="asc">Name Asc</option>
								<option value="desc">Name Desc</option>
							</select> 
						</div>
					</div>
					<div className="list">
						{companies}
					</div>
				</div>
			);
		}
		return(
			<div className="wraper">
				<div className="heading">
					<div className="headingItem">
						<div className="logo">
							<span className="first">A</span>
							<span className="second">ssignmen</span>
							<span className="third">t</span>
						</div>
					</div>
					<div className="headingItem">
						{headingItems}
					</div>
				</div>
				{loginpopup}
				<div className="body">
					{body}
				</div>
			</div>
		);
	}
}

export default Homemain;