import React, { useEffect, useState } from 'react';
import './ViewCart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { transformImagePath } from '../../utils';
import OpenCartUniform from './OpenCartUniform';
import OpenCartBook from './OpenCartBook';

function ViewCart() {
    const navigate = useNavigate()
    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, orders, setOrders, cart, setCart } = useUser();
    const [cartList, setCartList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    if (!user) {
        navigate('/')
    }

    useEffect(() => {
        async function fetchCartProducts() {
            try {
                const fetchedcart = await Promise.all(cart.map(async (productId) => {
                    const response = await axios.get(`http://localhost:8000/viewcart/${productId}`);
                    return response.data.product;
                }));
                setCartList(fetchedcart);
                console.log('cartList', fetchedcart);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        }
        
        fetchCartProducts();
    }, []);

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
                            <OpenCartUniform product={selectedProduct} setSelectedProduct={setSelectedProduct} />
                        </>
                    ) : (
                        <>
                            <OpenCartBook product={selectedProduct} setSelectedProduct={setSelectedProduct} />
                        </>
                    )}
                </>
            ) : (
                <>
                    {cartList.length > 0 ? (
                        <>
                        <div className='suggessionheading'>
                        <p>! If you added a product to cart recently and can't see that product than try logging in again</p>
                        </div>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 m-10 my-20">
                                {cartList.map((product) => (
                                    <button onClick={()=>openproduct(product)} className='singleuniform bg-gray-400 p-2 border-radius-5px' key={product._id}>
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">

                                            <img
                                                src={transformImagePath(product.image)}
                                                alt={product.organization}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.organization}</h3>
                                        <h3 className="mt-1 text-sm text-gray-700">{product.producttype}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
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

export default ViewCart;
