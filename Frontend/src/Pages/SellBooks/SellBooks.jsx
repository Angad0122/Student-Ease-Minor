import React, { useState } from 'react'
import axios from "axios";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './SellBooks.css'
function SellBooks() {


    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [bookUploaded, setBookUploaded] = useState(false);





    async function submit(e) {
        e.preventDefault();
    
        // Check if image is selected
        if (!image) {
            alert('Please select an image');
            return;
        }
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('image', image);
    
        try {
            console.log('Axios Request:', {
                title,
                author,
                price,
            });
            const response = await axios.post("http://localhost:8000/auth/sellbook", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            setBookUploaded(true);
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
            <Header />
            {bookUploaded ? (
                <div id="divonsubmit" className=" text-center">
                    <h2 className="p-5 uploded bg-green-600">The Book is Uploded Successfully</h2>
                </div>
            ) : (
                <div id='maindiv'>
                    <h1 className='text-center mt-5 text-black'>Add the description  of your book here</h1>
                    <div id='formdiv'>
                        <form action="/sellbook" method="POST" enctype="multipart/form-data">
                            <div className='my-2'>
                                <label className='inputheading' for="title">Title: </label><br />
                                <input onChange={(e) => setTitle(e.target.value)} className='inputfield text-center ' type="text" id="title" name="book[title]" required /><br />
                            </div>

                            <div className='my-2'>
                                <label className='inputheading' for="author">Author: </label><br />
                                <input onChange={(e) => setAuthor(e.target.value)} className='inputfield text-center' type="text" id="author" name="book[authors][]" data-role="tagsinput" /><br />
                            </div>

                            <div className='my-2'>
                                <label className='inputheading' for="image">Upload Image: </label><br />
                                <input onChange={(e)=>setImage(e.target.files[0])} className=' text-center' type="file" accept=".jpg,.jpeg,.png,gif" id="image" name="image" /><br />
                            </div>
                            {image ?(<div id='imagepreviewer'>
                                <h5>The selected Image is: </h5>
                                <img height={100} width={100} src={image} alt="" />

                            </div>
                            ) : (
                                <></>
                            )}
                            

                            <div className='my-2'>
                                <label className='inputheading' for="price">Price (₹): </label><br />
                                <input onChange={(e) => setPrice(e.target.value)} className='inputfield text-center' type="number" step="0.01" id="price" name="book[price]" /><br />
                            </div>

                            <div id='submitbutton' className=''>
                                <button type="submit" onClick={submit} class="">Upload For Sell</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default SellBooks
