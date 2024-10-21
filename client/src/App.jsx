import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing/Landing'
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname=='/signup' || location.pathname=='/login';
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
