import React, { Component } from 'react';
import { countCartItems, cartTotalValueCounter } from '../services/helpers';
import '../css/CartPreview.css';
import { Link } from 'react-router-dom';

export default class CartPreview extends Component {
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

  render() {
    const { cartWithCounter, totalCartValue } = this.state;
    const { hideCart, showCart } = this.props;

    return (
      <div
        className="cartPreviewContainer flexColumn"
        onMouseOver={ showCart }
        onMouseLeave={ hideCart }
      >
        <ul>
          { cartWithCounter.map(({ thumbnail, price, counter, id }, i) => (
            <li key={ i } className="flex">
              <Link
                to={ `/product-details/${id}` }
                className="cartPrevItem flex"
              >
                <img src={ thumbnail } alt="imagem" />
                <div>
                  <p>{` ${ counter } x R$ ${price.toFixed(2)}`}</p>
                  <h5>{ `R$ ${(price * counter).toFixed(2)}` }</h5>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <h5>{ `Total: R$ ${totalCartValue.toFixed(2)}` }</h5>
      </div>
    )
  };
}
