import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewBooks.css';
import { transformImagePath } from '../../utils';
import OnBookopen from '../Onproductopen/OnBookopen';

function ViewBooks() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await axios.get('http://localhost:8000/viewbooks');
                setBooks(response.data.books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }

        fetchBooks();
    }, []);

    function openproduct(book) {
        setSelectedBook(book);
    }

    return (
        <>
            {selectedBook ? (
                <OnBookopen product={selectedBook} />
            ) : (
                books.length > 0 ? (
                    <div className='bg-black'>
                        <div className="bg-white">
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                <h2 className="sr-only">Books</h2>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    {books.map((book) => (
                                        <button onClick={() => openproduct(book)} className='singlebook bg-gray-400 p-2 border-radius-5px' key={book._id}>
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                <img
                                                    src={transformImagePath(book.image)}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <h3 className="mt-4 text-sm text-gray-700">{book.title}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">₹{book.price}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id='nothingtosee'>
                        <h1>No books available.</h1>
                    </div>
                )
            )}
        </>
    );
}

export default ViewBooks;
