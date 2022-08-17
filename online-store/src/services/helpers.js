import { getSavedCartProducts } from './localStorage';

export const sortProducts = (myProducts, sorting) => {
  if (sorting === 'lowPrice') {
    return myProducts.sort((a, b) => a.price - b.price);
  }
  return myProducts.sort((a, b) => b.price - a.price);
};

// recebe array de produtos salvos,
// conta itens repetidos,
// retira itens repetidos e
// conta a quantidade de itens adicionando a chave counter nos objetos
export const countCartItems = () => {
  const totalCart = getSavedCartProducts();
  if (!totalCart) return [];
  const cartIds = totalCart.map(({ id }) => id);
  const filteredIds = [...new Set(cartIds)];
  const filteredCart = filteredIds.map((id) => totalCart.find((obj) => obj.id === id));
  return filteredCart.reduce((acc, cur) => {
    const curCount = totalCart.filter((elm) => elm.id === cur.id).length;
    const newCur = { ...cur, counter: curCount };
    return [...acc, newCur];
  }, []);
};
