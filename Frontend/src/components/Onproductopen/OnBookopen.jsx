import React from 'react'
import './OnBookopen.css'
import { transformImagePath } from '../../utils'



function OnBookopen({ product }) {

    return (
        <>
            <div id='parentofmaincontainer'>
                <div id='maincontainer'>
                    <div id='leftside'>
                        <img className='image' src={transformImagePath(product.image)} alt="" />
                        <div className='buttons'>
                            <button className='addtocartbutton'>Add to Cart</button>
                            <button className='orderbutton'>Order</button>
                        </div>
                    </div>


                    <div id='rightside'>
                        <h1 className='text-black'><b>{product.title}</b></h1><br />
                        <h6>Author : {product.author}</h6><br />
                        <h6>Price : ₹{product.price}</h6><br />
                        <h6 className='description'>Seller Phone Numeber : {product.phoneNumber}</h6><br /><br />

                        <p>{product.description}</p><br />


                    </div>



                </div>

            </div>
        </>
    )
}

export default OnBookopen
