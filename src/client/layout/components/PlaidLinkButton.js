import * as React from 'react';
import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";
import {useCallback, useState} from "react";
import {auth, db} from "../../helper/firebase";
import {Button} from "@mui/material";
import {createLinkToken, getPlaidItem} from "../../helper/plaid";
import {addPlaidItem} from "../../helper/db";

export default function PlaidLinkButton() {

    const [token, setToken] = useState(null);

    React.useEffect(() => {
        async function token() {
            const link_token = await createLinkToken();
            setToken(link_token);
        }
        token();
    }, []);


    const onSuccess = useCallback(async (publicToken) => {
        await addPlaidItem(await getPlaidItem(publicToken));
    }, []);

    const { open, ready } = usePlaidLink({
        token,
        onSuccess,
        env: process.env.REACT_APP_PLAID_ENV || 'sandbox'
        // onEvent
        // onExit
    });

    return (
            <Button
                variant="contained"
                onClick={() => open()} disabled={!ready}
            >
                {ready ? "Add Bank" : "..."}
            </Button>
    );
};