import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';

// List components
class ProductList extends React.Component {
	componentDidMount() {
		// Initial data render
		this.props.fetchProducts();
	}

	renderList() {
		if (this.props.products.length === 0) {
			return (
				<div>Type in Amazon ASIN to get information.</div>
			)
		}
		// Simple revsere to show latest records on top
		return this.props.products.reverse().map((product) => {
			return (
				<div className="item" key={product.id}>
					<div className="image">
						<img src={product.productImage} alt={product.productTitle} />
					</div>
					<div className="content">
						<a href={`https://www.amazon.com/dp/${product.asin}`} target="_blank" rel="noopener noreferrer">
							<h3 className="productTitle">{product.productTitle}</h3>
						</a>
						<p>ASIN : {product.asin}</p>
						{/* Additional information might not be available through crawl */}
						{product.productCategory ? <p>Product Category : {product.productCategory}</p> : null}
						{product.productRanking ? <p>Product Ranking : {product.productRanking}</p> : null}
						{product.productDimensions ? <p>Product Dimensions : {product.productDimensions}</p> : null}
					</div>
				</div>
			)
		});
	}

	render() {
		return (
			<div className="ui divided items">{this.renderList()}</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { products: Object.values(state.products)  }
}

export default connect( mapStateToProps, {fetchProducts} )(ProductList);