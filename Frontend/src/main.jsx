import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home/Home';
import Adminpanel from './Pages/Adminpanel/Adminpanel.jsx';
import Aboutus from './Pages/Aboutus/Aboutus';
import Contact from './Pages/Contact/Contact';
import Error from './Pages/404/Error';
import SellBooks from './Pages/SellBooks/SellBooks.jsx';
import ViewProducts from './Pages/ViewProducts/ViewProducts.jsx';
import Onproductopen from './components/Onproductopen/OnBookopen.jsx';


import { OverlayProvider } from './contexts/OverlayContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductListProvider } from './contexts/ProductListContext.jsx';
import { AdminProvider } from './contexts/AdminContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <UserProvider>
        <AuthProvider>
          <OverlayProvider>
            <ProductListProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<Adminpanel />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<Aboutus />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/sellbook" element={<SellBooks />} />
                  <Route path="/viewproducts" element={<ViewProducts />} />
                  <Route path="/productopen" element={<Onproductopen />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </BrowserRouter>
            </ProductListProvider>
          </OverlayProvider>
        </AuthProvider>
      </UserProvider>
    </AdminProvider>
  </React.StrictMode>
);
