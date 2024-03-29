import config from '../config';

export const ReducerRecord = () => ({
	list: [],
});

// Постоянные
export const module_name = 'currency';

export const LOAD	= config.name+'/'+module_name+'/LOAD';
export const ADD	= config.name+'/'+module_name+'/ADD';
export const DELETE	= config.name+'/'+module_name+'/DELETE';
export const FETCH	= config.name+'/'+module_name+'/FETCH';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;

	if(type == LOAD)	st.list = payload;
	if(type == ADD)		st.list.push(payload);
	if(type == DELETE)	st.list = st.list.filter(e => e.id!=payload);
	if(type == FETCH)	st.list = st.list.map(e => (e.id==payload.id ? {...e,rates:[...e.rates,...payload.rates]} : e));

	return {...st};
}

// Действия
export const load		= (payload) => ({type:LOAD,		payload});
export const add_row	= (payload) => ({type:ADD,		payload});
export const delete_row	= (payload) => ({type:DELETE,	payload});
export const fetch_rates= (payload) => ({type:FETCH,	payload});
