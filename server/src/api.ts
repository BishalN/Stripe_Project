import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { createCheckoutSession } from "./checkout";
import { createPaymentIntent } from "./payments";
import { handleStripeWebhook } from "./webhooks";

export const app = express();

app.use(
  express.json({ verify: (req, res, buffer) => (req["rawBody"] = buffer) })
);

app.use(cors({ origin: true }));

app.post("/test", (req: Request, res: Response) => {
  const amount = req.body.amount;

  res.status(200).send({ withTax: amount * 7 });
});

app.post(
  "/checkouts",
  runAsync(async (req: Request, res: Response) => {
    res.send(await createCheckoutSession(req.body.line_items));
  })
);

app.post(
  "/payments",
  runAsync(async (req: Request, res: Response) => {
    res.send(await createPaymentIntent(req.body.amount));
  })
);

app.post("/posts", runAsync(handleStripeWebhook));

function runAsync(callback: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
}
