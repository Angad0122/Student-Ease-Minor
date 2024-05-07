import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './OnBookopen.css'
import { IoArrowBack } from "react-icons/io5";
import { transformImagePath } from '../../utils'
import { useUser } from '../../contexts/UserContext';

function OnBookopen({ product, setSelectedBook }) {
    const [address, setAddress] = useState('')
    const [showOrderOverlay, setShowOrderOverlay] = useState(false);
    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, orders, setOrders, cart, setCart } = useUser()

    useEffect(() => {
        //fetching back orders
        async function fetchOrders() {
            try {
                const response = await axios.get(`http://localhost:8000/auth/getorders`, { params: { userId: userId } });
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchOrders()
    }, [orders,setOrders])

    useEffect(() => {
        //fetching back orders
        async function fetchCart() {
            try {
                const response = await axios.get(`http://localhost:8000/auth/getcart`, { params: { userId: userId } });
                setCart(response.data.cart);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchCart()
    }, [setCart])



    async function addToCart() {
        if (!user) {
            return alert('Please log in first ');
        }

        try {
            const response = await axios.post("http://localhost:8000/auth/addtocartbook", {
                productId: product._id,
                userId: userId

            });

            alert('Item added to cart successfully');

            //fetching back cart
            try {
                const response = await axios.get(`http://localhost:8000/auth/getcart`, { params: { userId: userId } });
                setCart(response.data.cart);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else if (error.request) {
                alert('No response received from server');
            } else {
                alert('Error in request setup: ' + error.message);
            }
        }
    }


    async function orderitem(e) {
        e.preventDefault();
        if (!user) return alert('loggin first')

        if (!address) {
            alert('Missing fields');
            return;
        }
        console.log("Frontend request Log", product.price, product._id, address, user, userId);
        try {
            const response = await axios.post("http://localhost:8000/auth/orderbook", {
                orderPrice: product.price,
                OrderedproductId: product._id,
                address: address,
                customer: user,
                customerId: userId
            });
            setShowOrderOverlay(false)
            alert('Ordered Successful')
            setSelectedBook(null)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else if (error.request) {
                alert('No response received from server');
            } else {
                alert('Error in request setup: ', error.message);
            }
        }
    }




    return (
        <>
            <IoArrowBack onClick={(e) => { setSelectedBook(null) }} className='backbutton' />
            <div id='parentofmaincontainer'>
                <div id='maincontainer'>
                    <div id='leftside'>
                        <img className='image' src={transformImagePath(product.image)} alt="" />
                        <div className='buttons'>
                            <button onClick={addToCart} className='addtocartbutton'>Add to Cart</button>
                            <button onClick={(e) => setShowOrderOverlay(true)} className='orderbutton'>Order</button>
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
            {showOrderOverlay && (
                <div className='order-overlay'>
                    <div className='overlay-content'>
                        <div className='close-button-div'>
                            <button onClick={() => setShowOrderOverlay(false)} className='close-button'>x</button>
                        </div>
                        <form id='form'>
                            <div className='addresscontainer'>
                                <label htmlFor='address'>Address</label>
                                <input onChange={(e) => setAddress(e.target.value)} type='text' id='address' placeholder='Add Address' />
                            </div>
                            <button onClick={orderitem} className='overlay-order-button'>Order</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default OnBookopen
