import React from 'react';
import {Link} from 'react-router-dom';

import API from '../../services/api';

export default class MainPage extends React.Component {
	state = {
		id: 0,
		data: {},
		waiting: false,
	};

	async componentDidMount() {
		// Обозначаем локальное хранилище
		let st = JSON.parse(window.localStorage.getItem('educa'));
		let id = this.props.match.params.id;
		let data = st.list.find(e => e.id==id);
		this.setState({
			id,
			data: data || false,
		});

		this.interval = setInterval(this.load,10000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	// Загрузка данных
	load = async () => {
		let currency = this.state.data;

		this.setState({waiting:true});
		let {response,error} = await API('get_data',{id:currency.id,name:currency.name,last_value:currency.rates[currency.rates.length-1].value});

		if(response) {
			await this.setState(state => ({
				data: {
					...state.data,
					rates: [...state.data.rates,...response.rates],
				},
			}));
			this.props.fetch_rates({id:currency.id,rates:response.rates});

			let st = JSON.parse(window.localStorage.getItem('educa'));
			st.list = st.list.map(e => e.id==this.state.id ? this.state.data : e);
			window.localStorage.setItem('educa',JSON.stringify(st));
		}
		if(error) {
			alert(error.message);
		}

		this.setState({waiting:false});
	}

	render() {
		let {props,state} = this;

		return (
			<div className="currency_item existing">
				<div className="left">
					<p className="title">{state.data ? state.data.name : 'Валюта удалена'}</p>
					{state.data ? (
						<div className="rate_list">
						<p>Последние значения курса (автообновление каждые 10 секунд):</p>
						{state.data.id && state.data.rates.map((rate,i) => (
							<p key={i}>{Math.round(rate.value*1000)/1000}</p>
						))}
						</div>
					) : null}
				</div>
				{state.data && state.data.id ? (
					<div className="right">
						<button disabled={state.waiting} onClick={this.load}>{state.data.rates.length ? 'Обновить' : 'Загрузить'}</button>
					</div>
				) : null}
			</div>
		);
	}
}
