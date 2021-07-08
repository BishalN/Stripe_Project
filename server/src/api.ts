import express, { Request, Response } from "express";
import cors from "cors";

export const app = express();

app.use(express.json());

app.use(cors({ origin: true }));

app.post("/test", (req: Request, res: Response) => {
  const amount = req.body.amount;

  res.status(200).send({ withTax: amount * 7 });
});
