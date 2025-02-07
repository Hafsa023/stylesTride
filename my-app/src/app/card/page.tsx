import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await client.fetch(`*[_type == "product"]{
        productName,
        "imageUrl": image.asset -> url,
        price,
        _id, 
        "slug":slug.current
    }`);

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      <h1 className="flex justify-center text-3xl lg:text-5xl p-10 font-semibold uppercase animate__animated animate__fadeIn">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-2xl animate__animated animate__fadeIn animate__delay-1s">
        {products.map((product: any) => (
          <div
            className="border p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out transform"
            key={product._id}
          >
            {product.imageUrl && (
              <Image
                src={urlFor(product.imageUrl).url()}
                alt={product.productName}
                width={300}
                height={300}
                className="object-cover rounded-lg mx-auto transition duration-500 ease-in-out transform hover:scale-110"
              />
            )}
            <h2 className="text-xl font-bold text-center mt-4">{product.productName}</h2>
            <span className="text-center text-lg font-semibold mt-4">
              ${product.price.toFixed(2)}
            </span>
            <Link href={`/products/${product.slug}`} key={product._id}>
              <button className="w-full bg-gradient-to-r from-teal-600 to-purple-700 rounded-full text-white font-bold mt-4 py-2 transition duration-300 transform hover:scale-105 hover:opacity-90">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
