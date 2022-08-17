import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/Header.css';

export default class Header extends Component {
  handleGoBackButton = () => {
    const { hist } = this.props;
    hist.goBack();
  };

  render() {
    return (
      <header className="flex head">
        <h1 className="flexColumn centered headTitle"> FrontEnd Online Store</h1>
        <nav>
          <button
            type="button"
            onClick={ this.handleGoBackButton }
            className="navButtons"
          >
            Voltar
          </button>
          <Link to="/">
            <button type="button" className="navButtons">Página Inicial</button>
          </Link>
          <Link to="/shopping-cart">
            <button type="button" className="navButtons">Carrinho</button>
          </Link>
          <Link to="/checkout">
            <button type="button" className="navButtons">Checkout</button>
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
