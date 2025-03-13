import { NextResponse } from "next/server"; 
import Stripe from "stripe";
import { db } from "@/service/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  let event;

  try {
    const body = await req.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      console.warn("⚠️ STRIPE_WEBHOOK_SECRET is missing. Skipping signature verification.");
      event = JSON.parse(body); // Webhook 検証をスキップ
    }
  } catch (error) {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;
    
    if (!metadata || !metadata.tokenAmount || !metadata.userEmail) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      const userTokenRef = doc(db, "userTokens", metadata.userEmail);
      const userTokenDoc = await getDoc(userTokenRef);
      const currentTokens = userTokenDoc.exists() ? userTokenDoc.data().tokens : 0;

      await updateDoc(userTokenRef, { tokens: currentTokens + parseInt(metadata.tokenAmount) });

      return NextResponse.json({ message: "Tokens updated successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to update tokens" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Event received" });
}
