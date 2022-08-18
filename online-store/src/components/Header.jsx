import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import cartIcon from '../images/cartIcon.png';

export default class Header extends Component {

  render() {
    const { handleChange, searchProducts, searchInput, handleRedirect, cartSize } = this.props;

    return (
      <header className="flex head">
        <Link to="/" className="titleLink">
          <h1 className="flexColumn centered headTitle">FrontEnd Online Store</h1>
        </Link>
          <SearchBar
            searchProducts={ searchProducts }
            handleChange={ handleChange }
            searchInput={ searchInput }
          />
        <nav className="navigation">
          <Link to="/">
            <button
              type="button"
              className="navButtons"
              onClick={ handleRedirect }
            >
              Página Inicial
            </button>
          </Link>
          <Link to="/checkout">
            <button
              type="button"
              className="navButtons"
              onClick={ handleRedirect }
            >
              Checkout
            </button>
          </Link>
          <Link to="/shopping-cart" className="cartLink">
              <button
                type="button"
                className="cartButton"
                onClick={ handleRedirect }
              >
                <img src={ cartIcon } alt="🛒" className="cartBtnImage" />
                <span data-testid="shopping-cart-size" className="cartQuantity">{ cartSize }</span>
              </button>
            </Link>
        </nav>
      </header>
    );
  }
}
