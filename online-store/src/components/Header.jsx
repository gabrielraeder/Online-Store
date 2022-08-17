import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  render() {
    const { handleChange, searchProducts, searchInput, handleRedirect } = this.props;

    return (
      <header className="flexColumn head">
        <h1 className="flexColumn centered"> FrontEnd Online Store</h1>
        <SearchBar
          searchProducts={ searchProducts }
          handleChange={ handleChange }
          searchInput={ searchInput }
          />
        <nav className="flex centered">
          <Link to="/">
            <button type="button" onClick={ handleRedirect }>Página Inicial</button>
          </Link>
          <Link to="/shopping-cart">
            <button type="button" onClick={ handleRedirect }>Carrinho</button>
          </Link>
          <Link to="/checkout">
            <button type="button" onClick={ handleRedirect }>Checkout</button>
          </Link>
        </nav>
      </header>
    );
  }
}
