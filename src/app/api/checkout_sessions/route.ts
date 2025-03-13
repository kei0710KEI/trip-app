import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/service/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const TOKEN_PRICES = {
  "100": { amount: 500, label: "100 Tokens" },
  "500": { amount: 1000, label: "500 Tokens" },
  "1000": { amount: 2000, label: "1000 Tokens" },
} as const;

export async function POST(req: Request) {
  try {
    const { tokenAmount, userEmail } = await req.json();

    if (!TOKEN_PRICES[tokenAmount as keyof typeof TOKEN_PRICES]) {
      return NextResponse.json({ error: "Invalid token amount" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/token-shop?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/token-shop?canceled=true`,
      customer_email: userEmail,
      metadata: { tokenAmount, userEmail },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: TOKEN_PRICES[tokenAmount as keyof typeof TOKEN_PRICES].label },
            unit_amount: TOKEN_PRICES[tokenAmount as keyof typeof TOKEN_PRICES].amount,
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
