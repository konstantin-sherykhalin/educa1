import React from 'react';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux';

import Main		from './components/main';
import Currency	from './components/currency';

export default () => (
	<div id="container">
		<Provider store={store}>
		<BrowserRouter>
		<Switch>
			<Route path='/currency/:id'	component={Currency} />
			<Route path='/'				component={Main} />
		</Switch>
		</BrowserRouter>
		</Provider>
	</div>
);
