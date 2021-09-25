import { QueryDocumentSnapshot } from "firebase/firestore";

export type Collection = {
  name: string;
};

export type CollectionDocument = QueryDocumentSnapshot<Collection>;
