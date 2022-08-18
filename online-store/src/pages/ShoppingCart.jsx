import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { removeAllProduct } from '../services/localStorage';
import { countCartItems, cartTotalValueCounter } from '../services/helpers';
import CartProducts from '../components/CartProducts';
import '../css/shoppingCart.css';

export default class ShoppingCart extends Component {
  state = {
    cartWithCounter: [],
    totalCartValue: 0,
  }

  componentDidMount() {
    this.setState({
      cartWithCounter: countCartItems(),
      totalCartValue: cartTotalValueCounter(),
    });
  }

  updateTotalCount = () => {
    this.setState({
      totalCartValue: cartTotalValueCounter(),
    })
  }

  // remove produtos e atualiza o estado
  removeAllOfThisProduct = (product) => {
    removeAllProduct(product);
    this.setState({
      cartWithCounter: countCartItems(),
      totalCartValue: cartTotalValueCounter(),
    });
    // cartTotalValueCounter();
    const { getCartLength } = this.props;
    getCartLength();
  };

  render() {
    const { cartWithCounter, totalCartValue } = this.state;
    const { getCartLength } = this.props;

    const emptyCart = (
      <h2 data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </h2>);

    const mapCart = cartWithCounter.map((item, index) => (
      <CartProducts
        key={ index }
        product={ item }
        cart={ cartWithCounter }
        removeAllOfThisProduct={ this.removeAllOfThisProduct }
        updateTotalCount={ this.updateTotalCount }
        getCartLength={ getCartLength }
      />
    ));

    return (
      <div className="flexColumn centered">

        <h2>CARRINHO</h2>
        <div className="shoppingCartContent">
          {/* condicional que mostra carrinho ou mensagem */}
          <ul>{ cartWithCounter.length === 0 ? emptyCart : mapCart }</ul>
          <div className="cartTotal">
            <div>
              <h3>
                Total:
              </h3>
              <h2 className="strong">{`R$ ${totalCartValue.toFixed(2)}`}</h2>

            </div>

            {/* link para checkout */}
            <Link
              to="/checkout"
              data-testid="checkout-products"
            >
              <button
                type="button"
                disabled={ cartWithCounter.length === 0 }
              >
                Finalizar compra
              </button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}
