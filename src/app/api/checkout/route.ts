import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

  try {
    const { id, plan } = await req.json();
    const { data : update, error :err } = await supabase
      .from('users')
      .update({ plan_temp: plan })
      .eq("user", data.user?.id)
      .select()

    const session = await stripe.checkout.sessions.create({
      //payment_method_types: ["card"],
      mode: "subscription",
      customer_email: data.user?.email,
      line_items: [{ price: id, quantity: 1 }],
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/error?message=erreur de payement`,
    });

    
    

    console.log(update)

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {

}