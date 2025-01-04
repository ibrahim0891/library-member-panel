import { Link } from "react-router-dom";
import BookCard from "../../ui/Home/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { DefaultPagination } from "../../ui/Home/Pagination";




export default function Home() {
    const [books, setBooks] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        async function fetchBooks(page) {
            const res = await axios.get(`http://localhost:3000/books?page=${page}`)
            setBooks(res.data)
        }
        fetchBooks(currentPage)
    }, [currentPage])
    return (
        <div>
            {books === null ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-2 gap-6 p-8">
                        {books.books.map((book) => {
                            return <Link key={book._id} to={`/book/${book._id}`} className="transform hover:scale-105 transition-transform duration-300">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="relative aspect-[3/4]">
                                        <img src={book.coverImage ||  'https://www.picmaker.com/assets/images/bookcovermaker/template-1.png'} alt={book.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2 flex items-center space-x-1">
                                            <span className="inline-flex items-center bg-white/90 rounded-full px-2 py-1 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-gray-800">{book.rating || 'N/A'}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {book.genre && book.genre.map((g, index) => (
                                                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{book.language}</span>
                                            <span className="text-sm text-gray-500">{new Date(book.publicationYear).getFullYear()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        })}
                    </div>
                    <div className="w-full px-8 py-6  bg-white">
                        <DefaultPagination currentPage={books.currentPage} totalPages={books.totalPages} onPageChange={(page) => {
                            window.scrollTo(0, 0)
                            setCurrentPage(page)
                        }} />
                    </div>
                </>
            )}
        </div>    
        );
}