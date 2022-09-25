import React, {useContext, useEffect, useState} from 'react';
import {getBankAccounts} from "../../helper/db";
import {UserContext} from "../App";
import {authenticate, userIsLoggedIn} from "../../helper/auth";
import {Button} from "@mui/material";
import {addPlaidItem} from "../../helper/plaid";
import {PlaidLink} from "react-plaid-link";
import PlaidLinkButton from "./PlaidLinkButton";

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
            <h2>Manage your banking accounts:</h2>

            <PlaidLinkButton/>
            {plaidItemModules}
        </>
    );
}