import { doc, setDoc } from 'firebase/firestore';
import {db} from "./firebase";

export const initializeUserData = (userID) => {
    const docRef = doc(db, "users", userID);
    setDoc(docRef, {});
}