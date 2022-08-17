import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import { getProductsFromCategoryAndQuery } from './services/api';

class App extends Component {
  state = {
    searchInput: '',
    products: [],
    redirect: false,
  }

  // reconhece mudança nos inputs
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleRedirect = () => {
    this.setState({
      redirect: false,
    })
  }

  // verifica se a busca veio do input ou de um botão de categoria
  queryOrId = async (searchInput) => {
    // const { searchInput } = this.state;
    if (searchInput.includes('MLB')) {
      const result = await getProductsFromCategoryAndQuery(searchInput, undefined)
        .then((data) => data);
      return result;
    }
    const result = await getProductsFromCategoryAndQuery(undefined, searchInput)
      .then((data) => data);
    return result;
  }

  // procura os produtos
  // (ocorre após a função de cima)
  searchProducts = async () => {
    const { searchInput } = this.state;
    const products = await this.queryOrId(searchInput)
      .then((response) => response);
    this.setState({
      products: products.results,
    }, () => {
      if(searchInput.length > 0) {
        this.setState({
          redirect: true,
        })
      }
    });
  }

  // busca produtos por categoria
  handleCategoryButton = async ({ target }) => {
    const products = await getProductsFromCategoryAndQuery(target.id, undefined)
      .then((data) => data);
    this.setState({
      products: products.results,
    });
  }

  render() {
    const { searchInput, redirect, products } = this.state;

    return (
      <BrowserRouter>
        <Header
          searchProducts={ this.searchProducts }
          handleChange={ this.handleChange }
          searchInput={ searchInput }
          handleRedirect={ this.handleRedirect }
        />
        { redirect && <Redirect to="/"/>}
        <Switch>
          <Route
            path="/product-details/:id"
            component={ ProductDetails }
          />
          <Route
            path="/shopping-cart"
            component={ ShoppingCart }
          />
          <Route
            path="/checkout"
            component={ Checkout }
          />
          <Route
            exact
            path="/"
            render={ () => (
              <ProductsList mapProducts={ products }
                handleCategoryButton={ this.handleCategoryButton } 
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;