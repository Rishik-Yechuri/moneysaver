//import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from "react";
import NavBar from "./shared/NavBar";
function App() {
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (!authToken) {
      navigate('')
    }
  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route
          path=''
          element={<Home/>}
        />
      </Routes>
    </div>
  );
}

export default App;
