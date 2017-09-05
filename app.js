import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router';

import App from './md/App.js';
import './scss/main.scss';

import Home from './md/home.js';
import Search from './md/Search.js';
import Searchlist from './md/Searchlist.js';
import Detail from './md/Detail.js';
import Mycart from './md/Mycart.js';
import Cart from './md/Cart.js';
import User from './md/User.js';
import Register from './md/Register.js';
import Molist from './md/molist.js';
import Fgall from './md/Fgall.js';
import Pay from './md/Pay.js';
import Topay from './md/Topay.js';
import List from './md/list.js';
import Findlist from './md/findlist';

import './scss/home.scss';
import './scss/search.scss';
import './scss/searchlist.scss';
import './scss/detail.scss';
import './scss/mycart.scss';
import './scss/cart.scss';
import './scss/user.scss';
import './scss/register.scss';
import './scss/molist.scss';
import './scss/pay.scss';
import './scss/topay.scss';
import './scss/list.scss';
import './scss/findlist.scss';

ReactDOM.render((<Router history = {hashHistory}>
		<Route path = '/' component = {App}>
			<IndexRoute  components = {{type:Home}}></IndexRoute>
			<Route path = 'user' components = {{type:User}}></Route>
			<Route path = 'register' components = {{type:Register}}></Route>
			<Route path = 'molist' components = {{type:Molist}}></Route>
			<Route path = 'fgall' components = {{type:Fgall}}></Route>
			<Route path = 'pay' components = {{type:Pay}}></Route>
			<Route path = 'topay' components = {{type:Topay}}></Route>
			<Route path = 'list' components = {{type:List}}></Route>
			<Route path = 'findlist' component = {{type:Findlist}}></Route>
		</Route>
 		<Route path = 'search' component = {Search}></Route>
		<Route path = 'searchlist' component = {Searchlist}></Route>
		<Route path = 'detail' component = {Detail}></Route>
		<Route path = 'mycart' component = {Mycart}></Route>
		<Route path = 'cart' component = {Cart}></Route>
		
		
</Router>),document.getElementById('app'));