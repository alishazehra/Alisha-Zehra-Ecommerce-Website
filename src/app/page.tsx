import React from 'react'
import ProductCards from './cart/page'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1 className='sm:text-xl md:text-2xl lg:2xl text-center  '> Avion </h1>  
      
      <ul className="text-gray-500 sm:text-xl md:text-2xl lg:text-4xl flex justify-center items-center gap-2 ">
  <li className="hover:text-blue-600 transition-colors duration-200">
    <Link href="/plantpots">PlantPots</Link>
  </li>
  <li className="hover:text-blue-600 transition-colors duration-200">
    <Link href="/ceramics">Ceramics</Link>
  </li>
  <li className="hover:text-blue-600 transition-colors duration-200">
    <Link href="/tables">Tables</Link>
  </li>
  <li className="hover:text-blue-600 transition-colors duration-200">
    <Link href="/chairs">Chairs</Link>
  </li>
</ul>

<br />

    <ProductCards/>
    </div>
  )
}

export default Home
