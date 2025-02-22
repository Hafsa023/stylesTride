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

  const handleQuantityChange = (ProductID: string, action: string) => {
    const updatedCart = cart.map((item) => {
      if (item._id === ProductID) {
        let newQuantity = item.quantity;

        if (action === "increment" && item.quantity < item.inventory) {
          newQuantity++;
        } else if (action === "decrement" && item.quantity > 1) {
          newQuantity--;
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (ProductID: string) => {
    const updatedCart = cart.filter((item) => item._id !== ProductID);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const HandleCheckout = async () => {
    if (cart.length === 0) {
      console.error("Cart is empty. Cannot proceed with checkout.");
      return;
    }
  
    console.log("Sending the following cart to checkout:", cart);
  
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cart }),
      });
  
      console.log("Checkout response status:", response.status);
      const responseBody = await response.json();
      console.log("Checkout response body:", responseBody);
  
      if (!response.ok) {
        console.error("Checkout failed:", responseBody.error || "Unknown error");
        throw new Error("Checkout request failed");
      }
  
      if (responseBody.url) {
        localStorage.setItem("checkout_pending", "true");
        window.location.href = responseBody.url;
      } else {
        console.error("Checkout failed: No URL provided");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  
  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (localStorage.getItem("checkout_pending") === "true") {
        try {
          const response = await fetch("/api/checkpayment");

          if (!response.ok) {
            throw new Error("Payment check failed");
          }

          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            if (data.success) {
              localStorage.removeItem("cart");
              setCart([]);
            }
          } else {
            throw new Error("Unexpected response format");
          }

          localStorage.removeItem("checkout_pending");
        } catch (error) {
          console.error("Failed to verify payment status:", error);
        }
      }
    };

    checkPaymentStatus();
  }, []);

  return (
    <main className="w-full bg-gradient-to-r from-purple-700 to-slate-800">
      <div className="h-screen text-black bg-gradient-to-r from-purple-700 to-slate-800 max-w-[1440px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-white">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-4 p-4 border-b border-black px-8 rounded-md shadow-2xl"
              >
                <div className="flex-1">
                  <p className="font-semibold">{item.productName}</p>
                  <p>Original Price: <span className="font-semibold">${item.price}</span></p>
                  <p>Total Price: <span className="font-semibold">${item.price * item.quantity}</span></p>
                </div>

                {/* Quantity Handler */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, "decrement")}
                    className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, "increment")}
                    className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg ml-4 transition-all duration-300 hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <button
            className="w-full bg-black text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-800 transition-all duration-300"
            onClick={HandleCheckout}
          >
            CheckOut
          </button>
        </div>
      </div>
    </main>
  );
}
