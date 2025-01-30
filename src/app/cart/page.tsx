
// "use client";

// import React, { useEffect, useState } from "react";
// import { createClient } from "@sanity/client";
// import Image from "next/image";
// import Link from 'next/link'; // Import Link to use navigation links

// // Sanity client configuration
// const sanity = createClient({
//   projectId: "a4pxkpg5",
//   dataset: "production",
//   apiVersion: "2024-01-04",
//   useCdn: true,
// });

// // Product interface for TypeScript
// interface Product {
//   slug: string; // Updated type from `any` to `string`
//   _id: string;
//   name: string;
//   price: number;
//   description: string;
//   discountPercentage: number;
//   image: {
//     asset: {
//       _id: string;
//       url: string;
//     };
//   };
//   tags: string[];
// }

// const ProductCards: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [cart, setCart] = useState<Product[]>([]);
//   const [cartOpen, setCartOpen] = useState<boolean>(false); // State for toggling the cart view
//   const [wishlist, setWishlist] = useState<Product[]>([]); // Wishlist state
//   const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
//   const [wishlistOpen, setWishlistOpen] = useState<boolean>(false); // Wishlist modal visibility
//   const [signupOpen, setSignupOpen] = useState<boolean>(false); // Signup form visibility
//   const [signupSuccess, setSignupSuccess] = useState<boolean>(false); // State to track successful signup

//   // Fetch products from Sanity API using the GROQ query
//   const fetchProducts = async () => {
//     try {
//       const query = `
//         *[_type == "product"]{
//           _id,
//           name,
//           price,
//           description,
//           discountPercentage,
//           image {
//             asset->{
//               _id,
//               url
//             }
//           },
//           tags
//         }
//       `;
//       const data = await sanity.fetch(query);
//       setProducts(data);
//     } catch (error) {
//       console.log("Error Fetching Products:", error);
//     }
//   };

//   // Add product to cart
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     alert(`${product.name} has been added to cart`);
//   };

//   // Add product to wishlist
//   const addToWishlist = (product: Product) => {
//     setWishlist((prevWishlist) => [...prevWishlist, product]);
//     alert(`${product.name} has been added to wishlist`);
//   };

//   // Toggle cart visibility
//   const toggleCart = () => {
//     setCartOpen((prevState) => !prevState); // Toggle the cart view
//   };

//   // Toggle wishlist visibility
//   const toggleWishlist = () => {
//     setWishlistOpen((prevState) => !prevState);
//   };

//   // Truncate description if it's too long
//   const truncateDescription = (description: string) => {
//     return description.length > 100 ? description.substring(0, 100) + "..." : description;
//   };

//   // Filter products based on search query
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Handle form submission
//   const handleSignupSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // After form submission, set signup success to true
//     setSignupSuccess(true);
//   };

//   return (
//     <div className="p-4">
//       {/* Avion Header and Navigation */}
//       <div>
//         <h1 className="text-center text-3xl font-bold">Avion</h1>
//         <ul className="flex justify-center gap-6 mt-4 text-lg text-gray-500">
//           <li className="hover:text-blue-600"><Link href="/plantpots">PlantPots</Link></li>
//           <li className="hover:text-blue-600"><Link href="/plantpots">Ceramics</Link></li>
//           <li className="hover:text-blue-600"><Link href="/plantpots">Tables</Link></li>
//           <li className="hover:text-blue-600"><Link href="/plantpots">Chairs</Link></li>
//         </ul>
//       </div>

//       {/* Search Bar */}
//       <div className="mt-4 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       {/* Product Cards */}
//       <h2 className="text-center text-xl font-semibold mt-4 mb-4">Products from API&apos;s Data</h2> {/* Updated with &apos; */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
//           >
//             {product.image?.asset?.url ? (
//               <Image
//                 src={product.image.asset.url}
//                 alt={product.name}
//                 width={300}
//                 height={300}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//             ) : (
//               <div className="w-full h-48 bg-gray-300 rounded-md flex items-center justify-center">
//                 <span>No Image Available</span>
//               </div>
//             )}
//             <div className="mt-4">
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p className="text-slate-800 mt-2 text-sm md:text-base">{truncateDescription(product.description)}</p>
//               <div className="flex justify-between items-center mt-4">
//                 <p className="text-slate-600 font-bold">${product.price.toFixed(2)}</p>
//                 {product.discountPercentage > 0 && (
//                   <p className="text-sm text-green-600">{product.discountPercentage}% OFF</p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-2 flex flex-wrap gap-2">
//               {product.tags.map((tag, index) => (
//                 <span key={index} className="text-xs bg-slate-400 text-black rounded-full px-2 py-1">
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             {/* Add to cart button */}
//             <button
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>

//             {/* Add to wishlist button (updated to yellow) */}
//             <button
//               className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
//               onClick={() => addToWishlist(product)}
//             >
//               Add to Wishlist
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Cart Icon and Wishlist Icon */}
//       <div className="absolute top-4 right-4 flex gap-4">
//         {/* Cart Icon */}
//         <div
//           className="cursor-pointer relative"
//           style={{ fontSize: "2rem", color: "black" }}
//           onClick={toggleCart}
//         >
//           🛒
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             {cart.length === 0 ? "0" : cart.length}
//           </span>
//         </div>

//         {/* Wishlist Icon */}
//         <div
//           className="cursor-pointer relative"
//           style={{ fontSize: "2rem", color: "black" }}
//           onClick={toggleWishlist}
//         >
//           ❤️
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             {wishlist.length === 0 ? "0" : wishlist.length}
//           </span>
//         </div>
//       </div>

//       {/* Wishlist Modal */}
//       {wishlistOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-10 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[80vh] overflow-auto">
//             <h2 className="text-xl font-bold mb-4">Wishlist</h2>
//             {wishlist.length === 0 ? (
//               <p className="text-black text-center">Your Wishlist is empty.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {wishlist.map((item, index) => (
//                   <li key={index} className="flex justify-between items-center p-4 shadow-sm rounded-md">
//                     <div>
//                       <p className="font-medium text-slate-900">{item.name}</p>
//                       <p className="text-sm text-blue-600">${item.price.toFixed(2)}</p>
//                     </div>
//                     {item.image?.asset?.url ? (
//                       <Image
//                         src={item.image.asset.url}
//                         alt={item.name}
//                         width={50}
//                         height={50}
//                         className="rounded-md"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <button
//               className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
//               onClick={toggleWishlist}
//             >
//               Close Wishlist
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Cart Details (Only show if cart is open) */}
//       {cartOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-10 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[80vh] overflow-auto">
//             <h2 className="text-xl font-bold mb-4">Cart Items</h2>
//             {cart.length === 0 ? (
//               <p className="text-black text-center">Your Cart is empty. Please add products.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {cart.map((item, index) => (
//                   <li key={index} className="flex justify-between items-center p-4 shadow-sm rounded-md">
//                     <div>
//                       <p className="font-medium text-slate-900">{item.name}</p>
//                       <p className="text-sm text-blue-600">${item.price.toFixed(2)}</p>
//                     </div>
//                     {item.image?.asset?.url ? (
//                       <Image
//                         src={item.image.asset.url}
//                         alt={item.name}
//                         width={50}
//                         height={50}
//                         className="rounded-md"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
            
//             {/* Add the Payment Button here */}
//             <button
//               className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700"
//               onClick={() => setSignupOpen(true)} // Open signup form
//             >
//               Pay with Easypaisa
//             </button>

//             <button
//               className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
//               onClick={toggleCart} // Close cart
//             >
//               Close Cart
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Cart Summary at the bottom */}
//       <div className="mt-8 bg-slate-100 p-6 rounded-lg shadow-md">
//         <h2 className="text-lg font-bold text-red-600">Cart Summary</h2>
//         {cart.length > 0 ? (
//           <ul className="space-y-4">
//             {cart.map((item, index) => (
//               <li key={index} className="flex justify-between items-center shadow-sm p-4 rounded-md">
//                 <div>
//                   <p className="font-medium text-slate-900">{item.name}</p>
//                   <p className="text-sm text-blue-600">${item.price.toFixed(2)}</p>
//                 </div>
//                 {item.image?.asset?.url ? (
//                   <Image
//                     src={item.image.asset.url}
//                     alt={item.name}
//                     width={50}
//                     height={50}
//                     className="rounded-md"
//                   />
//                 ) : (
//                   <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-black text-center">Your Cart is empty. Please add products.</p>
//         )}

//         <button
//           className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700"
//           onClick={() => setSignupOpen(true)} // Open signup form
//         >
//           Pay with Easypaisa
//         </button>

//         {/* Signup Form */}
//         {signupOpen && !signupSuccess && (
//           <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
//             <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[80vh] overflow-auto">
//               <h2 className="text-xl font-bold mb-4">Signup</h2>
//               <form onSubmit={handleSignupSubmit}>
//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     placeholder="Enter Email"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <input
//                     type="password"
//                     placeholder="Enter Password"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                 >
//                   Sign Up
//                 </button>
//               </form>
//               <button
//                 className="w-full mt-4 text-center text-sm text-red-600"
//                 onClick={() => setSignupOpen(false)} // Close signup form
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Success Message after Signup */}
//         {signupSuccess && (
//           <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
//             <div className="bg-white p-6 rounded-lg shadow-md w-96">
//               <h2 className="text-xl font-bold mb-4">Success!</h2>
//               <p className="text-green-600">Your signup request has been received. We'll process it shortly.</p>
//               <button
//                 className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                 onClick={() => setSignupSuccess(false)} // Hide success message
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <footer className="bg-gray-800 text-white py-8">
//         <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             <div className="footer-section">
//               <h4 className="text-xl font-bold mb-4">About Us</h4>
//               <p className="text-sm">Learn more about our company, our mission, and values.</p>
//             </div>
//             <div className="footer-section">
//               <h4 className="text-xl font-bold mb-4">Quick Links</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:underline">Home</a></li>
//                 <li><a href="#" className="hover:underline">Shop</a></li>
//                 <li><a href="#" className="hover:underline">About</a></li>
//                 <li><a href="#" className="hover:underline">Contact</a></li>
//               </ul>
//             </div>
//             <div className="footer-section">
//               <h4 className="text-xl font-bold mb-4">Contact Info</h4>
//               <p className="text-sm">Email: support@yourstore.com</p>
//               <p className="text-sm">Phone: +1 (800) 123-4567</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-700 text-center py-4 mt-8">
//           <p className="text-sm">&copy; 2025 YourStore. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ProductCards;
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

//Product interface for TypeScript
 export interface Product {
    // slug: string; // Updated type from `any` to `string`
  _id: string;
  name: string;
  slug: {
    current: string;
  };
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
  const [wishlist, setWishlist] = useState<Product[]>([]); // Wishlist state
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false); // Wishlist modal visibility
  const [signupOpen, setSignupOpen] = useState<boolean>(false); // Signup form visibility
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false); // State to track successful signup

  // Fetch products from Sanity API using the GROQ query
  const fetchProducts = async () => {
    try {
      const query = `
        *[_type == "product"]{
          _id,
          name,
          price,
          slug,
          description,
          discountPercentage,
          image {
            asset->{
              _id,
              url
            }
          },
          tags,
          
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
    alert(`${product.name} has been added to cart  
    View your Cart!`);
  };

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
    alert(`${product.name} has been added to wishlist,
       View your Wishlist!`);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setCartOpen((prevState) => !prevState); // Toggle the cart view
  };

  // Toggle wishlist visibility
  const toggleWishlist = () => {
    setWishlistOpen((prevState) => !prevState);
  };

  // Truncate description if it's too long
  const truncateDescription = (description: string) => {
    return description.length > 100 ? description.substring(0, 100) + "&hellip;" : description;
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submission
  const handleSignupSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // After form submission, set signup success to true
    setSignupSuccess(true);
  };

  return (
    <div className="p-4">
      {/* Avion Header and Navigation */}
      <div>
        <h1 className="text-center text-3xl font-bold">Avion</h1>
        <ul className="flex justify-center gap-6 mt-4 text-lg text-gray-500">
          <li className="hover:text-blue-600"><Link href="/plantpots">PlantPots</Link></li>
          <li className="hover:text-blue-600"><Link href="/plantpots">Ceramics</Link></li>
          <li className="hover:text-blue-600"><Link href="/plantpots">Tables</Link></li>
          <li className="hover:text-blue-600"><Link href="/plantpots">Chairs</Link></li>
        </ul>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Product Cards */}
      <h2 className="text-center text-xl font-semibold mt-4 mb-4">Products from API&apos;s Data</h2> {/* Updated with &apos; */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
         <div
                    key={product._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            > <Link href={`/product/${product.slug.current}`}>
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
              
              )} </Link>
    {/* </div>  */}
            {/* )}  */}
            
            <div className="mt-4"> <Link href={`/product/${product.slug.current}`}>
                <h2 className="text-lg font-semibold">{product.name}</h2> 
              <p className="text-slate-800 mt-2 text-sm md:text-base">{truncateDescription(product.description)}</p> 
              <div className="flex justify-between items-center mt-4">
                <p className="text-slate-600 font-bold">${product.price.toFixed(2)}</p>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-green-600">{product.discountPercentage}% OFF</p> 
                )} 
              </div> </Link>
            </div>

            <div className="mt-2 flex flex-wrap gap-2"> 
              {product.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-slate-400 text-black rounded-full px-2 py-1">
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

            {/* Add to wishlist button (updated to yellow) */}
            <button
              className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
              onClick={() => addToWishlist(product)}
            >
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>

      {/* Cart Icon and Wishlist Icon */}
      <div className="absolute top-4 right-4 flex gap-4">
        {/* Cart Icon */}
        <div
          className="cursor-pointer relative"
          style={{ fontSize: "2rem", color: "black" }}
          onClick={toggleCart}
        >
          🛒
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length === 0 ? "0" : cart.length}
          </span>
        </div>

        {/* Wishlist Icon */}
        <div
          className="cursor-pointer relative"
          style={{ fontSize: "2rem", color: "black" }}
          onClick={toggleWishlist}
        >
          ❤️
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {wishlist.length === 0 ? "0" : wishlist.length}
          </span>
        </div>
      </div>

      {/* Wishlist Modal */}
      {wishlistOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-10 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Wishlist</h2>
            {wishlist.length === 0 ? (
              <p className="text-black text-center">Your Wishlist is empty.</p>
            ) : (
              <ul className="space-y-4">
                {wishlist.map((item, index) => (
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
              onClick={toggleWishlist}
            >
              Close Wishlist
            </button>
          </div>
        </div>
      )}

      {/* Cart Details (Only show if cart is open) */}
      {cartOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-10 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Cart Items</h2>
            {cart.length === 0 ? (
              <p className="text-black text-center">Your Cart is empty. Please add products.</p>
            ) : (
              <ul className="space-y-4">  
                  {/* {tag} */}
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
            
            {/* Add the Payment Button here */}
            <button
              className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700"
              onClick={() => setSignupOpen(true)} // Open signup form
            >
              Pay with Easypaisa
            </button>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
              onClick={toggleCart} // Close cart
            >
              Close Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Summary at the bottom */}
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

        <button
          className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700"
          onClick={() => setSignupOpen(true)} // Open signup form
        >
          Pay with Easypaisa
        </button>

        {/* Signup Form */}
        {signupOpen && !signupSuccess && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 max-h-[80vh] overflow-auto">
              <h2 className="text-xl font-bold mb-4">Signup</h2>
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </form>
              <button
                className="w-full mt-4 text-center text-sm text-red-600"
                onClick={() => setSignupOpen(false)} // Close signup form
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Success Message after Signup */}
        {signupSuccess && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">Success!</h2>
              <p className="text-green-600">Your signup request has been received. We&apos;ll process it shortly.</p>
              <button
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={() => setSignupSuccess(false)} // Hide success message
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="footer-section">
              <h4 className="text-xl font-bold mb-4">About Us</h4>
              <p className="text-sm">Learn more about our company, our mission, and values.</p>
            </div>
            <div className="footer-section">
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Shop</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="text-xl font-bold mb-4">Contact Info</h4>
              <p className="text-sm">Email: support@yourstore.com</p>
              <p className="text-sm">Phone: +1 (800) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 text-center py-4 mt-8">
          <p className="text-sm">&copy; 2025 YourStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductCards;
