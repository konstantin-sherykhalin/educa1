import {connect} from 'react-redux';

import {
	module_name as currency_module,
	load,
	add_row,
	delete_row,
	fetch_rates
} from '../../redux/currency';
import Component from './component';

const mapStateToProps = state => ({
	currency_list: state[currency_module],
});

const mapDispatchToProps = {
	load,
	add_row,
	delete_row,
	fetch_rates,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
