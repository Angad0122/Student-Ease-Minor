import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home/Home';
import Adminpanel from './Pages/Adminpanel/Adminpanel.jsx';
import Login from './Pages/Loginorsignup/Login';
import Signup from './Pages/Loginorsignup/Signup';
import Aboutus from './Pages/Aboutus/Aboutus';
import Contact from './Pages/Contact/Contact';
import Error from './Pages/404/Error';
import Onsearchcard from './components/Onsearchcard/Onsearchcard';
import SellBooks from './Pages/SellBooks/SellBooks.jsx';


import { OverlayProvider } from './contexts/OverlayContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <OverlayProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Adminpanel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/onsearch" element={<Onsearchcard />} />
              <Route path="/sellbook" element={<SellBooks />} />
              
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </OverlayProvider>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);
