import React from 'react';
import Logo from '../../component/logo/logo';
import {login} from './../../redux/user.redux';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
@connect(
	state=>state.user,
	{login}
)
export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			pwd:''
		}
		this.register=this.register.bind(this);
	}
	register(){
		console.log(this.props);
		this.props.history.push('/register');
	}
	handleChange(key,value){
		this.setState({
			[key]:value
		})
	}
	handleLogin(){
		this.props.login(this.state);
	}
	render(){
		return (
			<div>
				{(this.props.redirectTo && this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo}/> : null }
				<Logo></Logo>				
				<WingBlank>
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
					<List>
						<InputItem 
							onChange={value=>this.handleChange('user',value)}
						>用户
						</InputItem>
						<WhiteSpace/>
						<InputItem
							type="password"
							onChange={value=>this.handleChange('pwd',value)}
						>密码
						</InputItem>
						<WhiteSpace/>
					</List>
					<Button onClick={()=>this.handleLogin()} type="primary">登录</Button>
					<WhiteSpace/>
					<Button onClick={this.register} type="primary">注册</Button>
				</WingBlank>
			</div>
		)
	}
}