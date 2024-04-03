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

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await axios.post("http://localhost:8000/auth/sellbook", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            
            console.log(response);
            setBookUploaded(true);
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
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
                    <form action="/books" method="post" enctype="multipart/form-data">
                        <div className='my-2'>
                            <label className='inputheading' for="title">Title: </label><br />
                            <input onChange={(e) => setTitle(e.target.value)} className='inputfield text-center ' type="text" id="title" name="book[title]" required /><br />
                        </div>

                        <div className='my-2'>
                            <label className='inputheading' for="author">Author(s): </label><br />
                            <input onChange={(e) => setAuthor(e.target.value)} className='inputfield text-center' type="text" id="author" name="book[authors][]" data-role="tagsinput" /><br />
                        </div>

                        <div className='my-2'>
                            <label className='inputheading' for="image">Upload Image: </label><br />
                            <input onSelect={(e)=>setImage(e.target.value)} className=' text-center' type="file" accept=".jpg,.jpeg,.png,gif" id="image" name="book[image]" /><br />
                        </div>

                        <div className='my-2'>
                            <label className='inputheading' for="price">Price ($): </label><br />
                            <input onChange={(e) => setPrice(e.target.value)} className='inputfield text-center' type="number" step="0.01" id="price" name="book[price]" /><br />
                        </div>

                        <div id='submitbutton' className=''>
                            <button type="submit" onClick={submit} class="">Submit</button>
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
