"use client"; // This ensures the component runs only on the client-side.

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { createClient } from "@sanity/client"; // Import Sanity client to fetch data
import Image from "next/image";

// Sanity client configuration
const sanity = createClient({
  projectId: "a4pxkpg5", // Your Sanity Project ID
  dataset: "production", // Your Sanity dataset name
  apiVersion: "2024-01-04", // API version
  useCdn: true, // Enable CDN
});

// TypeScript interface for the Product data structure
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

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null); // State to hold product data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const router = useRouter(); // Access the router

  const { id } = router.query; // Destructure id from the router query

  // Fetch product data when the id is available (client-side only)
  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          const queryStr = `*[_type == "product" && _id == "${id}"]{
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
          }`;
          
          const data = await sanity.fetch(queryStr);
          
          if (data.length > 0) {
            setProduct(data[0]); // Set the fetched product data
          } else {
            console.log("Product not found.");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      };
      
      fetchProductData();
    }
  }, [id]); // Run effect when id is available

  // Show loading state while fetching product
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error if no product is found
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-slate-800 mt-4 mb-4">{product.name}</h2>
      <div className="flex justify-center items-center">
        {product.image?.asset?.url ? (
          <Image
            src={product.image.asset.url}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover rounded-md"
          />
        ) : (
          <div className="w-48 h-48 bg-gray-300 rounded-md flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-slate-800 mt-2">{product.description}</p>
        <p className="text-slate-600 font-bold mt-2">${product.price.toFixed(2)}</p>
        {product.discountPercentage > 0 && (
          <p className="text-sm text-green-600">{product.discountPercentage}% OFF</p>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-slate-400 text-black rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
