import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { createCheckoutSession } from "./checkout";
import { createPaymentIntent } from "./payments";
import { handleStripeWebhook } from "./webhooks";
import { auth } from "./firebase";
import { createSetupIntent, listPaymentMethods } from "./customers";
import { createSubscription } from "./billing";

export const app = express();

app.use(
  express.json({ verify: (req, res, buffer) => (req["rawBody"] = buffer) })
);

app.use(decodeJWT);

app.use(cors({ origin: true }));

app.post("/test", (req: Request, res: Response) => {
  const amount = req.body.amount;

  res.status(200).send({ withTax: amount * 7 });
});

app.post(
  "/checkouts",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);
    console.log(user);
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

app.post(
  "/wallet",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);
    const setupIntent = await createSetupIntent(user.uid);
    res.send(setupIntent);
  })
);

// Retrieve all cards attached to a customer
app.get(
  "/wallet",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);

    const wallet = await listPaymentMethods(user.uid);
    res.send(wallet.data);
  })
);

// Create a and charge new Subscription
app.post(
  "/subscriptions/",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);
    const { plan, payment_method } = req.body;
    const subscription = await createSubscription(
      user.uid,
      plan,
      payment_method
    );
    res.send(subscription);
  })
);

// Get all subscriptions for a customer
app.get(
  "/subscriptions/",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);

    const subscriptions = await listSubscriptions(user.uid);

    res.send(subscriptions.data);
  })
);

// Unsubscribe or cancel a subscription
app.patch(
  "/subscriptions/:id",
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);
    res.send(await cancelSubscription(user.uid, req.params.id));
  })
);

function validateUser(req: Request) {
  const user = req["currentUser"];
  if (!user) {
    throw new Error(
      "You must be logged in to make this request. i.e Authroization: Bearer <token>"
    );
  }

  return user;
}

async function decodeJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req["currentUser"] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}
