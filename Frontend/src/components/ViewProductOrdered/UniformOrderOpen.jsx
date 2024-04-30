import React, { useState } from 'react';
import axios from 'axios';
import './UniformOrderOpen.css';
import { transformImagePath } from '../../utils';
import { useUser } from '../../contexts/UserContext';

function UniformOrderOpen({ product }) {

    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, orders, setOrders } = useUser()


    return (
        <>
            <div className='parent-container'>
                <div className='main-container'>
                    <div className='left-side'>
                        <img className='image' src={transformImagePath(product.image)} alt="" />
                        <div className='buttons'>
                            <button className='add-to-cart-button'>Cancel</button>
                        </div>
                    </div>
                    <div className='right-side'>
                        <h1>{product.organization}</h1><br />
                        <h6>{product.type}</h6><br />
                        <h6>Price: ₹{product.price}</h6><br /><br />
                        <h6>{product.description}</h6><br />
                        {(product.type == 'Shirt' || product.type == 'T-shirt') ? (
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
