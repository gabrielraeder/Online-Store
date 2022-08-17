import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  handleGoBackButton = () => {
    const { hist } = this.props;
    hist.goBack();
  };

  render() {
    return (
      <header className="flexColumn head">
        <h1 className="flexColumn centered"> FrontEnd Online Store</h1>
        <nav>
          <button
            type="button"
            onClick={ this.handleGoBackButton }
          >
            Voltar
          </button>
          <Link to="/">
            <button type="button">Página Inicial</button>
          </Link>
          <Link to="/shopping-cart">
            <button type="button">Carrinho</button>
          </Link>
          <Link to="/checkout">
            <button type="button">Checkout</button>
          </Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  hist: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
