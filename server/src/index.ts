import { config } from "dotenv";
import Stripe from "stripe";
import { app } from "./api";

if (process.env.NODE_ENV !== "Production") config();
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API is available on port ${PORT}`);
});
