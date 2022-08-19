import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { getSavedCartProducts } from '../services/localStorage';
import { countCartItems, cartTotalValueCounter } from '../services/helpers';

export default class Checkout extends Component {
  state = {
    cart: [],
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    checkoutResult: '',
    totalCheckoutValue: 0,
  }

  componentDidMount() {
    // recupera itens salvos ao entrar na página
    this.setState({
      cart: countCartItems(),
      totalCheckoutValue: cartTotalValueCounter(),
    });
  }

  // altera valores dos inputs
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  // faz a validação de todos os inputs
  validateFields = () => {
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    } = this.state;
    const validFields = name && email && cpf && phone && cep && address && payment;
    return validFields;
  }

  // se os inputs não forem válidos,
  // retorna mensagem de erro
  // senão, limpa localStorage e volta à tela inicial
  handleCheckoutClick = () => {
    const isValid = this.validateFields();
    const errorMessage = <p data-testid="error-msg">Campos inválidos</p>;
    const { history } = this.props;
    if (!isValid) this.setState({ checkoutResult: errorMessage });
    else {
      localStorage.removeItem('cart-items');
      history.push('/');
    }
  }

  render() {
    const {
      cart,
      name,
      email,
      cpf,
      cep,
      phone,
      address,
      checkoutResult,
      totalCheckoutValue,
    } = this.state;

    return (
      <div className="flex centered totalCheckoutContainer">
        <div className="checkoutField">
          <h2>Revise seu pedido</h2>
          {/* retorna prévia de todos os itens do carrinho */}
          <div className="flexColumn productsField">
            { cart.map(({ title, price, thumbnail, counter }, ind) => (
              <li key={ ind } className="checkoutProduct">
                <img src={ thumbnail } alt={ title } />
                <h2 data-testid="shopping-cart-product-name" className="cartCheckoutTitle">{ title }</h2>
                <div className="flexColumn productCheckoutContainer">
                  <p>{`Quantidade: ${counter}`}</p>
                  <h3>{ `R$ ${(counter * price).toFixed(2)}` }</h3>
                </div>
              </li>
            )) }
          </div>
          <h3>{ `Total do carrinho: R$ ${totalCheckoutValue.toFixed(2)}` }</h3>
        </div>

        <form className="flexColumn paymentContainer">
          <fieldset className="paymentDataContainer">

            {/* inputs para realização da compra */}
            <legend>Preencha seus dados</legend>
            <input
              name="name"
              value={ name }
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome completo"
              onChange={ this.handleChange }
              className="checkoutInput"
            />
            <input
              name="email"
              value={ email }
              type="email"
              data-testid="checkout-email"
              placeholder="Email"
              onChange={ this.handleChange }
              className="checkoutInput"
            />
            <input
              name="cpf"
              value={ cpf }
              type="text"
              data-testid="checkout-cpf"
              placeholder="CPF"
              onChange={ this.handleChange }
              className="checkoutInput"
            />
            <input
              name="phone"
              value={ phone }
              type="text"
              data-testid="checkout-phone"
              placeholder="Telefone"
              onChange={ this.handleChange }
              className="checkoutInput"
            />
            <input
              name="cep"
              value={ cep }
              type="text"
              data-testid="checkout-cep"
              placeholder="CEP"
              onChange={ this.handleChange }
              className="checkoutInput"
            />
            <input
              name="address"
              value={ address }
              type="text"
              data-testid="checkout-address"
              placeholder="Endereço"
              onChange={ this.handleChange }
              className="checkoutInput"
            />
          </fieldset>
          <fieldset className="paymentMethodContainer">

            {/* inputs para método de pagamento */}
            <legend>Método de pagamento</legend>
            <label htmlFor="ticket" className="paymentLabel">
              Ticket
              <input
                required
                type="radio"
                name="payment"
                id="ticket"
                data-testid="ticket-payment"
                value="ticket"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="visa" className="paymentLabel">
              Visa
              <input
                required
                type="radio"
                name="payment"
                id="visa"
                data-testid="visa-payment"
                value="visa"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="master" className="paymentLabel">
              Master-Card
              <input
                required
                type="radio"
                name="payment"
                id="master"
                data-testid="master-payment"
                value="master"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="elo" className="paymentLabel">
              Elo
              <input
                required
                type="radio"
                name="payment"
                id="elo"
                data-testid="elo-payment"
                value="elo"
                onChange={ this.handleChange }
              />
            </label>
          </fieldset>

          {/* botão para submeter os campos acima */}
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.handleCheckoutClick }
            className="productDetailButtons"
          >
            Finalizar compra
          </button>
          { checkoutResult }
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
