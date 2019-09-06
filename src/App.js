import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux';

import Main		from './components/main';
import Currency	from './components/currency';

export default () => (
	<div id="container">
		<Provider store={store}>
		<HashRouter>
		<Switch>
			<Route path='/currency/:id'	component={Currency} />
			<Route path='/'				component={Main} />
		</Switch>
		</HashRouter>
		</Provider>
	</div>
);
