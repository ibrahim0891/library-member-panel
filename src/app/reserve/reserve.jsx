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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
            <div>
                <h1 className="text-3xl{new Date(member.membershipDate).toLocaleDateString() font-bold p-6 md:text-center"> Reserved books </h1>
                {
                    reserveList && reserveList.length != 0 ? reserveList.map((reserve) => {
                        return (
                            <div key={reserve._id} className="flex flex-row items-center justify-start gap-6 p-6 md:gap-6 p-4 md:p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200 backdrop-blur-xl transition-all duration-300">
                                <div className=" md:w-28 flex-shrink-0">
                                    <img
                                        src="https://placehold.co/100x150"
                                        alt="Book cover"
                                        className=" h-full md:h-40 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex-grow text-left space-y-2 md:space-y-3">
                                    <Link to={'/book/' + reserve.bookID._id}>
                                        <h1 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors leading-tight capitalize">{reserve.bookID.title}</h1>
                                    </Link>
                                    <p className="text-sm md:text-base text-gray-600 font-medium">Author: {reserve.bookID.author || 'Unknown'}</p>
                                    <p className="text-sm md:text-base text-gray-500 font-medium">Reserved on: {new Date(reserve.reservationDate).toLocaleDateString()}</p>
                                    <button
                                        onClick={() => cancelReservation(reserve.bookID._id)}
                                        className="mt-2 md:mt-4 select-none rounded-lg bg-gradient-to-r from-red-500 to-red-600 py-1.5 md:py-2 px-4 md:px-6 text-center align-middle font-sans text-sm font-semibold text-white shadow-sm transition-all hover:from-red-600 hover:to-red-700 active:scale-95 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        Cancel Reservation
                                    </button>
                                </div>                        </div>)
                    }) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <p className="text-xl text-gray-600 font-medium">No reservations found</p>
                            <p className="text-gray-500 mt-2">Your reservation list is currently empty</p>
                        </div>
                    )
                }
            </div>
            <div>
                <h1 className="text-3xl font-bold p-6 md:text-center"> Borrowed books </h1>
                {
                    userborrowedBook && userborrowedBook.length != 0 ? userborrowedBook.map((borrow) => {
                        return (
                            <div key={borrow._id} className="flex flex-row items-center justify-start gap-6 p-6 md:gap-6 p-4 md:p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200 backdrop-blur-xl transition-all duration-300">
                                <div className=" md:w-28 flex-shrink-0">
                                    <img
                                        src="https://placehold.co/100x150"
                                        alt="Book cover"
                                        className=" h-full md:h-40 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex-grow text-left space-y-2 md:space-y-3">
                                    <Link to={'/book/' + borrow.bookId._id}>
                                        <h1 className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors leading-tight capitalize">{borrow.bookId.title}</h1>
                                    </Link>
                                    <p className="text-sm md:text-base text-gray-600 font-medium">Author: {borrow.bookId.author || 'Unknown'}</p>
                                    <p className="text-sm md:text-base text-gray-500 font-medium">Reserved on: {new Date(borrow.reservationDate).toLocaleDateString()}</p>

                                </div>
                            </div>)
                    }) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <p className="text-xl text-gray-600 font-medium">No Issued book found</p>
                            <p className="text-gray-500 mt-2">You haven't borrowed any book yet.</p>
                        </div>
                    )
                }
            </div>


        </div>
    )
}

export default Reserve