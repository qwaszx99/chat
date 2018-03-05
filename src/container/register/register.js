import React from 'react'
import Logo from '../../component/logo/logo';
import { List,InputItem,WingBlank,WhiteSpace,Button,Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { register } from './../../redux/user.redux';
@connect(
	state=>state.user,
	{register}
)
export default class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'genius'//或者boss			
		}
	}
	handleChange(key,value){
		this.setState({
			[key]:value
		})
	}
	handleRegister(){
		this.props.register(this.state);		
	}
	render(){
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null }
				<Logo></Logo>				
				<WingBlank>
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
					<List>						
						<InputItem onChange={value=>this.handleChange('user',value)}>用户名</InputItem>
						<WhiteSpace/>
						<InputItem 
							type="password"
	 						onChange={value=>this.handleChange('pwd',value)}
 						>密码
 						</InputItem>
						<WhiteSpace/>
						<InputItem 
							type="password"
							onChange={value=>this.handleChange('repeatpwd',value)}
						>确认密码
						</InputItem>
						<WhiteSpace/>
						<RadioItem 
							checked={this.state.type==='genius'} 
							onChange={value=>this.handleChange('type','genius')}
						>
							牛人
						</RadioItem>
						<RadioItem 
							checked={this.state.type==='boss'} 
							onChange={value=>this.handleChange('type','boss')}
						>
							BOSS
						</RadioItem>
						<WhiteSpace/>
						<Button type="primary" onClick={()=>this.handleRegister()}>注册</Button>
						<Button type="primary" onClick={()=>console.log('hello')}>hello</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}