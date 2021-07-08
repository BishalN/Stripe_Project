import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";

export const stripePromise = loadStripe(
  "pk_test_51IIxMfERo4xBMkUCneKiF9fHKtxPmUdxJQBOUXzbWXeAVFqm2PlJva33BC9XJ7HjIARzIUzGbHJIQiSvyI7SGSw400w6MwAw6G"
);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);
