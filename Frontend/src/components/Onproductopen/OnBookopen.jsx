import React from 'react'
import './OnBookopen.css'
import { transformImagePath } from '../../utils'



function OnBookopen({product}) {

    return (
        <>
        <div id='parentofmaincontainer'>
            <div id='maincontainer'>
                <div id='leftside'>
                <img className='image' src = {transformImagePath(product.image)} alt="" />
                <div className='buttons'>
                <button className='addtocartbutton'>Add to Cart</button>
                <button className='orderbutton'>Order</button>
                </div>
                </div>


                <div id='rightside'> 
                <h1>{product.title}</h1>
                <h3>Price : ₹{product.price}</h3>

                </div>



            </div>
            
        </div>
        </>
    )
}

export default OnBookopen
