import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/service/firebaseConfig";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey || !stripeWebhookSecret) {
  throw new Error("❌ Stripe API keys are missing. Check your environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event;

  try {
    const body = await req.text();
    // Add type assertion to ensure stripeWebhookSecret is string
    event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret as string);
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata as { [key: string]: string } | null;

    if (!metadata || !metadata.tokenAmount || !metadata.userEmail) {
      return NextResponse.json({ error: "Missing required metadata" }, { status: 400 });
    }

    const userEmail = metadata.userEmail;
    const tokenAmount = parseInt(metadata.tokenAmount, 10);

    try {
      const userTokenRef = doc(db, "userTokens", userEmail);
      const userTokenDoc = await getDoc(userTokenRef);
      const currentTokens = userTokenDoc.exists() ? userTokenDoc.data().tokens : 0;

      await setDoc(userTokenRef, { tokens: currentTokens + tokenAmount }, { merge: true });

      return NextResponse.json({ message: "✅ Tokens updated successfully" });
    } catch (error) {
      console.error("❌ Failed to update tokens:", error);
      return NextResponse.json({ error: "Failed to update tokens" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "✅ Event received" });
}
