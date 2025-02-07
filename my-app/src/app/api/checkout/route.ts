import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// POST handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { products } = body;

    // Ensure 'products' is an array
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "Invalid or empty products array" }, { status: 400 });
    }

    // Log products for debugging
    console.log("Products received:", products);

    // Ensure each product has a valid 'productName' and 'imageUrl'
    products.forEach((product) => {
      if (!product.productName || !product.price || !product.imageUrl) {
        throw new Error(`Invalid product data: ${JSON.stringify(product)}`);
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productName,  // Correct 'name' key
            images: [product.imageUrl], // Correct 'images' key (plural)
          },
          unit_amount: product.price * 100, // Stripe expects the amount in cents
        },
        quantity: product.quantity, // Ensure 'quantity' is correctly passed
      })),
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
