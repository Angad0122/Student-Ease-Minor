import React, { useState } from 'react'
import './Adminpanel.css'
import { useAdmin } from '../../contexts/AdminContext'
import Sidebar from './Sidebar/Sidebar'
import UsersPage from './UsersPage/UsersPage'
import UniformPage from './UniformsPage/UniformPage'
import BooksPage from './BooksPage/BooksPage'
import OrdersPage from './OrdersPage/OrdersPage'
function Adminpanel() {
    const { userControlPage, setUserControlPage, uniformsControlPage, setUniformsControlPage, booksControlPage, setBooksControlPage, ordersControlPage, setOrdersControlPage } = useAdmin()

    const [adminLoggedIn, setAdminLoggedIn] = useState(false);

    function loginSubmit() {
        if (document.getElementById('username').value === "admin" && document.getElementById('password').value === 'dagna007')
            setAdminLoggedIn(true)
        else
            alert('username or password id wrong')
    }
    return (
        <>
            {!adminLoggedIn ? (

                <div className="app">
                    <Sidebar />
                    <div className="main-content">
                        {userControlPage ? (
                            <>
                                <UsersPage />
                            </>
                        ) : (<></>)}
                        {uniformsControlPage ? (
                            <>
                                <UniformPage />
                            </>
                        ) : (<></>)}
                        {booksControlPage ? (
                            <>
                                <BooksPage />
                            </>
                        ) : (<></>)}
                        {ordersControlPage ? (
                            <>
                                <OrdersPage />
                            </>
                        ) : (<></>)}
                    </div>
                </div>

            ) : (
                <>
                    <h1 className='adminh1'>Admin Login</h1 >
                    <form className="adminform" action="">
                        <label className='adminlabel' htmlFor='username'>Username: </label>
                        <input className='admioninput' type='text' name='username' id='username' /><br />
                        <label className='adminlabel' htmlFor='password'>Password: </label>
                        <input
                        className='admioninput'
                            type='password'
                            name='password'
                            id='password'
                        /><br />
                        <button className='adminbutton' type='submit' onClick={loginSubmit} >Login</button>
                    </form>
                </>
            )}
 
        </>
    );

}

export default Adminpanel
