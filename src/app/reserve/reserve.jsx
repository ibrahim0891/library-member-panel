import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const Reserve = () => {
    const [reserveList, setReserveList] = useState(null)
    const [userborrowedBook, setUserBorrowedBook] = useState(null)

    useEffect(() => {
        async function fetchReserveList() {
            const res = await axios.get(`http://localhost:3000/reservations`)
            setReserveList(res.data)
            console.log(res.data);
        }
        fetchReserveList()

        async function getUser(uid) {
            const res = await axios.get(`http://localhost:3000/user?id=${uid}`)
            setUserBorrowedBook(res.data.borrowedBooks)
            console.log(res.data.borrowedBooks);
        }
        getUser(localStorage.getItem('uid'))

    }, [])
    async function cancelReservation(id) {
        const bookId = id;
        const userId = localStorage.getItem('uid');
        const res = await axios.post(`http://localhost:3000/cancelReservation`, {
            bookId,
            userId
        });
        setReserveList(reserveList.filter(reserve => reserve.bookID._id !== id));
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Reserved Books</h2>
                    {reserveList && reserveList.length !== 0 ? (
                        <div className="space-y-4">
                            {reserveList.map((reserve) => (
                                <div key={reserve._id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="w-24 flex-shrink-0">
                                        <img
                                            src={reserve.bookID.coverImage || 'https://www.picmaker.com/assets/images/bookcovermaker/template-1.png' }
                                            alt={reserve.bookID.title}
                                            className="w-full h-32 object-cover rounded-lg shadow"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={'/book/' + reserve.bookID._id}>
                                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 capitalize">{reserve.bookID.title}</h3>
                                        </Link>
                                        <p className="text-sm text-gray-600 mt-1">By {reserve.bookID.author || 'Unknown'}</p>
                                        <p className="text-sm text-gray-500 mt-1">Reserved: {new Date(reserve.reservationDate).toLocaleDateString()}</p>
                                        <button
                                            onClick={() => cancelReservation(reserve.bookID._id)}
                                            className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Cancel Reservation
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No reservations</h3>
                            <p className="mt-1 text-sm text-gray-500">Your reservation list is currently empty</p>
                        </div>
                    )}
                </section>

                <section className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Borrowed Books</h2>
                    {userborrowedBook && userborrowedBook.length !== 0 ? (
                        <div className="space-y-4">
                            {userborrowedBook.map((borrow) => (
                                <div key={borrow._id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="w-24 flex-shrink-0">
                                        <img
                                            src={borrow.bookId.coverImage || 'https://www.picmaker.com/assets/images/bookcovermaker/template-1.png'}
                                            alt={borrow.bookId.title}
                                            className="w-full h-32 object-cover rounded-lg shadow"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={'/book/' + borrow.bookId._id}>
                                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 capitalize">{borrow.bookId.title}</h3>
                                        </Link>
                                        <p className="text-sm text-gray-600 mt-1">By {borrow.bookId.author || 'Unknown'}</p>
                                        <p className="text-sm text-gray-500 mt-1">Due Date: {new Date(borrow.dueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No borrowed books</h3>
                            <p className="mt-1 text-sm text-gray-500">You haven't borrowed any books yet</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Reserve