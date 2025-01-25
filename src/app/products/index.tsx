// pages/products/index.tsx

"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

// Sanity client configuration
const sanity = createClient({
  projectId: "a4pxkpg5",
  dataset: "production",
  apiVersion: "2024-01-04",
  useCdn: true,
});

// Product interface for TypeScript
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  discountPercentage: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  tags: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Sanity API using the GROQ query
  const fetchProducts = async () => {
    try {
      const query = `
        *[_type == "product"]{
          _id,
          name,
          price,
          description,
          discountPercentage,
          image {
            asset->{
              _id,
              url
            }
          },
          tags
        }
      `;
      const data = await sanity.fetch(query);
      setProducts(data);
    } catch (error) {
      console.log("Error Fetching Products:", error);
    }
  };

  // Truncate description if it's too long
  const truncateDescription = (description: string) => {
    return description.length > 100 ? description.substring(0, 100) + "..." : description;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-center text-slate-800 mt-4 mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Render Image component only if imageUrl is valid */}
            {product.image?.asset?.url ? (
              <Image
                src={product.image.asset.url}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 rounded-md flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-slate-800 mt-2 text-sm">{truncateDescription(product.description)}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-slate-600 font-bold">${product.price.toFixed(2)}</p>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-green-600">{product.discountPercentage}% OFF</p>
                )}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-slate-400 text-black rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link to the dynamic product page */}
            <Link
              href={`/products/${product._id}`}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-center block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
