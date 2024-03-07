import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './Pages/Loginorsignup/Login'
import Signup from './Pages/Loginorsignup/Signup'
import Home from './Pages/Home/Home'
import Aboutus from './Pages/Aboutus/Aboutus'
import Contact from './Pages/Contact/Contact'
import Error from './Pages/404/Error'
import Onsearchcard from './components/Onsearchcard/Onsearchcard'






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
        <Route path='/onsearch' element={<Onsearchcard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)


