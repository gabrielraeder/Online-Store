import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
            component={ ProductsList }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
