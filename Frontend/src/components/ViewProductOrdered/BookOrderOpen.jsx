import React, { useState } from 'react'
import './BookOrderOpen.css'
import { transformImagePath } from '../../utils'
import { useUser } from '../../contexts/UserContext';

function BookOrderOpen({ product }) {
    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, orders, setOrders } = useUser()


    return (
        <>
            <div id='parentofmaincontainer'>
                <div id='maincontainer'>
                    <div id='leftside'>
                        <img className='image' src={transformImagePath(product.image)} alt="" />
                        <div className='buttons'>
                            <button className='addtocartbutton'>Cancel</button>
                        </div>
                    </div>
                    <div id='rightside'>
                        <h1 className='text-black'><b>{product.title}</b></h1><br />
                        <h6>Author : {product.author}</h6><br />
                        <h6>Price : ₹{product.price}</h6><br />
                        <h6 className='description'>Seller Phone Number : {product.phoneNumber}</h6><br /><br />
                        <p>{product.description}</p><br />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookOrderOpen
