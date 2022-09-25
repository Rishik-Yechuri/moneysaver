import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "./firebase";
import {useState} from "react";
import {initializeUserData} from "./db";

export const authenticate = (email, password, func) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
            sessionStorage.setItem('UID', response.user.uid);
            func();
        })
        .catch((error) => {
            func(error);
        });
}

export const createAccount = (email, password, func) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
            sessionStorage.setItem('UID', response.user.uid);
            initializeUserData(response.user.uid);
            func();
        })
        .catch((error) => {
            func(error);
        })
}

export const logout = (func) => {
    sessionStorage.removeItem('Auth Token');
    sessionStorage.removeItem('UID');
    func();
}

export const userIsLoggedIn = () => {
    return !!sessionStorage.getItem('Auth Token');
}

export const getUID = () => {
    return sessionStorage.getItem('UID');
}