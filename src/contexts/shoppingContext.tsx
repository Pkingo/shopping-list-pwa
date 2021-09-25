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
  const { id: collectionId } = useCollection();
  useEffect(() => {
    const unsubscribe = subscribeToShoppingDocuments(
      collectionId,
      setDocuments
    );
    return unsubscribe;
  }, [collectionId]);

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
