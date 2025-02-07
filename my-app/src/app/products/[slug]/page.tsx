"use client";
import Loader from "@/app/loading/page";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Product {
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  slug: string;
  _id: string;
  inventory: number;
  colors: string;
  status: string;
  category: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductsDetails({ params }: Props) {
  const [products, setProducts] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(
        `*[_type == "product" && slug.current == "${params.slug}"]{
         productName,
        description,
         "imageUrl": image.asset->url,
        price,
        inventory,
        colors,
        status,
        category,
        _id ,
        }`
      );

      if (data.length > 0) {
        setProducts(data[0]);
        setNotFound(false); // Product found
      } else {
        setNotFound(true); // Product not found
      }
      console.log("Fetched Data:", data); 
    };
    fetchProducts();
  }, [params.slug]);

  if (notFound) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-red-100 text-red-600 text-xl font-bold"
        data-cy="product-not-found"
      >
        Product not found
      </div>
    );
  }
  if (!products) return <div>
    <Loader />
  </div>;

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
      e.preventDefault();
      console.log("Add to Cart clicked for product:", product); // Log when the function is called
    
      Swal.fire({
        position: "top-right",
        icon: "success",
        title: `${product.productName} added to cart`,
        showConfirmButton: false,
        timer: 1000,
      });
    
 
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProduct = savedCart.find((item: Product) => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        savedCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(savedCart));
      
    } catch (error) {
      console.error("Error updating cart:", error);
      
    }
  };
    

  return (
    <main>
      <div className="w-full bg-gradient-to-r from-slate-700 to-teal-800">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-r from-slate-800 to-teal-800 min-h-screen flex items-center justify-center px-4 ">
          <div className="w-full max-w-[1000px] bg-white shadow-2xl rounded-2xl p-6 my-6">
            <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-6">
              {/* Image Section */}
              <Image
                src={products.imageUrl}
                alt={products.productName}
                width={600}
                height={600}
                className="h-auto max-w-full rounded-lg border-2 "
              />

              {/* Product Details */}
              <div className="p-6 md:p-12 grid gap-5 text-gray-800 text-center md:text-left">
                <h1 className="text-3xl font-bold">{products.productName}</h1>
                <p className="text-lg">{products.description}</p>
                <p className="text-2xl font-bold">Price: ${products.price}</p>
                <p className="text-gray-700 font-semibold">
                  Color: <span className="text-blue-500">{products.colors}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Inventory: <span className="text-green-500">{products.inventory}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Status: <span className="text-yellow-500">{products.status}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Category: <span className="text-purple-500">{products.category}</span>
                </p> 
                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, products)}
                  className="p-4 w-full md:w-[170px] bg-gradient-to-r from-teal-600 to-purple-700 rounded-full text-white font-bold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
