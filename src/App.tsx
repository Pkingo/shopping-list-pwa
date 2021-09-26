import { Stack } from "@material-ui/core";
import { useMachine } from "@xstate/react";
import { CheckList } from "./components/CheckList/CheckList";
import { CollectionModal } from "./components/CollectionModal";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Unauthorized } from "./components/Unauthorized";
import { CollectionsProvider, useCollections } from "./contexts/Collections";
import { ShoppingProvider } from "./contexts/shoppingContext";
import { authMachine } from "./machines/authMachine";

function App() {
  const [state, send] = useMachine(authMachine);
  const { hasSelectedCollection } = useCollections();
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
          {hasSelectedCollection && (
            <>
              {isLoggedIn ? <CheckList /> : <Unauthorized />}
              {isLoggedIn && <Footer />}
            </>
          )}
          <CollectionModal />
        </ShoppingProvider>
      </CollectionsProvider>
    </Stack>
  );
}

export default App;
