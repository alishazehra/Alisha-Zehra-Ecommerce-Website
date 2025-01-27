'use client';
import React, { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 🔹 Har page par 4 products dikhayenge

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = `*[_type == "product" && image.asset != null]{
        _id,
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        price
      }`;
      const result = await client.fetch(query);
      setData(result || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  // 🔹 Pagination ke liye slice function
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = data.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(data.length / itemsPerPage); // 🔹 Total pages calculate kiye

  return (
    <section className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
      <h1 className="text-2xl font-semibold md:text-3xl text-center">New Ceramics</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-12">
        {loading ? (
          <div className="col-span-4 flex justify-center items-center">
            {/* Loading Spinner */}
            <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-[#2A254B] rounded-full animate-spin"></div>
          </div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="w-full h-auto" key={product._id}>
              <Link href={`/products/${product.slug}`}>
                <Image
                  src={product.imageUrl}
                  height={700}
                  width={700}
                  alt={product.name}
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-md"
                />
              </Link>
              <div className="my-4 text-[#2A254B]">
                <p className="py-2 text-sm sm:text-base">{product.name}</p>
                <p className="text-lg font-semibold">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No products found</p>
        )}
      </div>

      {/* 🔹 Pagination Controls with Page Numbers */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className={`px-4 py-2 border rounded-md text-sm sm:text-base ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* 🔹 Page Numbers */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-2 border rounded-md text-sm sm:text-base ${currentPage === index + 1 ? "bg-[#2A254B] text-white" : "hover:bg-gray-200"}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className={`px-4 py-2 border rounded-md text-sm sm:text-base ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsPage;
