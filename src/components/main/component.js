import React from 'react';

export default class MainPage extends React.Component {
	state = {
		selected: -1,
		list: [],
	};

	componentDidMount() {
		// Обозначаем локальное хранилище по умолчанию
		let st = JSON.parse(window.localStorage.getItem('educa'));
		if(!st) {
			st = {
				list: [
					{
						id: 1,
						name: 'EUR/USD',
						rates: [
							{
								value: 1.1,
								timestamp: +new Date()-2000,
							},
							{
								value: 1.11,
								timestamp: +new Date()-1000,
							},
							{
								value: 1.12,
								timestamp: +new Date(),
							},
						],
					},
					{
						id: 2,
						name: 'GBP/USD',
						rates: [
							{
								value: 1.3,
								timestamp: +new Date()-2000,
							},
							{
								value: 1.29,
								timestamp: +new Date()-1000,
							},
							{
								value: 1.28,
								timestamp: +new Date(),
							},
						],
					},
				],
			};
			window.localStorage.setItem('educa',JSON.stringify(st));
		}
		this.setState({list:st.list});
	}

	render() {
		let {props,state} = this;

		return (
			<div id="currency_list">
			{state.list.map((e,i) => (
				<div key={i} className="item">
					<div className="left">
						<p className="title">{e.name}</p>
						<div className="rate_list">{e.rates.map((rate,j) => (<p key={j}>{rate.value}</p>))}</div>
					</div>
					<div className="right">
						<button>Обновить</button>
						<button>Удалить</button>
					</div>
				</div>
			))}
			</div>
		);
	}
}
