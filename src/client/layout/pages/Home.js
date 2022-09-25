import React, {useEffect, useState} from 'react';
import ScoreOverview from "../components/ScoreOverview";
import AccountsOverview from "../components/AccountsOverview";

export default function Landing() {
    return (
        <>
            <ScoreOverview/>
            <AccountsOverview/>
        </>
    )
}