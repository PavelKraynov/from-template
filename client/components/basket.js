import React from 'react'
import { useSelector } from 'react-redux'
import Head from './head'
import Header from './header'
import BasketProduct from './basketProduct'

const Basket = () => {
  const basketList = useSelector((s) => s.basket.basketProducts)
  const totalPrice = useSelector((s) => s.basket.totalAmount)
  return (
    <div>
      <Head title="Basket" />
      <Header />
      <div className="flex flex-col items-center h-screen p-2">
        {Object.keys(basketList)
          .filter((id) => typeof basketList[id] !== 'undefined')
          .map((itemId) => {
            return (
              <div key={itemId}>
                <BasketProduct item={{ id: itemId, amount: basketList[itemId] }} />
              </div>
            )
          })}
      <div>Total amount: {totalPrice}</div>
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
