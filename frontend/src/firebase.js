import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAhymAsK5LNcrf0sFri4_2MN-013SRclSQ",
  authDomain: "stripe-967a1.firebaseapp.com",
  projectId: "stripe-967a1",
  storageBucket: "stripe-967a1.appspot.com",
  messagingSenderId: "220475513800",
  appId: "1:220475513800:web:418bd793deb7bd093b7efd",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
