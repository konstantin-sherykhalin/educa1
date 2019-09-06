import React from 'react';
import {Link} from 'react-router-dom';

import API from '../../services/api';

export default class MainPage extends React.Component {
	state = {
		list: [],
		new_name: '',
		new_value: '',
	};

	componentDidMount() {
		// Обозначаем локальное хранилище
		let st = JSON.parse(window.localStorage.getItem('educa'));
		if(!st) {
			st = this.get_default();
			window.localStorage.setItem('educa',JSON.stringify(st));
		}
		this.setState({list:st.list});
	}

	// Значения по умолчанию
	get_default = () => ({
		list: [
			{
				id: 1,
				name: 'EUR/USD',
				rates: [
					{
						value: 1.103,
						timestamp: +new Date()-2000,
					},
					{
						value: 1.112,
						timestamp: +new Date()-1000,
					},
					{
						value: 1.128,
						timestamp: +new Date(),
					},
				],
			},
			{
				id: 2,
				name: 'GBP/USD',
				rates: [
					{
						value: 1.321,
						timestamp: +new Date()-2000,
					},
					{
						value: 1.297,
						timestamp: +new Date()-1000,
					},
					{
						value: 1.284,
						timestamp: +new Date(),
					},
				],
			},
		],
	});

	// Сохранение в локальное хранилище
	save = () => window.localStorage.setItem('educa',JSON.stringify({list:this.state.list}));

	// Новая валюта
	change_new_name  = (new_name)  => this.setState({new_name});
	change_new_value = (new_value) => this.setState({new_value});
	add_currency = async () => {
		await this.setState(state => ({
			list: [
				...state.list,
				{
					id: state.list.length+1,
					name: state.new_name,
					rates: [
						{
							value: +state.new_value.replace(',','.'),
							timestamp: +new Date(),
						},
					],
				},
			],
			new_name: '',
			new_value: '',
		}));
		this.save();
	}
	// Удаление
	remove_currency = async (id) => {
		await this.setState(state => ({list:state.list.filter(e => e.id!=id)}));
		this.save();
	}

	// Загрузка данных
	load = async (currency) => {
		let {response,error} = await API('get_data',{
			id:			currency.id,
			name:		currency.name,
			last_value:	currency.rates[currency.rates.length-1].value,
		});
		if(response) {
			await this.setState(state => ({
				list: state.list.map(e => e.id==currency.id ? {...e,rates:[...e.rates,...response.rates]} : e),
			}));
			this.save();
		}
		if(error) {
			alert(error.message);
		}
	}

	render() {
		let {props,state} = this;

		return (
			<div id="currency_list">
				{state.list.map((e,i) => (
				<div key={i} className="currency_item existing">
					<div className="left">
						<Link to={'/currency/'+e.id}><p className="title">{e.name}</p></Link>
						<div className="rate_list">
						<p>Последние значения курса:</p>
						{e.rates.slice(-3).reverse().map((rate,j) => (
							<p key={j}>{Math.round(rate.value*1000)/1000}</p>
						))}
						</div>
					</div>
					<div className="right">
						<button onClick={_=>this.load(e)}>{e.rates.length ? 'Обновить' : 'Загрузить'}</button>
						<button onClick={_=>this.remove_currency(e.id)}>Удалить</button>
					</div>
				</div>
				))}
				<div className="currency_item">
					<div className="left">
						<p className="title">Новая валюта</p>
						<div className="inputs">
							<input type="text" value={state.new_name} placeholder="Например, USD/RUB"
								onChange={({target}) => this.change_new_name(target.value)} />
							<input type="text" value={state.new_value} placeholder="65,81"
								onChange={({target}) => this.change_new_value(target.value)} />
						</div>
					</div>
					<div className="right" style={{alignItems:'flex-end'}}>
						<button onClick={this.add_currency}>Добавить</button>
					</div>
				</div>
			</div>
		);
	}
}
