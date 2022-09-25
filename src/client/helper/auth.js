import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "./firebase";


export const authenticate = (email, password, func) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        })
        .catch((error) => {
            console.log(error.code)
        });
    func();
}

export const logout = (func) => {
    sessionStorage.removeItem('Auth Token');
    func();
}