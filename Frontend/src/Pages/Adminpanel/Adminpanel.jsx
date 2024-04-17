import React from 'react'
import './Adminpanel.css'
import { useAdmin } from '../../contexts/AdminContext'
import Sidebar from './Sidebar/Sidebar'
import UsersPage from './UsersPage/UsersPage'
import UniformPage from './UniformsPage/UniformPage'
import BooksPage from './BooksPage/BooksPage'
import OrdersPage from './OrdersPage/OrdersPage'
function Adminpanel() {
    const { userControlPage, setUserControlPage, uniformsControlPage, setUniformsControlPage, booksControlPage, setBooksControlPage, ordersControlPage, setOrdersControlPage } = useAdmin()


    return (
        <>
            <div className="app">
                <Sidebar />

                <div className="main-content">
                    {userControlPage ? (
                        <>
                            <UsersPage/>
                        </>
                    ) : (<></>)}
                    {uniformsControlPage ? (
                        <>
                            <UniformPage/>
                        </>
                    ) : (<></>)}
                    {booksControlPage ? (
                        <>
                            <BooksPage/>
                        </>
                    ) : (<></>)}
                    {ordersControlPage ? (
                        <>
                            <OrdersPage/>
                        </>
                    ) : (<></>)}
                </div>
            </div>
        </>
    );

}

export default Adminpanel
