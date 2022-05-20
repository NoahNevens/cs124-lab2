import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD8pvUeQT320PvjuCSg4mRErbvDaQ_xjFg",
    authDomain: "cs124-lab3-dan.firebaseapp.com",
    projectId: "cs124-lab3-dan",
    storageBucket: "cs124-lab3-dan.appspot.com",
    messagingSenderId: "1036883305737",
    appId: "1:1036883305737:web:2d7bd2360059043e2e9fd8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


ReactDOM.render(
  <React.StrictMode>
      <App db={db} auth={auth}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
