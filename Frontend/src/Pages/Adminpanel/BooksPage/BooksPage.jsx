import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './BooksPage.css'
function BooksPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await axios.get('http://localhost:8000/admin/bookPage');
                setBooks(response.data.books);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    
        fetchBooks();
    }, []);    

    const handleDeleteUser = async (bookId) => {
        try {
            await axios.delete(`http://localhost:8000/admin/bookPage/${bookId}`);
            const updatedBooks = books.filter(book => book.bookId !== bookId);
            setBooks(updatedBooks);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };
    

    return (
        <>
            <h1 className='m-3'>Books</h1>
            <hr className='bg-black m-3' />
            <div className='headings m-3 p-2'>
                <p><strong>Title</strong></p>
                <p><strong>Author</strong></p>
                <p><strong>Seller username</strong></p>
                <p><strong>Seller Phonenumber</strong></p>
                <p><strong>Price</strong></p>
                <p className='mx-3'><strong></strong></p>
            </div>
            <div id='alluserscontainer' className='user-container-wrapper'>
                {books.map(book => (
                    <div className='user-container' key={book.bookId}>
                        <div className='user-info'>
                            <p className='ml-2'>{book.title}</p>
                            <p>{book.author}</p>
                            <p>{book.sellername}</p>
                            <p>{book.phoneNumber}</p>
                            <p>₹{book.price}</p>
                            <button className='delete-btn' onClick={() => handleDeleteUser(book.bookId)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BooksPage
