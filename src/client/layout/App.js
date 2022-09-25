//import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing.js';
import Home from './pages/Home.js';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {createContext, useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import {userIsLoggedIn} from "../helper/auth";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(userIsLoggedIn);

    const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLoggedIn()) {
      navigate('/landing')
    }
  }, [])

  return (
    <div className="App">
        <UserContext.Provider value={{user, setUser}}>
            <ToastContainer />
            <NavBar/>
            <Routes>
                <Route
                    path='/landing'
                    element={<Landing/>}
                />
                <Route
                    path='/home'
                    element={<Home/>}
                />
            </Routes>
        </UserContext.Provider>
    </div>
  );
}

export default App;
