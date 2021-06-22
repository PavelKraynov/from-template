import React from 'react'
import Head from './head'
import Header from './header'

const Basket = () => {
  return (
    <div>
      <div>
        <Head title="Basket" />
        <Header />
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-blue-400 text-white p-4"> Hello World Dashboard </div>
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
