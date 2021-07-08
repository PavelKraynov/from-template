const CHANGE_PRODUCTS = 'store/basket/CHANGE_PRODUCTS'
// const REMOVE_PRODUCTS = 'store/basket/REMOVE_PRODUCTS'

const initialState = {
  basketProducts: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCTS: {
      return {
        ...state,
        basketProducts: action.changeGoods
      }
    }
    default:
      return state
  }
}

export function addToBasket(itemId) {
  return (dispatch, getState) => {
    const store = getState()
    const basket = store.basket.basketProducts
    const newItemInBusket =
      typeof basket?.[itemId] === 'undefined'
        ? { ...basket, [itemId]: 1 }
        : { ...basket, [itemId]: basket[itemId] + 1 }
    dispatch({ type: CHANGE_PRODUCTS, changeGoods: newItemInBusket })
  }
}

export function removeFromBusket(itemId) {
  return (dispatch, getState) => {
    const store = getState()
    const basket = store.basket.basketProducts
    const updateBasket =
      basket[itemId] <= 0
        ? { ...basket, [itemId]: undefined }
        : { ...basket, [itemId]: basket[itemId] - 1 }
    dispatch({ type: CHANGE_PRODUCTS, changeGoods: updateBasket })
  }
}
