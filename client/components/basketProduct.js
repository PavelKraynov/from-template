import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBusket } from '../redux/reducers/basket'


const BasketProduct = ({ item }) => {
  const dispatch = useDispatch()
  const product = useSelector((s) => s.products.goods?.[item.id])
  const currentRate = useSelector((store) => store.products.rates)
  const currency = useSelector((store) => store.products.currency)
  return (
    <div className="flex flex-row space-x-4">
      <img className="product_image" src={product.image} alt={product.title} />
      <div className="product_title">{product.title}</div>
      <div className="product_price">{(product.price * currentRate[currency]).toFixed(2)} {currency}</div>
      <div className="product_amout">{item.amount}</div>
      <div className="product__total_price">total_price</div>
      <button type="button" className="product__remove p-2 border" onClick={() => dispatch(removeFromBusket(item.id))}>
        -
      </button>
    </div>
  )
}

BasketProduct.propTypes = {}

export default React.memo(BasketProduct)
