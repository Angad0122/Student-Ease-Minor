
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import './UniformPage.css';
import axios from 'axios';

function UniformPage() {
    const[uniforms,setUniforms] = useState([]); //array of uniform objects
    const [showOverlay, setShowOverlay] = useState(false);
    const [formData, setFormData] = useState({
        type: '',
        organization: '',
        price: '',
        image: null
    });



    useEffect(()=>{
        async function fetchUniforms() {
            try {
                const response = await axios.get('http://localhost:8000/admin/uniformPage');
                setUniforms(response.data.uniforms);
            } catch (error) {
                console.error('Error fetching uniforms:', error);
            }
        }
    
        fetchUniforms();
    },[showOverlay])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('type', formData.type);
            form.append('organization', formData.organization);
            form.append('price', formData.price);
            form.append('image', formData.image);

            const res = await axios.post('http://localhost:8000/admin/addUniform', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setFormData({
                type: '',
                organization: '',
                price: '',
                image: null
            });
            setShowOverlay(false);
        }
    };

    const handleDeleteUniform = async (_id) => {
        try {
            await axios.delete(`http://localhost:8000/admin/uniformPage/${_id}`);
            const updatedUniforms = uniforms.filter(uniform => uniform._id !== _id);
            setUniforms(updatedUniforms);
        } catch (error) {
            console.error('Error deleting uniform:', error);
        }
    };
    
    return (
        <>
            <div className='heading-and-add-div'>
                <h1 className='m-3 heading'>Uniforms</h1>
                <button onClick={() => setShowOverlay(true)} className='add-button'><IoMdAdd /></button>
            </div>
            <hr className='bg-black m-3' />
            <div className='headings m-3 p-2'>
                <p><strong>Type</strong></p>
                <p><strong>Organization</strong></p>
                <p><strong>Price</strong></p>
                <p className='mx-3'><strong></strong></p>
            </div>
            <div id='alluserscontainer' className='user-container-wrapper'>
                {uniforms.map(uniform => (
                    <div className='user-container' key={uniform._id}>
                        <div className='user-info'>
                            <p className='ml-2'>{uniform.type}</p>
                            <p>{uniform.organization}</p>
                            <p>{uniform.price}</p>
                            <button className='delete-btn' onClick={() => handleDeleteUniform(uniform._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>


            {showOverlay && (
                <div className="overlay">
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='closebuttondiv'>
                            <button onClick={(e) => setShowOverlay(false)} className='Xbtn'>X</button>
                        </div>
                        <select
                            className='input'
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Shirt">Shirt</option>
                            <option value="T-shirt">T-shirt</option>
                            <option value="Pant">Pant</option>
                        </select>
                        <input
                            className='input'
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Organization"
                            required
                        />
                        <input
                            className='input'
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                        />
                        <input
                            className='input'
                            type="file"
                            name="image"
                            onChange={handleImageChange} // Use handleImageChange as onChange handler
                            placeholder="Add image URL"
                            required
                        />


                        <button className='overlaybutton' type="submit">Add</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default UniformPage;
