import React from 'react'
import ProductCards from './products/page'
import Link from 'next/link'
const Home = () => {
  return (
    <div>
      <h1 className='sm:text-xl md:text-2xl lg:2xl text-center '> Avion </h1> 
      <hr />
      <ul className="text-gray-500  sm:text-xl md:text-2xl lg:text-4xl flex justify-center items-center gap-4">
  <li className='px-4'> {/* Optional padding for better spacing */}
    <Link href="/plantpots">PlantPots</Link>
  </li>
  <li >
    <Link href="/plantpots">Ceramics</Link>
  </li>
  <li >
    <Link href="/plantpots">Tables</Link>
  </li>
  <li >
    <Link href="/plantpots">Chairs</Link>
  </li>
  <li >
    <Link href="/plantpots">Crockery</Link>
  </li>
  <li >
    <Link href="/plantpots">Tableware</Link>
  </li>
  <li >
    <Link href="/plantpots">Cutlery</Link>
  </li>
</ul>
      <ProductCards/>
    </div>
  )
}

export default Home
