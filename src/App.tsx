import { Stack } from "@material-ui/core";
import { useMachine } from "@xstate/react";
import { CheckList } from "./components/CheckList/CheckList";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Unauthorized } from "./components/Unauthorized";
import { CollectionProvider } from "./contexts/CollectionSelector";
import { ShoppingProvider } from "./contexts/shoppingContext";
import { authMachine } from "./machines/authMachine";

function App() {
  const [state, send] = useMachine(authMachine);
  const isLoggedIn = state.matches("loggedIn");
  return (
    <Stack>
      <CollectionProvider>
        <ShoppingProvider>
          <Header
            onLogin={() => send("LOGIN")}
            onLogout={() => send("LOGOUT")}
            isLoggedIn={isLoggedIn}
          />
          {isLoggedIn ? <CheckList /> : <Unauthorized />}
          {isLoggedIn && <Footer />}
        </ShoppingProvider>
      </CollectionProvider>
    </Stack>
  );
}

export default App;
