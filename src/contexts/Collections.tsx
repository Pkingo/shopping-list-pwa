import { createContext, FC, useContext, useEffect, useState } from "react";
import { subscribeToCollectionDocuments } from "../db/collection";
import { Collection } from "../types/Collection";

type State = {
  collections: Map<string, Collection>;
  selectedCollection?: Collection;
  selectedCollectionId: string;
  clearSelectedCollection: () => void;
  selectCollection: (collectionId: string) => void;
  hasSelectedCollection: boolean;
};
const defaultState: State = {
  collections: new Map(),
  selectedCollectionId: "",
  selectedCollection: undefined,
  clearSelectedCollection: () => {},
  selectCollection: () => {},
  hasSelectedCollection: true,
};
const COLLECTION_ID_KEY = "COLLECTION_ID_KEY";

const CollectionsContext = createContext<State>(defaultState);

export const CollectionsProvider: FC = ({ children }) => {
  const [collections, setCollections] = useState<State["collections"]>(
    new Map()
  );
  const [selectedCollectionId, setSelectedCollectionID] = useState<string>("");
  useEffect(() => {
    return subscribeToCollectionDocuments(setCollections);
  }, []);

  const clearSelectedCollection = () => {
    localStorage.removeItem(COLLECTION_ID_KEY);
    setSelectedCollectionID("");
  };
  const selectCollection = (collectionId: string) => {
    localStorage.setItem(COLLECTION_ID_KEY, collectionId);
    setSelectedCollectionID(collectionId);
  };
  const selectedCollection = collections.get(selectedCollectionId);
  const hasSelectedCollection = collections.has(selectedCollectionId);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        selectedCollection,
        selectedCollectionId,
        hasSelectedCollection,
        selectCollection,
        clearSelectedCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = (): State => {
  const state = useContext(CollectionsContext);
  if (!state) {
    if (process.env.NODE_ENV === "development") {
      console.error("No collections");
    }
    return defaultState;
  }
  return state;
};
