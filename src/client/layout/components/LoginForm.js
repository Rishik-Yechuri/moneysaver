import * as React from 'react';
import {Button, TextField} from "@mui/material";
import {useContext, useState} from "react";
import {authenticate, createAccount} from "../../helper/auth";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginFunc = (error = null) => {
        if(error) {
            if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password');
            }
            else if (error.code === 'auth/user-not-found') {
                toast.info('New account created');
                createAccount(email, password, createUserFunc);
            } else {
                toast.error('An unknown error has occurred');
            }
        } else {
            navigate('/home');
            setUser(true);
        }
    }

    const createUserFunc = (error = null) => {
        if(error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email Already in Use');
            }
        } else {
            navigate('/home');
            setUser(true);
        }
    }

    return (
        <>
            <>
                <TextField
                    id="user-id"
                    label="User ID"
                    variant="outlined"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </>
            <Button
                variant="contained"
                onClick={() => authenticate(email, password, loginFunc)}
            >
                Log In / Sign Up
            </Button>
        </>
    );
}
