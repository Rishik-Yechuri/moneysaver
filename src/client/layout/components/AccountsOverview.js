import React, {useContext, useEffect, useState} from 'react';
import {getBankAccounts} from "../../helper/db";
import {UserContext} from "../App";
import {authenticate, userIsLoggedIn} from "../../helper/auth";
import {Button} from "@mui/material";
import {addPlaidItem} from "../../helper/plaid";

export default function AccountsOverview() {
    const [plaidItemModules, setPlaidItemModules] = useState([]);

    const { user, setUser } = useContext(UserContext);

    getBankAccounts().then(accounts => {
        const plaidIM = [];


        accounts.forEach((data) => {
            plaidIM.push(<p>{data.access_token}</p>);
        });

        setPlaidItemModules(plaidIM);
    });


    return (
        <>
            <h1>Here is a list of your accounts:</h1>

            <Button
                variant="contained"
                onClick={() => addPlaidItem()}
            >
                Add Account
            </Button>

            {plaidItemModules}
        </>
    );
}