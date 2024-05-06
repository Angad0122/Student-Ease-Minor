import React, { useEffect, useState } from 'react'
import './BookOrderOpen.css'
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios'
import { transformImagePath } from '../../utils'
import { useUser } from '../../contexts/UserContext';

function BookOrderOpen({ product, setSelectedProduct }) {
    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, orders, setOrders } = useUser()



    async function cancelOrder() {
        try {
            const response = await axios.post("http://localhost:8000/auth/cancelorder", {
                orderId: product._id,
                userId: userId
            });
            alert('Order canceled successfully');

            //fetching back orders
            try {
                const response = await axios.get(`http://localhost:8000/auth/getorders`, { params: { userId: userId } });
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }

            setSelectedProduct(null)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert('Error cancelling order: ' + error.message);
            }
        }
    }
    return (
        <>
        <IoArrowBack onClick={(e) => { setSelectedProduct(null) }} className='backbutton' />
            <div id='parentofmaincontainer'>
                <div id='maincontainer'>
                    <div id='leftside'>
                        <img className='image' src={transformImagePath(product.product.image)} alt="" />
                        <div className='buttons'>
                            <button onClick={cancelOrder} className='addtocartbutton'>Cancel</button>
                        </div>
                    </div>
                    <div id='rightside'>
                        <h1 className='text-black'><b>{product.product.title}</b></h1><br />
                        <h6>Author : {product.product.author}</h6><br />
                        <h6>Price : ₹{product.product.price}</h6><br />
                        <h6 className='description'>Seller Phone Number : {product.product.phoneNumber}</h6><br /><br />
                        <p>{product.product.description}</p><br />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookOrderOpen
