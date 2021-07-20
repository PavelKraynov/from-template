const CHANGE_PRODUCTS = 'store/basket/CHANGE_PRODUCTS'
// const REMOVE_PRODUCTS = 'store/basket/REMOVE_PRODUCTS'

const initialState = {
  basketProducts: {},
  priceState: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCTS: {
      return {
        ...state,
        basketProducts: action.changeGoods,
        priceState: action.totalAmount
      }
    }
    default:
      return state
  }
}

 function totalPrice(basket) {
   return Object.values(basket).reduce((acc, rec) => acc + rec, 0)

 }

export function addToBasket(itemId) {
  return (dispatch, getState) => {
    const store = getState()
    const basket = store.basket.basketProducts
    const updateBasket =
      typeof basket?.[itemId] === 'undefined'
        ? { ...basket, [itemId]: 1 }
        : { ...basket, [itemId]: basket[itemId] + 1 }
       const totalAmount = totalPrice(updateBasket)
    dispatch({ type: CHANGE_PRODUCTS, changeGoods: updateBasket, totalAmount })
  }
}

export function removeFromBusket(itemId) {
  return (dispatch, getState) => {
    const store = getState()
    const basket = store.basket.basketProducts
    const updateBasket = { ...basket, [itemId]: basket[itemId] - 1 }
    if (updateBasket[itemId] <= 0) {
      delete updateBasket[itemId]
    }

       const totalAmount = totalPrice(updateBasket)
    dispatch({ type: CHANGE_PRODUCTS, changeGoods: updateBasket, totalAmount })
  }
}


