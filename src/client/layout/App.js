//import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing.js';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from "react";
import NavBar from "./shared/NavBar";
function App() {
    const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (!authToken) {
      navigate('/landing')
    }
  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route
          path='/landing'
          element={<Landing/>}
        />
      </Routes>
    </div>
  );
}

export default App;
