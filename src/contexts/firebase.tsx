import { createContext, useContext } from "react";
import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";

type Context = {
  app: FirebaseApp;
  database: Firestore;
};

export const FirebaseContext = createContext<Partial<Context>>({
  app: undefined,
  database: undefined,
});

export const useFirebase = (): Context => {
  const state = useContext(FirebaseContext);
  if (!state?.app || state?.database) {
    throw new Error("'useFirebase' must be used with 'FirebaseProvider'");
  }
  return state as Context;
};
