import { Restaurant } from '@prisma/client';
import { revalidatePath } from "next/cache";
import { ResolvingViewport } from 'next/dist/lib/metadata/types/metadata-interface.js';
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/prisma";


export async function POST(request: Request){
  if(!process.env.STRIPE_SECRET_KEY) throw new Error("Falta o Stripe Secret Key")  ;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia"
  })
  const signature = request.headers.get("stripe-signature");
  if (!signature){
    return NextResponse.error();
  }
  if(!process.env.STRIPE_WEBHOOK_SECRET_KEY) throw new Error("Falta o Stripe Webhook Key") ;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
  const text = await request.text();
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    webhookSecret,
  )
  const paymentIsSucessful = event.type === "checkout.session.completed";
  if (paymentIsSucessful){
    const orderId = event.data.object.metadata?.orderId
    if(!orderId) return NextResponse.json({
      received: true,
    })
    const order = await db.order.update({
      where: {
        id: Number(orderId), 
      },
      data: {
        status: "PAYMENT_CONFIRMED"
      },
      include: {
        restaurant: {
          select: {
            slug: true,
          }
        }
      }
    })
    revalidatePath(`/${order.restaurant.slug}/orders`)
  }
  return NextResponse.json({
    received: true,
  })
}