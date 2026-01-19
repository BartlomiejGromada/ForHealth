import {
  collection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// This helper function pipes your types through a firestore converter
function converter<T>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      return data as DocumentData;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return snapshot.data() as T;
    },
  };
}

// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
// Pass it a collectionPath string as the path to the collection in firestore
// Pass it a type argument representing the 'type' (schema) of the docs in the collection
const dataPoint = <T>(collectionPath: string) =>
  collection(db, collectionPath).withConverter(converter<T>());

// This helper function exposes a 'typed' version of firestore().doc(collectionPath)
// Pass it a docPath string as the path to the collection in firestore
// Pass it a type argument representing the 'type' (schema) of the docs in the collection
const docPoint = <T>(documentPath: string) => doc(db, documentPath).withConverter(converter<T>());

export { dataPoint, docPoint };
