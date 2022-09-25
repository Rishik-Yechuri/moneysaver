import {Configuration, PlaidApi, PlaidEnvironments} from "plaid";
import {useCallback} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebase";

const PLAID_CLIENT_ID = process.env.REACT_APP_PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.REACT_APP_PLAID_SECRET;
const PLAID_ENV = process.env.REACT_APP_PLAID_ENV || 'sandbox';

export const createLinkToken = async () => {
    const response = await fetch('/api/create_link_token', { method: 'POST' });
    const { link_token } = await response.json();
    return link_token;
};

const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
            'PLAID-SECRET': PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});
const client = new PlaidApi(configuration);

export const getPlaidItem = async (publicToken) => {
        const response = await fetch('/api/set_access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "public_token": publicToken
                    })
            });
            const { access_token, item_id } = await response.json();
            return { access_token, item_id };
}