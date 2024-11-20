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
import DestinationSuggestionForm from './components/DestinationSuggestionForm/DestinationSuggestionForm';
import TripScheduleGenerator from './components/TripScheduleGenerator/TripScheduleGenerator';
import Trip from './components/TripDetails/Trip';
import LocationsDetails from './components/LocationsDetails/LocationsDetails';
import ItineraryDetails from './components/ItineraryDetails/ItineraryDetails';

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
          <Route path='/location-suggestions' element={<DestinationSuggestionForm/>}/>
          <Route path='/trip-scheduler' element={<TripScheduleGenerator/>}/>  
          <Route path='/trip-details/:tripId' element={<Trip/>}/>        
          <Route path='/locations-details/:locationsId' element={<LocationsDetails/>}/>  
          <Route path='/itinerary-details/:itineraryId' element={<ItineraryDetails/>}/>  
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
