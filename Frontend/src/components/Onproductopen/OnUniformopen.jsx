import React, { useState } from 'react'
import './OnUniformopen.css'
import { transformImagePath } from '../../utils'



function OnUniformopen({ product }) {
    const [size,setSize] = useState('')

    return (
        <>
            <div id='parentofmaincontainer'>
                <div id='maincontainer'>

                    <div id='leftside'>
                        <img className='image' src={transformImagePath(product.image)} alt="" />
                        <select
                            className='input sizeinput'
                            name="type"
                            value={size}
                            onChange={(e)=>setSize(e.target.value)}
                            required
                        >
                            <option value="">Select Size</option>
                            <option value="XSmall">XS</option>
                            <option value="Small">S</option>
                            <option value="Medium">M</option>
                            <option value="Large">L</option>
                            <option value="XLarge">XL</option>
                        </select>

                        <div className='buttons'>
                            <button className='addtocartbutton'>Add to Cart</button>
                            <button className='orderbutton'>Order</button>
                        </div>
                    </div>


                    <div id='rightside'>
                        <h1>{product.organization}</h1><br />
                        <h6>{product.type}</h6><br />
                        <h6>Price : ₹{product.price}</h6><br /><br />
                        <h6>{product.description}</h6><br />

                        
                    </div>



                </div>

            </div>
        </>
    )
}

export default OnUniformopen
