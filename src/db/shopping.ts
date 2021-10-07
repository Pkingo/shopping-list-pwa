import {
  onSnapshot,
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { ShoppingDocument, ShoppingItem } from "../types/ShoppingItem";
const DATABASE_NAME = "shopping-list";
const ORDER_BY = "creationDate";

export const subscribeToShoppingDocuments = (
  collectionId: string,
  callback: (items: ShoppingDocument[]) => void
) => {
  const db = getFirestore();
  const q = query(
    collection(db, DATABASE_NAME),
    where("collectionId", "==", collectionId),
    orderBy(ORDER_BY)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const shoppingDocuments: ShoppingDocument[] = [];
    querySnapshot.forEach((doc) => {
      shoppingDocuments.push(doc as ShoppingDocument);
    });
    const sortedShoppingDocuments = shoppingDocuments.sort(
      (a, b) => Number(b.data().creationDate) - Number(a.data().creationDate)
    );
    callback(sortedShoppingDocuments);
  });
  return unsubscribe;
};

export const updateShoppingItem = (
  documentId: string,
  data: Partial<ShoppingItem>
) => {
  const db = getFirestore();
  updateDoc(doc(db, DATABASE_NAME, documentId), data);
};

export const addShoppingItem = (name: string, collectionId: string) => {
  const db = getFirestore();
  const itemToAdd: ShoppingItem = {
    name,
    collectionId,
    creationDate: Math.floor(Date.now() / 1000),
    isBought: false,
  };
  return addDoc(collection(db, DATABASE_NAME), itemToAdd);
};

export const addShoppingItems = (names: string[], collectionId: string) =>
  Promise.all(names.map((name) => addShoppingItem(name, collectionId)));

export const deleteShoppingItem = (documentId: string) => {
  const db = getFirestore();
  deleteDoc(doc(db, DATABASE_NAME, documentId));
};

export const deleteIsBoughtItems = async (collectionId: string) => {
  const db = getFirestore();

  const documentData = await getDocs(
    query(
      collection(db, DATABASE_NAME),
      where("collectionId", "==", collectionId),
      where("isBought", "==", true)
    )
  );
  documentData.docs.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};
