import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addToCart } from '../services/localStorage';
import { getProductFromId } from '../services/api';

export default class Product extends Component {
  state = {
    thisProduct: {},
  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({
      thisProduct: await getProductFromId(product.id),
    })
  }

  // adiciona produto ao carrinho
  addToStorage = () => {
    const { product, getCartLength } = this.props;
    addToCart(product);
    getCartLength();
  }

  render() {
    const { thisProduct: { pictures } } = this.state;
    let { product } = this.props;
    let { title, thumbnail, price, id, shipping } = product;
    const { free_shipping: freeShip } = shipping;
    const priceFixed = typeof price === 'number' ? `R$ ${price.toFixed(2)}` : 0;
    const pic = pictures ? pictures[0].url : thumbnail

    return (

      // produto
      <div data-testid="product" className="products">
        <Link
          to={ `/product-details/${id}` }
          data-testid="product-detail-link"
          className="productLink"
        >
          <img src={ pic } alt={ title } className="productImage" />
          <h3 className="productTitle">{title}</h3>
          <h2 className="productPrice">{ priceFixed }</h2>
          {freeShip && <h4 data-testid="free-shipping" className="freeShip">🚚 GRÁTIS</h4>}
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.addToStorage }
          className="productButton"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Product.defaultProps = {
  product: { shipping: { freeShip: false } },
};

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    shipping: PropTypes.shape().isRequired,
  }),
  getCartLength: PropTypes.func.isRequired,
};
