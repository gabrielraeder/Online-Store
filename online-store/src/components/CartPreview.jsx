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

    return (
      <div className="carPreviewContainer">
        <ul>
          { cartWithCounter.map(({ thumbnail, price, counter }, i) => (
            <li key={ i }>
              <img src={ thumbnail } alt="imagem" />
              <p>{`${ counter } x R$ ${price.toFixed(2)}`}</p>
            </li>
          ))}
        </ul>
        <h5>{ `R$ ${totalCartValue}` }</h5>
      </div>
    )
  };
}
