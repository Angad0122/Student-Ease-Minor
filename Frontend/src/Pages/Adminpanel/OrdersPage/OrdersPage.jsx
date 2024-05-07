import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './OrdersPage.css'
function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get('http://localhost:8000/admin/orderPage');
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    
        fetchOrders();
    }, []);    

    return (
        <>
            <h1 className='m-3'>All Orders</h1>
            <hr className='bg-black m-3' />
            <div className='headings m-3 p-2'>
                <p><strong>Product Type</strong></p>
                <p><strong>Customer</strong></p>
                <p><strong>Address</strong></p>
                <p><strong>Price</strong></p>
                <p><strong>Status</strong></p>
                <p><strong>Product Id</strong></p>
                <p className='mx-3'><strong></strong></p>
            </div>
            <div id='alluserscontainer' className='user-container-wrapper'>
                {orders.map(order => (
                    <div className='user-container' key={order._id}>
                        <div className='user-info'>
                            <p className='ml-2'>{order.producttype}</p>
                            <p>{order.customer}</p>
                            <p>{order.address}</p>
                            <p>₹{order.orderPrice}</p>
                            <p>{order.status}</p>
                            <p>{order.OrderedproductId}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default OrdersPage
