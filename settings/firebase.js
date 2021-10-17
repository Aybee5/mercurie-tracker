const { async } = require("@firebase/util");
const e = require("express");
const { initializeApp } = require("firebase/app");
const { push, getDatabase, ref, query, get, onValue, orderByChild, equalTo, child } = require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PRO_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MES_ID,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const ordersRef = ref(database, "orders");

exports.push = (order) => push(ordersRef, order);

exports.getAll = () => {
  onValue(ordersRef, (snapshot) => {
    return snapshot.val();
  });
};
