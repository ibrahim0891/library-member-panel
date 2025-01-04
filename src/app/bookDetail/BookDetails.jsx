import axios from "axios";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null)
    const [isReserved, setIsReserved] = useState(false);
    const [isBorrowed, setIsBorrowed] = useState(false); 

    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchBook() {
            const res = await axios.get(`http://localhost:3000/book/details?id=${id}`)
            setBook(res.data)
            console.log(res.data.reserverList);
            res.data.reserverList.forEach((reserver) => {
                reserver.userID._id == localStorage.getItem('uid') ? setIsReserved(true) : setIsReserved(false);
            })
            res.data.borrowedBy.forEach((borrower) => {
                borrower._id == localStorage.getItem('uid') ? setIsBorrowed(true) : setIsBorrowed(false);
            })
            console.log(res.data)
        }
        fetchBook()
    }, [])

    async function reserve(id) {
        const bookId = id;
        const userId = localStorage.getItem('uid');
        axios.post(`http://localhost:3000/reserveBook`, {
            bookId,
            userId
        }).then((res) => {
            console.log(res);
            setIsReserved(true)
        }).catch((err) => {
            console.log(err.response.status);
            if (err.response.status === 400) {
                setError('You have already reserved 3 books. Cancel a reservation to reserve another book.');
            } else {
                setError('An error occurred while reserving the book.');
            }
        })
 
    }
    async function cancelReservation() {
        const bookId = id;
        const userId = localStorage.getItem('uid');
        const res = await axios.post(`http://localhost:3000/cancelReservation`, {
            bookId,
            userId
        }).then((res) => {
            console.log(res);
            setIsReserved(false)
        })

    }

    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 5000)
    }, [error])

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
                
                {book && (
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        <div className="p-6 lg:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Book Cover Column */}
                                <div className="lg:col-span-4">
                                    <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                                        <img
                                            src={book.coverImage || 'https://www.picmaker.com/assets/images/bookcovermaker/template-1.png'}
                                            alt={`${book.title} cover`}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Book Details Column */}
                                <div className="lg:col-span-8 space-y-6">
                                    <div>
                                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{book.title}</h1>
                                        <p className="text-xl text-gray-600">By {book.author}</p>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center space-x-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`h-6 w-6 ${index < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-lg text-gray-600">({book.rating} / 5)</span>
                                    </div>

                                    {/* Book Details Table */}
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="py-3 text-sm font-medium text-gray-500">Publication Year</td>
                                                <td className="py-3 text-sm text-gray-900">{book.publicationYear}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-sm font-medium text-gray-500">ISBN</td>
                                                <td className="py-3 text-sm text-gray-900">{book.ISBN}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-sm font-medium text-gray-500">Language</td>
                                                <td className="py-3 text-sm text-gray-900">{book.language}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-sm font-medium text-gray-500">Available Copies</td>
                                                <td className="py-3 text-sm text-gray-900">{book.availableCopies}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Summary */}
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Summary</h2>
                                        <p className="text-gray-700 leading-relaxed">{book.summary}</p>
                                    </div>

                                    {/* Genres */}
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Genres</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {book.genre.map((genre, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Tags</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {book.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-6">
                                        {book.availableCopies == 0 ? (
                                            <div className="p-4 bg-gray-100 rounded-lg text-gray-700 text-center font-medium">
                                                Currently Unavailable
                                            </div>
                                        ) : isBorrowed ? (
                                            <div className="p-4 bg-green-50 rounded-lg text-green-700 text-center font-medium">
                                                Book Currently Borrowed
                                            </div>
                                        ) : isReserved ? (
                                            <button
                                                onClick={() => cancelReservation()}
                                                className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                                            >
                                                Cancel Reservation
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => reserve(book._id)}
                                                className="w-full py-3 px-4 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                                            >
                                                Reserve Book
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetails;