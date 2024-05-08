import React, { useEffect, useState } from 'react';
import './ViewOrder.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { transformImagePath } from '../../utils';
import BookOrderOpen from './BookOrderOpen';
import UniformOrderOpen from './UniformOrderOpen';

function ViewOrders() {
    const navigate = useNavigate()
    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, orders, setOrders, cart, setCart } = useUser();
    const [allOrdersList, setAllOrdersList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);


    if (!user) {
        navigate('/')
    }
    useEffect(() => {
        async function fetchAllOrders() {
            try {
                const fetchedOrders = await Promise.all(orders.map(async (orderId) => {
                    const response = await axios.get(`http://localhost:8000/vieworders/${orderId}`);
                    return response.data.order;
                }));

                const updatedOrdersList = await Promise.all(fetchedOrders.map(async (order) => {
                    let product = null;
                    if (order.producttype === 'uniform') {
                        const uniformId = order.OrderedproductId;
                        const response = await axios.get(`http://localhost:8000/vieworder_uniforms/${uniformId}`);
                        product = response.data.product;
                    } else if (order.producttype === 'book') {
                        const bookId = order.OrderedproductId;
                        const response = await axios.get(`http://localhost:8000/vieworder_books/${bookId}`);
                        product = response.data.product;
                    }
                    else{
                        console.log("Dono condition check nahi hui");
                    }
                    return { ...order, product };
                }));

                setAllOrdersList(updatedOrdersList);
                console.log('updatedOrdersList', updatedOrdersList);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchAllOrders();
    }, [orders,setOrders]);

    function openproduct(product) {
        setSelectedProduct(product);
    }
    return (
        <>
            <Header />

            {selectedProduct ? (
                <>
                    {selectedProduct.producttype === 'uniform' ? (
                        <>
                            <UniformOrderOpen product={selectedProduct} setSelectedProduct={setSelectedProduct} />
                        </>
                    ) : (
                        <>
                            <BookOrderOpen product={selectedProduct} setSelectedProduct={setSelectedProduct} />
                        </>
                    )}
                </>
            ) : (
                <>
                    {allOrdersList.length > 0 ? (
                        <>
                        <div className='suggessionheading'>
                        <p>! If you Ordered recently and can't see your order than try logging in again</p>
                        </div>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 m-10 my-20">
                                {allOrdersList.map((product) => (
                                    <button onClick={() => openproduct(product)} className='singleuniform bg-gray-400 p-2 border-radius-5px' key={product._id}>
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">

                                            <img
                                                src={transformImagePath(product.product.image)}
                                                alt={product.organization}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.organization}</h3>
                                        <h3 className="mt-1 text-sm text-gray-700">{product.product.type}</h3>
                                        <h3 className="mt-1 text-sm text-gray-700">{product.product.title}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{product.product.price}</p>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                        <div className='suggessionheading'>
                        <p>! If you Ordered recently and can't see your order than try logging in again</p>
                        </div>
                        <h1 className='noordersfound'>No Orders Found</h1>
                        </>
                    )}
                </>
            )}



            <Footer />
        </>
    );
}

export default ViewOrders;
