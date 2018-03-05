import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';//redux异步中间件
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import reducers from './reducer';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';
import './config';
import './index.css';

//boss genius me msg 4个页面
const store = createStore(reducers,
	compose(
				applyMiddleware(ReduxThunk),
				window.devToolsExtension?window.devToolsExtension():f=>f
			)
	);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>		
			<div>
				<AuthRoute></AuthRoute>
				<Switch>				
					<Route path="/geniusinfo" component={GeniusInfo}></Route>
					<Route path="/bossinfo" component={BossInfo}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/chat/:user" component={Chat}></Route>
					<Route  component={Dashboard}></Route>
				
				</Switch>
			</div>
		</BrowserRouter>		
	</Provider>,	
	document.getElementById('root'));

