"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
interface Product {
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  slug: string;
  _type: string;
  _id: string;
  quantity: number;
  colors: string;
  inventory: number;
  category: string;
  status: string;
}
export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load the cart from localStorage when the page loads
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // Function to add a product to the cart
  

  // Function to remove a product from the cart
  const handleRemoveFromCart = (ProductID: string) => {
    // const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Filter out the product that needs to be removed
    const updatedCart = cart.filter((item: Product) => item._id !== ProductID);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update the state to trigger re-render
  };

  

  return (
    <main className="w-full bg-gradient-to-r from-teal-800 to-yellow-600">
    <div className=" h-screen text-black bg-gradient-to-r from-teal-800 to-yellow-600 max-w-[1440px] mx-auto">
      <h1 className="text-3xl font-bold glow  mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-4 p-4 border-b border-black ">
              
              <div>
                <p>{item.productName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Original Price : ${item.price}</p>
                <p>Total Price: ${item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <Link href={"/checkout"}></Link>
      <button className="bg-black text-white py-2 px-4 rounded w-full mx-auto">CheckOut </button>
    </div>
    
    </main>
  );
}