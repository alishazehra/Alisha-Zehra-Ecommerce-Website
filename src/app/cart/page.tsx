


"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Image from "next/image";
import Link from 'next/link'; // Import Link to use navigation links

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
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false); // State for toggling the cart view

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

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to cart`);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setCartOpen((prevState) => !prevState);
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
      {/* Avion Header and Navigation */}
      <div>
        <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-center font-bold">Avion</h1>
        <ul className="text-gray-500 sm:text-xl md:text-2xl lg:text-4xl flex justify-center items-center gap-2 mt-4">
          <li className="hover:text-blue-600 transition-colors duration-200">
            <Link href="/plantpots">PlantPots</Link>
          </li>
          <li className="hover:text-blue-600 transition-colors duration-200">
            <Link href="/plantpots">Ceramics</Link>
          </li>
          <li className="hover:text-blue-600 transition-colors duration-200">
            <Link href="/plantpots">Tables</Link>
          </li>
          <li className="hover:text-blue-600 transition-colors duration-200">
            <Link href="/plantpots">Chairs</Link>
          </li>
        </ul>
      </div>

      {/* Product Cards */}
      <h2 className="text-center text-slate-800 mt-4 mb-4 text-xl md:text-2xl font-semibold">Products from API&apos;s Data</h2>
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
              <p className="text-slate-800 mt-2 text-sm md:text-base">{truncateDescription(product.description)}</p>
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

            {/* Add to cart button */}
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-slate-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-red-600">Cart Summary</h2>
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center shadow-sm p-4 rounded-md">
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-blue-600">${item.price.toFixed(2)}</p>
                </div>
                {item.image?.asset?.url ? (
                  <Image
                    src={item.image.asset.url}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black text-center">Your Cart is empty. Please add products.</p>
        )}
      </div>

      {/* Cart Icon */}
      <div className="absolute top-4 right-4">
        <div
          className="cursor-pointer"
          style={{
            fontSize: "2rem", // Adjust the size of the cart icon
            color: "black",   // Make the cart icon dark black
          }}
          onClick={toggleCart} // Click to toggle cart view
        >
          🛒
        </div>
        {/* Cart count notification (shows '0' if the cart is empty) */}
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cart.length === 0 ? "0" : cart.length}
        </span>
      </div>

      {/* Cart Details (Only show if cart is open) */}
      {cartOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-10 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Cart Items</h2>
            {cart.length === 0 ? (
              // Show empty cart message when no products are added
              <p className="text-black text-center">Your Cart is empty. Please add products.</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-4 shadow-sm rounded-md">
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-blue-600">${item.price.toFixed(2)}</p>
                    </div>
                    {item.image?.asset?.url ? (
                      <Image
                        src={item.image.asset.url}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
              onClick={toggleCart} // Close the cart
            >
              Close Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCards;
