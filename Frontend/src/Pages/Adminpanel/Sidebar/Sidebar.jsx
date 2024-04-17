import React from 'react'
import './Sidebar.css'
import { useAdmin } from '../../../contexts/AdminContext'
function Sidebar() {
    const { userControlPage, setUserControlPage, uniformsControlPage, setUniformsControlPage, booksControlPage, setBooksControlPage, ordersControlPage, setOrdersControlPage } = useAdmin()


    function userControlPageon(e) {
        setUserControlPage(true)
        setUniformsControlPage(false)
        setBooksControlPage(false)
        setOrdersControlPage(false)
    }
    function uniformsControlPageon(e) {
        setUserControlPage(false)
        setUniformsControlPage(true)
        setBooksControlPage(false)
        setOrdersControlPage(false)
    }
    function booksControlPageon(e) {
        setUserControlPage(false)
        setUniformsControlPage(false)
        setBooksControlPage(true)
        setOrdersControlPage(false)
    }
    function ordersControlPageon(e) {
        setUserControlPage(false)
        setUniformsControlPage(false)
        setBooksControlPage(false)
        setOrdersControlPage(true)
    }
    return (
        <div className='app'>
            <div className="sidebar bg-green-500">
                <h2 className="mt-10 mb-10 text-2xl text-center text-white">
                    <b>Student Ease Admin Panel</b>
                </h2>
                <div id="hrdiv">
                    <hr />
                </div >

                <ul className='buttonsdiv'>
                    <button
                        onClick={userControlPageon}
                        className={`button  text-white ${userControlPage ? 'active' : ''
                            }`}
                    >
                        <b>User Control</b>
                    </button>


                    <button
                        onClick={uniformsControlPageon}
                        className={`button  text-white ${uniformsControlPage ? 'active' : ''
                            }`}
                    >
                        <b>Uniform Control</b>
                    </button>


                    <button
                        onClick={booksControlPageon}
                        className={`button  text-white ${booksControlPage ? 'active' : ''
                            }`}
                    >
                        <b>Books Control</b>
                    </button>


                    <button
                        onClick={ordersControlPageon}
                        className={`button  text-white ${ordersControlPage ? 'active' : ''
                            }`}
                    >
                        <b>Order Control</b>
                    </button>


                </ul>
            </div>
        </div>
    );
}

export default Sidebar
