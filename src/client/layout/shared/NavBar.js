import * as React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {authenticate, logout, userIsLoggedIn} from "../../helper/auth";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../App";

export default function NavBar() {
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const logoutFunc = () => {
        navigate('/landing');
        setUser(false);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {user &&
                <Button
                    variant="outlined"
                    onClick={() => {logout(logoutFunc)}}
                    color="inherit"
                >Logout</Button>}
            </Toolbar>
        </AppBar>
    );
}