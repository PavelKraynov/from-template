import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToBasket } from '../redux/reducers/basket'

const Product = (props) => {
  const dispatch = useDispatch()
  const currency = useSelector((store)=> store.products.currency)
  const currentRate = useSelector((store) => store.products.rates)
  const amount = useSelector((store) => store.basket.basketProducts?.[props.good.id])
  return (
    <div>
      <div className="card bg-indigo-600 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-2">
        <img alt={props.good.title} src={props.good.image} className="card__image object-cover w-32 h-32 " />
        <div className="card_price">{(props.good.price * currentRate[currency]).toFixed(2)}</div>
        <div className="currency">{currency}</div>
        <div className="card_title">{props.good.title}</div>
        <div className="card_product_amount">{amount}</div>
        <button
          className="border p-2"
          type="button"
          onClick={() => dispatch(addToBasket(props.good.id))}
        >
          add
        </button>
      </div>

    </div>
  )
}

Product.propTypes = {}

export default React.memo(Product)
