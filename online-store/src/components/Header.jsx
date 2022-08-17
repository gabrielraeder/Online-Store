import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import '../css/Header.css';

export default class Header extends Component {

  render() {
    const { handleChange, searchProducts, searchInput, handleRedirect } = this.props;

    return (
      <header className="flex head">
        <h1 className="flexColumn centered headTitle"> FrontEnd Online Store</h1>
        <nav>
          <SearchBar
            searchProducts={ searchProducts }
            handleChange={ handleChange }
            searchInput={ searchInput }
          />
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
