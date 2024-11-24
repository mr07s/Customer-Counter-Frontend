// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQK8SrCY7wzTPlPeqsAK_5MHaZ_jpwpaY",
  authDomain: "customer-counter-6c5bc.firebaseapp.com",
  projectId: "customer-counter-6c5bc",
  storageBucket: "customer-counter-6c5bc.appspot.com",
  messagingSenderId: "556772993599",
  appId: "1:556772993599:web:ecf41945eff91a4843668a",
  measurementId: "G-TH1VRDTDDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage =getStorage(app);


