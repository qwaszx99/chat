import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import {WingBlank,Card,WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
@withRouter
export default class UserCard extends PureComponent{	
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render(){
		return(
			<WingBlank>
			<WhiteSpace></WhiteSpace>
				{this.props.userlist.map(v=>(
					v.avatar ?
					(
						<Card key={v._id} onClick={()=>this.handleClick(v)}>
							<Card.Header
							title={v.user}
							thumb={require(`./../images/${v.avatar}.png`)}
							extra={<span>{v.title}</span>}
							>						
							</Card.Header>
							<Card.Body>
								{v.type==='boss'? <div>公司：{v.company}</div> : null}
								{v.desc.split('\n').map(d=>(<div key={d}>{d}</div>))}
								{v.type==='boss'? <div>薪资：{v.money}</div> : null}
							</Card.Body>
						</Card>					
					)
					: null
				))}
			</WingBlank>
		)
	}
}

UserCard.propTypes={
	userlist:PropTypes.array.isRequired
}