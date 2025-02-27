"use server"

import {headers} from 'next/headers'
import Stripe from "stripe"

import { db } from '@/lib/prisma'

import type { CartProduct } from "../contexts/cart"

interface createStripeCheckoutImput{
  products: CartProduct[],
  orderId: number,
}

export const createStripeCheckout = async ({products, orderId}: createStripeCheckoutImput) => {
  
  try {
    const productsWithPrices = await db.product.findMany({
      });
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Falta o Stripe Secret Key");
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia"
    })
    const reqHeader = await headers();
    const origin = reqHeader.get('origin') ?? ""

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url:origin,
      cancel_url: origin,
      metadata: {
        orderId,
      },
      line_items: products.map(product => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: productsWithPrices.find((productId) => productId.id === product.id)!.price * 100,
        },
        quantity: product.quantity,
      }))
    })
    return { sessionId: session.id}
  } catch (error) {
    console.error(error)
  }
}