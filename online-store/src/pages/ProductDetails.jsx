import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import { addToCart, getSavedCartProducts } from '../services/localStorage';
import EvaluationForm from '../components/EvaluationForm';
import '../css/productDetails.css';

export default class ProductDetails extends Component {
  state = {
    product: {},
    evalResults: [],
    cartSize: 0,
    mapAttr: [],
  }

  async componentDidMount() {
    this.getCartLength();
    await this.getProduct();
    this.getSavedEvaluations();
  }

  getCartLength = () => {
    const cart = getSavedCartProducts();
    this.setState({ cartSize: !cart ? 0 : cart.length });
  }

  // recupera avaliações do produto no localStorage
  // se não houver nada salva um array vazio para não dar erro
  // atualiza o estado com o resultado
  getSavedEvaluations = () => {
    const { product } = this.state;
    const evalsRetrieved = JSON.parse(localStorage.getItem(product.id));
    if (!evalsRetrieved) localStorage.setItem(product.id, JSON.stringify([]));
    const realEval = JSON.parse(localStorage.getItem(product.id));
    this.setState({ evalResults: realEval });
  }

  // adiciona um item no localStorage
  addToStorage = () => {
    const { product } = this.state;
    addToCart(product);
    this.getCartLength();
  }

  // faz o fetch de um item a partir
  // do id recebido por props
  // (é chamada no componentDidMount)
  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductFromId(id)
      .then((data) => data);

    this.setState({ product }, () => {
      this.setState({
        mapAttr: this.mapAttributes(),
      });
    });
  }

  mapAttributes = () => {
    const { product: { attributes } } = this.state;
    return attributes.map((att, i) => {
      if (att.value_name === null || att.name === 'SKU') return null;
      return (
        <p key={ i }>
          <strong>{`${att.name}: `}</strong>
          { att.value_name }
        </p>);
    });
  }

  render() {
    const { product, evalResults, cartSize, mapAttr } = this.state;
    const { thumbnail, title,
      price, available_quantity: avalibility, shipping } = product;
    const stringOfCartSize = JSON.stringify(cartSize);
    const priceFIX = typeof price === 'number' && `R$ ${price.toFixed(2)}`;
    const freeShip = shipping !== undefined ? shipping.free_shipping : false;

    return (
      <div className=" flexColumn centered productDetailsContainer">

        {/* link para o carrinho */}
        <Link to="/shopping-cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            <span data-testid="shopping-cart-size">{ stringOfCartSize }</span>
            🛒 Ir ao Carrinho
          </button>
        </Link>

        {/* detalhes do produto */}
        <section className="flexColumn centered productSection">

          <div className="detailsPageContainer">
            <h2 data-testid="product-detail-name">{ title }</h2>
            <div>
              <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
              <h2 data-testid="product-detail-price">{ priceFIX }</h2>
            </div>

            <div>
              { avalibility > 0 && <p>Estoque disponível</p> }
              { freeShip && <p>🚚 Frete Grátis</p> }
              <button
                type="button"
                onClick={ this.addToStorage }
                data-testid="product-detail-add-to-cart"
              >
                Adicionar ao Carrinho
              </button>
            </div>

          </div>

          <fieldset className="specifications">
            <legend><h2>Especificações Tecnicas</h2></legend>
            { mapAttr }
          </fieldset>

        </section>

        {/* formulário para avaliação do produto */}
        <EvaluationForm
          product={ product }
          evals={ evalResults }
        />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape().isRequired,
};
