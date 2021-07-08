import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FirebaseAppProvider } from "reactfire";
import "./index.css";

export const stripePromise = loadStripe(
  "pk_test_51IIxMfERo4xBMkUCneKiF9fHKtxPmUdxJQBOUXzbWXeAVFqm2PlJva33BC9XJ7HjIARzIUzGbHJIQiSvyI7SGSw400w6MwAw6G"
);

const firebaseConfig = {
  apiKey: "AIzaSyAhymAsK5LNcrf0sFri4_2MN-013SRclSQ",
  authDomain: "stripe-967a1.firebaseapp.com",
  projectId: "stripe-967a1",
  storageBucket: "stripe-967a1.appspot.com",
  messagingSenderId: "220475513800",
  appId: "1:220475513800:web:418bd793deb7bd093b7efd",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
