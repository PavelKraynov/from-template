import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { history } from '../redux'
import { setCurrency, sortProducts } from '../redux/reducers/products'


const Header = () => {
  const [dir, setDir] = useState(true)
  const dispatch = useDispatch()
  const onClick = (e) => dispatch(setCurrency(e.target.textContent))
  const sortIt = (type) => {
    dispatch(sortProducts(type, dir ? 'a-z' : 'z-a'))
    setDir(!dir)
  }
  return (
    <nav className="flex  flex-col justify-center bg-blue-400 font-bold text-white h-24 w-screen select-none">
      <div>
        <Link to="/">
          <div id="brand-name" className=" mt-2 px-4 py-2">
            Shop
          </div>
        </Link>
      </div>
      <div className="flex justify-between px-1">
        <div>
          <button type="button" className="border p-1" onClick={(e)=>onClick(e)}>
            USD
          </button>
          <button type="button" className="border p-1" onClick={(e)=>onClick(e)}>
            EUR
          </button>
          <button type="button" className="border p-1" onClick={(e)=>onClick(e)}>
            CAD
          </button>
        </div>
        <div>
          <button type="button" id="sort-price" className="border p-1" onClick={()=> sortIt('price')}>
            Sort by price
          </button>
          <button type="button" id="sort-name" className="border p-1" onClick={()=> sortIt('title')}>
            Sort by name
          </button>
        </div>
        <div className="flex justify-between px-1">
          <button
            type="button"
            id="order-count"
            onClick={() => history.push('/basket')}
            className="border p-1"
          >
            basket
          </button>
          <div>Summ</div>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default React.memo(Header)
