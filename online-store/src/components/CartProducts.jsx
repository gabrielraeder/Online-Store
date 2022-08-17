import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addToCart, removeFromCart } from '../services/localStorage';

export default class CartProducts extends Component {
  constructor() {
    super();
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  state = {
    count: 0,
    disabledMinus: false,
    disabledPlus: false,
  }

  componentDidMount() {
    // recebe a quantidade existente do produto
    const { product: { counter } } = this.props;
    this.setState({
      count: counter,
    }, () => {
      const { count } = this.state;
      this.setState({
        disabledMinus: count === 1,
      });
    });
  }

  // adiciona produto ao carrinho já com a quantidade
  addProduct(product) {
    const { cartTotalValueCounter } = this.props;
    this.setState((prevState) => ({
      count: prevState.count + 1,
      disabledMinus: false,
    }), () => {
      addToCart(product);
      cartTotalValueCounter();
      const { available_quantity: availability } = product;
      const { count } = this.state;
      if (count === availability) {
        this.setState({
          disabledPlus: true,
        });
      }
      const { getCartLength } = this.props;
      getCartLength();
    });
  }

  // remove produto do carrinho
  removeProduct(product) {
    const { cartTotalValueCounter } = this.props;
    this.setState((prevState) => ({
      count: prevState.count - 1,
      disabledPlus: false,
    }), () => {
      const { count } = this.state;
      removeFromCart(product);
      cartTotalValueCounter();
      if (count === 1) {
        this.setState({
          disabledMinus: true,
        });
      }
      const { getCartLength } = this.props;
      getCartLength();
    });
  }

  render() {
    const { count, disabledMinus, disabledPlus } = this.state;
    const { product, removeAllOfThisProduct } = this.props;
    const { title, price, thumbnail } = product;
    return (
      <li className="cartProduct">

        <img src={ thumbnail } alt={ title } />

        <h4 data-testid="shopping-cart-product-name">{title}</h4>

        {/* botão para diminuir quantidade do produto */}
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => this.removeProduct(product) }
          disabled={ disabledMinus }
          className="cartButtons"
        >
          ➖
        </button>

        <p data-testid="shopping-cart-product-quantity">{count}</p>
        {/* botão para aumentar quantidade do produto */}
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => this.addProduct(product) }
          disabled={ disabledPlus }
          className="cartButtons"
        >
          ➕
        </button>
        <div className="prices">
          <p>{`✕ ${price.toFixed(2)}`}</p>
          <h2>{`R$ ${(count * price).toFixed(2)}`}</h2>
        </div>
        {/* botão para excluir produto do carrinho */}
        <button
          type="button"
          data-testid="remove-product"
          onClick={ () => removeAllOfThisProduct(product) }
          className="cartButtons"
        >
          ❌
        </button>

      </li>
    );
  }
}

CartProducts.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired,
  }).isRequired,
  removeAllOfThisProduct: PropTypes.func.isRequired,
  cartTotalValueCounter: PropTypes.func.isRequired,
};
