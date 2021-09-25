import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { CollectionDocument } from "../types/Collection";

const DATABASE_NAME = "collection";

export const subscribeToCollectionDocuments = (
  callback: (items: CollectionDocument[]) => void
) => {
  const db = getFirestore();
  const q = query(collection(db, DATABASE_NAME));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const collectionDocuments: CollectionDocument[] = [];
    querySnapshot.forEach((doc) => {
      collectionDocuments.push(doc as CollectionDocument);
    });
    callback(collectionDocuments);
  });
  return unsubscribe;
};

export const getCollectionById = async (collectionId: string) => {
  const db = getFirestore();
  const collectionDoc = await getDoc(doc(db, DATABASE_NAME, collectionId));
  return collectionDoc as CollectionDocument;
};
