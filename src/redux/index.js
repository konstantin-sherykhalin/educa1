import {combineReducers,createStore} from 'redux';

import currency,{module as currency_module} from './currency'; // Деньги

// Создаем хранилище
const store = createStore(combineReducers({
	[currency_module]: currency,
}));

export default store;
