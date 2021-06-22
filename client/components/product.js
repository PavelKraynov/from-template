import React from 'react'
import { useSelector } from 'react-redux'

const Product = (props) => {
  const currency = useSelector((store)=> store.products.currency)
  const currentRate = useSelector((store) => store.products.rates)
  return (
    <div>
      <div className="card bg-indigo-600 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-2">
        <img alt="img" src={props.good.image} className="card__image" />
        <div className="card_price">{(props.good.price * currentRate[currency]).toFixed(2)}</div>
        <div className="currency">{currency}</div>
        <div className="card_title">{props.good.title}</div>
        <div className="card_product_amount">amount</div>
        <button className="border p-2" type="button">
          add
        </button>
      </div>
    </div>
  )
}

Product.propTypes = {}

export default React.memo(Product)
