import { createContext, FC, useContext, useEffect, useState } from "react";
import { subscribeToShoppingDocuments } from "../db/shopping";
import { ShoppingDocument } from "../types/ShoppingItem";
import { useCollection } from "./CollectionSelector";

type State = {
  documents: ShoppingDocument[];
};

const ShoppingContext = createContext<State>({
  documents: [],
});

export const ShoppingProvider: FC = ({ children }) => {
  const [documents, setDocuments] = useState<ShoppingDocument[]>([]);
  const { collection } = useCollection();
  useEffect(() => {
    if (!collection?.id) {
      return;
    }
    const unsubscribe = subscribeToShoppingDocuments(
      collection.id,
      setDocuments
    );
    return unsubscribe;
  }, [collection]);

  return (
    <ShoppingContext.Provider value={{ documents }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const state = useContext(ShoppingContext);
  if (!state) {
    throw new Error("'useShopping' must be used within a 'ShoppingProvider'");
  }
  return state;
};
