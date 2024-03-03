import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './components/Loginorsignup/Login'
import Signup from './components/Loginorsignup/Signup'
import Home from './components/Home/Home'
import Aboutus from './components/Aboutus/Aboutus'
import Contact from './components/Contact/Contact'
import Error from './components/404/Error'






// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes >
//       <Route path='/' element={<Home />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/signup' element={<Signup />} />
//       <Route path='/home' element={<Home />} />
//       <Route path='/about' element={<Aboutus />} />
//       <Route path='/contact' element={<Contact />} />
//     </Routes>
//   )
// )
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)


