
import { client } from "@/sanity/lib/client"

import { groq } from "next-sanity"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { Product } from "@/app/cart/page"

interface ProductPageProps {
  params: Promise <{slug: string}>
}
async function getProduct (slug: string):Promise<Product> {
  return client.fetch (
    groq `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description,
  
    _type,
    image,
    price,
    }`, {slug}
  )


}
export default async function ProductPage ({params} : ProductPageProps){
  const  {slug} = await params;
  const product = await getProduct(slug)
  const imageUrl = product.image?.asset?.url || "/path/to/fallback-image.jpg" // Fallback image if none exists

  function addToCart(product: Product): void {
    throw new Error("Function not implemented.")
  }

  return (
    
    <div className="max-w-7xl- mx-auto px-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="aspect-square">{product.image && (
        <Image
          src={urlFor(product.image).url()}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg shadow-md" />
      )}</div>
      <div className="flex flex-col gap-8"><h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-2xl font-bold">Price: {product.price}</p>
        <p className="text-2xl "> {product.description}</p>

        <p className="text-2xl "> {product._id}</p>

      </div>
      
           
    </div>
    </div>
  )
}
