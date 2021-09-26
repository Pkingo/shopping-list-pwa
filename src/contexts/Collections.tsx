import { createContext, FC, useContext, useEffect, useState } from "react";
import { subscribeToCollectionDocuments } from "../db/collection";
import { CollectionDocument } from "../types/Collection";

type State = {
  collections: CollectionDocument[];
  selectedCollection?: CollectionDocument;
  clearSelectedCollection: () => void;
  selectCollection: (collectionId: string) => void;
};
const defaultState: State = {
  collections: [],
  selectedCollection: undefined,
  clearSelectedCollection: () => {},
  selectCollection: () => {},
};
const COLLECTION_ID_KEY = "COLLECTION_ID_KEY";

const CollectionsContext = createContext<State>(defaultState);

export const CollectionsProvider: FC = ({ children }) => {
  const [collections, setCollections] = useState<State["collections"]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<State["selectedCollection"]>(undefined);
  useEffect(() => {
    return subscribeToCollectionDocuments(setCollections);
  }, []);
  useEffect(() => {
    const selectedCollectionId = localStorage.getItem(COLLECTION_ID_KEY);
    if (!selectedCollectionId) {
      return;
    }
    setSelectedCollection(
      collections.find((collection) => collection.id === selectedCollectionId)
    );
  }, [collections]);
  const clearSelectedCollection = () => {
    localStorage.removeItem(COLLECTION_ID_KEY);
    setSelectedCollection(undefined);
  };
  const selectCollection = (collectionId: string) => {
    localStorage.setItem(COLLECTION_ID_KEY, collectionId);
    setSelectedCollection(
      collections.find((collection) => collection.id === collectionId)
    );
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        selectedCollection,
        clearSelectedCollection,
        selectCollection,
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
