import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request : NextRequest) {
  const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    let { data: data_user } = await supabase
    .from('users')
    .select('*')
    .eq("user", data.user?.id)
    .single()

    
  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {

      if (data_user?.is_subscribed) {
        // L'utilisateur est déjà abonné, ne rien faire
        return NextResponse.json({ isSubscribed: true });
      }

      const { data : update, error :err } = await supabase
      .from('users')
      .update({
        is_subscribed : true,
        plan : data_user["plan_temp"],
        credits : data_user["plan_temp"] == 'Premium' ? 50 : 25,
      })
      .eq("user", data.user?.id)
      .select()
      
      const { data : subscribes, error : sub_err } = await supabase
      .from('subscribes')
      .insert([
        { user: data.user?.id, plan: data_user![0]["plan_temp"] == 'Premium' ? 2 : 1, },
      ])
      .select()

      // Update your database to mark the user as subscribed
      // await updateUserSubscriptionStatus(session.client_reference_id, 'active');
    }

    return NextResponse.json({ session, full_name : data_user["full_name"], isSubscribed: false });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}