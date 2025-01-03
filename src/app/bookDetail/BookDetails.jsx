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
            const res = await axios.get(`http://localhost:3000/book/?id=${id}`)
            setBook(res.data)
            res.data.reserverList.forEach((reserver) => {
                reserver.userID == localStorage.getItem('uid') ? setIsReserved(true) : setIsReserved(false);
            })
            res.data.borrowedBy.forEach((borrower) => {
                borrower._id == localStorage.getItem('uid') ? setIsBorrowed(true) : setIsBorrowed(false);
            })
            console.log(res.data);
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
        <div>
            <div>
                {error && <p>{error}</p>}
            </div>
            {book && (
                <div className="container px-4 py-4 mx-auto">
                    <div className="p-4 bg-white rounded-lg shadow-lg sm:p-6">
                        <div className="flex flex-col items-start justify-center lg:flex-row lg:gap-6">
                            <div className="mb-6 lg:w-1/3">
                                <img
                                    src={book.coverImage || 'https://www.picmaker.com/assets/images/bookcovermaker/template-1.png'}
                                    alt={`${book.title} cover`}
                                    className="object-cover w-full mb-4 rounded-lg shadow-md sm:w-2/3 md:w-1/2 lg:w-full md:h-1/2"
                                />
                            </div>

                            <div className="flex-grow w-full">

                                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">{book.title}</h1>
                                <p className="mb-4 text-base text-gray-600 sm:text-lg">By {book.author}</p>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                className={`h-4 sm:h-5 w-4 sm:w-5 ${index < book.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600 sm:text-base">({book.rating} / 5)</span>
                                </div>

                                <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-gray-500 sm:text-sm">Publication Year</p>
                                        <p className="text-sm font-medium sm:text-base">{book.publicationYear}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 sm:text-sm">ISBN</p>
                                        <p className="text-sm font-medium sm:text-base">{book.ISBN}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 sm:text-sm">Language</p>
                                        <p className="text-sm font-medium sm:text-base">{book.language}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 sm:text-sm">Available Copies</p>
                                        <p className="text-sm font-medium sm:text-base">{book.copies.length}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-semibold sm:text-xl">Summary</h2>
                                    <p className="text-sm text-gray-700 sm:text-base">{book.summary}</p>
                                </div>

                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-semibold sm:text-xl">Genres</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {book.genre.map((genre, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full sm:px-3 sm:text-sm"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-2 text-lg font-semibold sm:text-xl">Tags</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {book.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full sm:px-3 sm:text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="">

                                {isBorrowed ? <div className="">
                                    <span className=" p-4 border text-gray-600 block my-5"> Book Borrowed </span>
                                </div> :
                                    isReserved == true ?
                                        <div className="flex gap-2 w-full">
                                            <button className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
                                                onClick={() => { cancelReservation() }}
                                            >
                                                Cancel Reservation
                                            </button>
                                        </div>
                                        :
                                        <button className="w-full px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                                            onClick={() => reserve(book._id)}>
                                            Reserve
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BookDetails;