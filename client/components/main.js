import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Head from './head'
import Header from './header'
import Product from './product'
import { getProductsFromServer, getRates } from '../redux/reducers/products'


const Main = () => {
  const dispatch = useDispatch()
  const listOfGoods = useSelector((s) => s.products.goods)
  // const listOfRates = useSelector((s) => s.products.rates)
  useEffect(()=> {
    dispatch(getProductsFromServer())
    dispatch(getRates())
  }, [])
  return (
    <div className="h-full">
      <Head title="Hello" />
      <Header />
      <div className="flex flex-wrap h-screen" >
        {Object.entries(listOfGoods).map((good) => {
        return <div key={good[0]}>
        <Product good={good[1]} />
         </div>
      }) }</div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
