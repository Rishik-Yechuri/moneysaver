import * as React from 'react';
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import authenticate from "../../helper/auth";

export default function LoginForm() {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <>
                <TextField
                    id="user-id"
                    label="User ID"
                    variant="outlined"
                    onChange={(e) => setUserID(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </>
            <Button
                variant="contained"
                onClick={() => authenticate(userID, password)}
            >
                Log In / Sign Up
            </Button>
        </>
    );
}
