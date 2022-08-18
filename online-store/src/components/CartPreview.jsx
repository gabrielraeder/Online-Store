import React, { Component } from 'react';
import { countCartItems, cartTotalValueCounter } from '../services/helpers';
import '../css/CartPreview.css';

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
          { cartWithCounter.map(({ thumbnail, price, counter }, i) => (
            <li key={ i } className="cartPrevItem flex">
              <img src={ thumbnail } alt="imagem" />
              <div>
                <p>{` ${ counter } x R$ ${price.toFixed(2)}`}</p>
                <h5>{ `R$ ${(price * counter).toFixed(2)}` }</h5>
              </div>
            </li>
          ))}
        </ul>
        <h5>{ `Total: R$ ${totalCartValue.toFixed(2)}` }</h5>
      </div>
    )
  };
}
