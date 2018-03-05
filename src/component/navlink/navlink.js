import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
@withRouter
@connect(
	state=>state.chat
)
export default class NavLinkBar extends PureComponent{	
	render(){
		const navList=this.props.data.filter(value=>!value.hide);
		const {pathname}=this.props.location;		
		return (
			<TabBar>
				{navList.map(value=>(
					<TabBar.Item
						key={value.path+new Date().getTime()}
						title={value.text}
						icon={{uri:require(`./images/${value.icon}.png`)}}
						badge={value.path==='/msg' ? this.props.unread : ''}
						selectedIcon={{uri:require(`./images/${value.icon}-active.png`)}}
						selected={pathname===value.path}
						onPress={()=>{
							this.props.history.push(value.path);
						}}
					>

					</TabBar.Item>
				))}
			</TabBar>
		)
	}
}

NavLinkBar.porpTypes = {
	data: PropTypes.array.isRequired
}