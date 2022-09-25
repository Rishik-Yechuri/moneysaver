import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "./firebase";

export default function authenticate (email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        })
        .catch((error) => {
            console.log(error.code)
        })
}