import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { Collection, CollectionDocument } from "../types/Collection";

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

export const updateCollection = (
  documentId: string,
  data: Partial<Collection>
) => {
  const db = getFirestore();
  updateDoc(doc(db, DATABASE_NAME, documentId), data);
};

export const addCollection = (name: string) => {
  const db = getFirestore();
  addDoc(collection(db, DATABASE_NAME), { name });
};

export const deleteCollection = async (documentId: string) => {
  const db = getFirestore();
  try {
    await deleteDoc(doc(db, "shopping-list", documentId));
    await deleteDoc(doc(db, DATABASE_NAME, documentId));
  } catch (e) {
    console.log("could not delete", e);
  }
};
