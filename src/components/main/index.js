import {connect} from 'react-redux';

import {module_name as currency_module} from '../../redux/currency';
import Component from './component';

const mapStateToProps = state => ({
	currency_list: state[currency_module],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
