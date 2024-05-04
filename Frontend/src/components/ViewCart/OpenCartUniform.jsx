import React, { useState } from 'react';
import axios from 'axios';
import './OpenCartUniform.css';
import { transformImagePath } from '../../utils';
import { useUser } from '../../contexts/UserContext';

function OpenCartUniform({ product, setSelectedProduct }) {
    const [size, setSize] = useState('');
    const [address, setAddress] = useState('')
    const [showOrderOverlay, setShowOrderOverlay] = useState(false);
    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, cart, setCart } = useUser()

    async function orderitem(e) {
        e.preventDefault();
        if (!user) return alert('loggin first')

        if (!address || !size) {
            alert('Missing fields');
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/auth/orderuniform", {
                orderPrice: product.price,
                OrderedproductId: product._id,
                size: size,
                address: address,
                customer: user,
                customerId: userId
            });
            console.log("response log", response.data.order, response.data.orderId);
            setShowOrderOverlay(false)
            alert('Ordered Successful')
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


    async function removeFromCart() {
        console.log('ye function run hogaya', product);
        if (!user) {
            return alert('Please log in first');
        }
    
        try {
            const response = await axios.post("http://localhost:8000/auth/removeuniformfromcart", {
                productId: product._id,
                userId: userId
            });
    
            console.log('response', response);
            alert('Item removed from cart successfully');
            setSelectedProduct(null)
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
    
    return (
        <>
            <div className='parent-container'>
                <div className='main-container'>
                    <div className='left-side'>
                        <img className='image' src={transformImagePath(product.image)} alt="" />
                        <div className='buttons'>
                            <button onClick={removeFromCart} className='add-to-cart-button'>Remove from Cart</button>
                            <button onClick={() => setShowOrderOverlay(true)} className='order-button'>Order</button>
                        </div>
                    </div>
                    <div className='right-side'>
                        <h1>{product.organization}</h1><br />
                        <h6>{product.type}</h6><br />
                        <h6>Price: ₹{product.price}</h6><br /><br />
                        <h6>{product.description}</h6><br />
                        {(product.type == 'Shirt'||product.type =='T-shirt') ? (
                            <img src="./Tshirtsizechart.jpg" alt="" />
                        ) : (
                            <img src="./pantsizechart.jpg" alt="" />
                        )
                        }
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
                            <div>
                                <label htmlFor='address'>Select Size</label>
                                <select
                                    className='input size-input'
                                    name='type'
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    required
                                >
                                    <option value=''>Select Size</option>
                                    <option value='Small'>S</option>
                                    <option value='Medium'>M</option>
                                    <option value='Large'>L</option>
                                    <option value='XLarge'>XL</option>
                                    <option value='XXLarge'>XXL</option>
                                    <option value='3XLarge'>3XL</option>
                                    <option value='4XLarge'>4XL</option>
                                </select>
                            </div>
                            <button onClick={orderitem} className='overlay-order-button'>Order</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default OpenCartUniform;
