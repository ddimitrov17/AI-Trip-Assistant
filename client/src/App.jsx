import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import TripGeneratorForm from './components/TripGeneratorForm/TripGenerator';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/signup' || location.pathname === '/login';
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (location.pathname === '/logout') return;

    async function getCurrentUser() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/current', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();

        if (response.ok) {
          setCurrentUser(data);
        } else {
          setCurrentUser(false);
        }
      } catch (error) {
        console.error('Error in getting current user:', error.message);
        setCurrentUser(false);
      }
    }

    getCurrentUser();
  }, [location.pathname]);

  useEffect(() => {
    console.log("currentUser:", currentUser);
  }, [currentUser]);

  return (
    <>
      <UserContext.Provider value={{ user: currentUser }}>
        {!hideHeader && <Header />}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/trip-generator' element={<TripGeneratorForm/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
