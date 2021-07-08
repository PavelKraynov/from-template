import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import products from './products'
import basket from './basket'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    products,
    basket
  })

export default createRootReducer
