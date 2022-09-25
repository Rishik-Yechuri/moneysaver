import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from "./shared/LoginForm";
import NavBar from "./shared/NavBar";

export default function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/app')
        }
    }, [])
    return (
        <>
            <h1>Save your future in one place</h1>
            <LoginForm/>
        </>
    )
}