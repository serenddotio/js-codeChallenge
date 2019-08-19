import './SearchBar.css';
import React from 'react';
import { amazon, db } from '../api/api';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import _ from 'lodash';

// Searchbar component
class SearchBar extends React.Component {
	// State is need for the presentational data and input
	state = { term: '', message: null };

	// Running two api calls with async
	onFormSubmit = (event) => {
		event.preventDefault();

		// Set variables
		const products = this.props.products;
		const asin = this.state.term;
		const existing = _.findIndex(products, function(o) { return o.asin === asin; });

		// Send ajax request if the product is not in the list
		if (existing <= 0) {
			this.submitData();	
		} else {
			this.setState({ message: 'Existing product.' });
		}
	}

	submitData = async () => {
		// Indicating loading
		this.setState({ message: 'Loading...' });

		// Lets get product info using express
		const search = await amazon.get('/api/', { 
			params: {
			    asin: this.state.term
			}
		});

		// Display failed status
		this.setState({ message: search.data.message });


		// Response with no product name should not be recorded to db
		if (!search.data.name) {
			// Store product information in json server
			const response = await db.post('/products', search.data);
			// Display success message
			this.setState({ message: response.statusText });
			// Trigger redraw with new data
			this.props.fetchProducts();
		}
	}

	render() {
		return (
			<div className="ui segment">
				<form onSubmit={this.onFormSubmit} className="ui form">
					<div className="field">
						<span className="searchLabel">ASIN Lookup</span><span className="searchMessage">{this.state.message}</span>
						<input type="text" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })} />
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { products: Object.values(state.products) }
}

export default connect( mapStateToProps, {fetchProducts} )(SearchBar);