import React from 'react';
import {Link} from 'react-router-dom';

import API from '../../services/api';

export default class MainPage extends React.Component {
	state = {
		id: 0,
		data: {},
	};

	async componentDidMount() {
		// Обозначаем локальное хранилище
		let st = JSON.parse(window.localStorage.getItem('educa'));
		let id = this.props.match.params.id;
		let data = st.list.find(e => e.id==id);
		this.setState({
			id,
			data: data || {},
		});
	}

	// Загрузка данных
	load = async (currency) => {
		let {response,error} = await API('get_data',{id:currency.id,name:currency.name,last_value:currency.rates[currency.rates.length-1].value});
		if(response) {
			await this.setState(state => ({
				data: {
					...state.data,
					rates: [...state.data.rates,...response.rates],
				},
			}));
			let st = JSON.parse(window.localStorage.getItem('educa'));
			st.list = st.list.map(e => e.id==this.state.id ? this.state.data : e);
			window.localStorage.setItem('educa',JSON.stringify(st));
		}
		if(error) {
			alert(error.message);
		}
	}

	render() {
		let {props,state} = this;
		console.log(state.data);

		return (
			<div className="currency_item existing">
				<div className="left">
					<p className="title">{state.data.name}</p>
					<div className="rate_list">
					<p>Последние значения курса:</p>
					{state.data.id && state.data.rates.map((rate,i) => (
						<p key={i}>{Math.round(rate.value*1000)/1000}</p>
					))}
					</div>
				</div>
				{state.data.id ? (
				<div className="right">
					<button onClick={_=>this.load(state.data)}>{state.data.rates.length ? 'Обновить' : 'Загрузить'}</button>
				</div>
				) : null}
			</div>
		);
	}
}
