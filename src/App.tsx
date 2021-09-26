import { Stack } from "@material-ui/core";
import { useMachine } from "@xstate/react";
import { CheckList } from "./components/CheckList/CheckList";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Unauthorized } from "./components/Unauthorized";
import { CollectionsProvider } from "./contexts/Collections";
import { ShoppingProvider } from "./contexts/shoppingContext";
import { authMachine } from "./machines/authMachine";

function App() {
  const [state, send] = useMachine(authMachine);
  const isLoggedIn = state.matches("loggedIn");
  return (
    <Stack>
      <CollectionsProvider>
        <ShoppingProvider>
          <Header
            onLogin={() => send("LOGIN")}
            onLogout={() => send("LOGOUT")}
            isLoggedIn={isLoggedIn}
          />
          {isLoggedIn ? <CheckList /> : <Unauthorized />}
          {isLoggedIn && <Footer />}
        </ShoppingProvider>
      </CollectionsProvider>
    </Stack>
  );
}

export default App;
