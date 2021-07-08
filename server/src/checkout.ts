import Stripe from "stripe";
import { stripe } from ".";

export async function createCheckoutSession(
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
) {
  const url = process.env.WEB_APP_URL;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/failed`,
    line_items: lineItems,
  });

  return session;
}
