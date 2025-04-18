import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

initializeApp({
  credential: cert("./serviceAccountKey.json"),
});

export const db = getFirestore();
export const auth = getAuth();
