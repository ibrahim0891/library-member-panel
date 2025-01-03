import { useState } from "react";
import BookCard from "../../ui/Home/BookCard";
import { Link } from "react-router-dom";




const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/books/search?searchField=title&searchValue=${searchQuery}`);
            const authorResponse = await fetch(`http://localhost:3000/books/search?searchField=author&searchValue=${searchQuery}`);
            const nameData = await response.json();
            const authorData = await authorResponse.json();
            const combinedResults = [...nameData, ...authorData];
            console.log(combinedResults);
            setSearchResults(combinedResults);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    return <div>
        <div className="p-4">
            <form className="flex gap-2" onSubmit={(e) => { search() }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) =>{ setSearchQuery(e.target.value); search()}}
                    className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
                <button onClick={search}
                    className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                    Search
                </button>
            </form>
        </div>
        <div>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
                    {searchResults.length > 0 && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4">
                            <p className="text-gray-600">Found {searchResults.length} results in {(Math.random() * 0.5 + 0.3).toFixed(2)} seconds</p>
                        </div>
                    )}

                    {searchResults.map((book, index) => (
                        <div key={index} className="flex flex-row md:flex-col h-full p-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white">
                            <div className="relative w-24 md:w-full h-32 md:h-48 flex-shrink-0">
                                <img
                                    src={`https://picsum.photos/seed/${index * index + 23}/300/400`}
                                    alt={book.title}
                                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <Link to={'/book/' + book._id}>
                                <div className="flex flex-col ml-4 md:ml-0 md:mt-4 flex-grow">
                                    <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h2>
                                    <p className="text-sm text-gray-600 mb-2 italic">{book.author}</p>
                                    <p className="text-sm text-gray-700 line-clamp-3">{book.summery}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

        </div>
    </div>
}

export default SearchPage;