import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import {db} from "./firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getUID} from "./auth";

export const initializeUserData = (userID) => {
    const docRef = doc(db, "users", userID);
    setDoc(docRef, {});
}

export const getBankAccounts = async () => {
    const plaidItemsRef = collection(db, "users", getUID(), 'plaid_items');
    const docs = await getDocs(plaidItemsRef)
            return docs.docs.map(d => ({item_id: d.id, ...d.data()}));
}