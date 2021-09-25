import { QueryDocumentSnapshot } from "firebase/firestore";

export type ShoppingItem = {
  collectionId: string;
  creationDate: string;
  isBought: boolean;
  name: string;
};

export type ShoppingDocument = QueryDocumentSnapshot<ShoppingItem>;
