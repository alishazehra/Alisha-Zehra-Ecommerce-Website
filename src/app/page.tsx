import React from 'react'
import ProductCards from './cart/page'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1 className='sm:text-xl md:text-2xl lg:2xl text-center  '> Avion </h1>  
      
      <ul className="text-gray-500  sm:text-xl md:text-2xl lg:text-4xl flex justify-center items-center gap-4">
  <li > {/* Optional padding for better spacing */}
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
 
  
</ul> 
<br />

    <ProductCards/>
    </div>
  )
}

export default Home
