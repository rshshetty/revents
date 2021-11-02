import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "reventscourse-75432.firebaseapp.com",
  databaseURL: "https://reventscourse-75432-default-rtdb.firebaseio.com",
  projectId: "reventscourse-75432",
  storageBucket: "reventscourse-75432.appspot.com",
  messagingSenderId: "492272550778",
  appId: "1:492272550778:web:5da79a2e583d7823f94cc3",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
