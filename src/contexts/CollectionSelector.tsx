import { createContext, FC, useContext, useEffect, useState } from "react";
import { CollectionModal } from "../components/CollectionModal";
import { getCollectionById } from "../db/collection";
import { CollectionDocument } from "../types/Collection";

const COLLECTION_ID_KEY = "COLLECTION_ID_KEY";

const CollectionContext = createContext<CollectionDocument | null>(null);

export const CollectionProvider: FC = ({ children }) => {
  const [collection, setCollection] = useState<CollectionDocument | null>(null);
  useEffect(() => {
    const collectionId = localStorage.getItem(COLLECTION_ID_KEY);
    if (!collectionId) {
      return;
    }
    getCollectionById(collectionId).then((doc) => {
      setCollection(doc);
    });
  }, []);
  const onSelect = (collection: CollectionDocument) => {
    localStorage.setItem(COLLECTION_ID_KEY, collection.id);
    setCollection(collection);
  };
  const hasCollection = Boolean(collection);

  return (
    <CollectionContext.Provider value={collection}>
      {hasCollection ? (
        children
      ) : (
        <CollectionModal isOpen onSelect={onSelect} />
      )}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const collection = useContext(CollectionContext);
  if (!collection) {
    throw new Error(
      "'useCollection' can only be used within a 'CollectionProvider'"
    );
  }
  return collection;
};
