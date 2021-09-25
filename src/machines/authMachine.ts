import { createMachine, assign } from "xstate";
import { User } from "firebase/auth";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  Auth,
} from "firebase/auth";

type Context = {
  user?: User;
};

type Events = { type: "LOGIN" } | { type: "LOGOUT" } | { type: "RETRY" };

const checkIfSignedIn = (auth: Auth) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject("Not logged in");
      }
    });
  });
};

export const authMachine = createMachine<Context, Events>({
  id: "auth-machine",
  context: {},
  initial: "initial",
  states: {
    initial: {
      invoke: {
        src: () => {
          const auth = getAuth();
          return checkIfSignedIn(auth);
        },
        onDone: {
          actions: assign((event) => ({
            user: event.user,
          })),
          target: "loggedIn",
        },
        onError: "idle",
      },
    },
    idle: {
      on: {
        LOGIN: "signingIng",
      },
    },
    signingIng: {
      invoke: {
        src: async () => {
          const auth = getAuth();
          const provider = new GoogleAuthProvider();
          return signInWithPopup(auth, provider).then((value) => value.user);
        },
        onDone: {
          actions: assign((event) => ({
            user: event.user,
          })),
          target: "loggedIn",
        },
        onError: "error",
      },
    },
    error: {
      on: {
        RETRY: "signingIng",
      },
    },
    loggedIn: {
      on: {
        LOGOUT: {
          target: "idle",
          actions: "clearUser",
        },
      },
    },
  },
});
