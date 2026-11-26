import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth';

export async function POST(req:any) {
   const userDetails = await auth.api.getSession({ headers: await headers() });
  const formData = await req.formData();
  const {price,serviceId,appointmentId}=Object.fromEntries(formData.entries());
  console.log(Object.fromEntries(formData.entries()))
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
           price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(price) * 100),
            product_data: { name: "salon booking" },
          },
          quantity: 1,
        },
      ],
      customer_email: userDetails?.user.email,
      mode: 'payment',
      metadata:{
        serviceId:serviceId,
        appointmentId:appointmentId
      },
      success_url: `${origin}/payment_success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: 'salonService001',
    });
    return NextResponse.redirect(session.url as string, 303)
  } catch (err:any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}