//import logo from './logo.svg';
import './App.css';
import Home from './Home.js';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from "react";
import NavBar from "./shared/NavBar";
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/app')
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
