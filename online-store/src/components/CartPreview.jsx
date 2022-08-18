import React, { Component } from 'react';
import { countCartItems, cartTotalValueCounter } from '../services/helpers';

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

    return (
      <div>
        <ul>
          { cartWithCounter.map(({ thumbnail, price, counter }, i) => (
            <li key={ i }>
              <img src={ thumbnail } alt="imagem" />
              <p>{`${ counter } x ${price.toFixed(2)}`}</p>
            </li>
          ))}
        </ul>
        <h5>{ totalCartValue }</h5>
      </div>
    )
  };
}
