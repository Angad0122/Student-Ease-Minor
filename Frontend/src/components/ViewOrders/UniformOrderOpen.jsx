import React, { useState } from 'react';
import axios from 'axios';
import './UniformOrderOpen.css';
import { IoArrowBack } from "react-icons/io5";
import { transformImagePath } from '../../utils';
import { useUser } from '../../contexts/UserContext';

function UniformOrderOpen({ product,setSelectedProduct }) {

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
            <div className='parent-container'>
                <div className='main-container'>
                    <div className='left-side'>
                        <img className='image' src={transformImagePath(product.product.image)} alt="" />
                        <div className='buttons'>
                            <button onClick={cancelOrder} className='add-to-cart-button'>Cancel</button>
                        </div>
                    </div>
                    <div className='right-side'>
                        <h1>{product.product.organization}</h1><br />
                        <h6>{product.product.type}</h6><br />
                        <h6>Price: ₹{product.product.price}</h6><br /><br />
                        <h6>{product.product.description}</h6><br />
                        {(product.product.type == 'Shirt' || product.product.type == 'T-shirt') ? (
                            <img src="./Tshirtsizechart.jpg" alt="" />
                        ) : (
                            <img src="./pantsizechart.jpg" alt="" />
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default UniformOrderOpen;
