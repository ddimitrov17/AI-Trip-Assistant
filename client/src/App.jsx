import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import TripGeneratorForm from './components/TripGeneratorForm/TripGenerator';
import DestinationSuggestionForm from './components/DestinationSuggestionForm/DestinationSuggestionForm';
import TripScheduleGenerator from './components/TripScheduleGenerator/TripScheduleGenerator';
import Trip from './components/TripDetails/Trip';
import LocationsDetails from './components/LocationsDetails/LocationsDetails';
import ItineraryDetails from './components/ItineraryDetails/ItineraryDetails';
import Plans from './components/Plans/Plans';

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
          <Route path='/signup' element={currentUser ? <Navigate to="/home" /> : <Register />} />
          <Route path='/login' element={currentUser ? <Navigate to="/home" /> : <Login />} />
          <Route path='/trip-generator' element={currentUser==false ? <Navigate to="/" /> : <TripGeneratorForm />}/>
          <Route path='/location-suggestions' element={currentUser==false ? <Navigate to="/" /> : <DestinationSuggestionForm />}/>
          <Route path='/trip-scheduler' element={currentUser==false ? <Navigate to="/" /> : <TripScheduleGenerator />}/>  
          <Route path='/trip-details/:tripId' element={<Trip />} />
          <Route path='/locations-details/:locationsId' element={currentUser!=null ? <LocationsDetails /> : <Navigate to="/" />} />
          <Route path='/itinerary-details/:itineraryId' element={currentUser!=null ? <ItineraryDetails /> : <Navigate to="/" />} />
          <Route path='/my-plans/:userId' element={currentUser!=false ? <Plans/> : <Navigate to="/" />}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
