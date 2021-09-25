import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import reportWebVitals from "./reportWebVitals";
import theme from "./components/theme";
import { FirebaseContext } from "./contexts/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "./global.css";
import { ShoppingProvider } from "./contexts/shoppingContext";
import { CollectionProvider } from "./contexts/CollectionSelector";

if (process.env.NODE_ENV === "development") {
  require("dotenv");
}

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const database = getFirestore(app);

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ app, database }}>
      <ThemeProvider theme={theme}>
        <CollectionProvider>
          <ShoppingProvider>
            <App />
          </ShoppingProvider>
        </CollectionProvider>
      </ThemeProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
