import * as React from 'react';
import {Button, TextField} from "@mui/material";

export default function LoginForm({ setUserID, setPassword, handleLogin }) {
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
            <Button variant="contained" onClick={handleLogin}>Log In / Sign Up</Button>
        </>
    );
}
