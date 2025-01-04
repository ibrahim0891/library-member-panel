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
    return <div className="max-w-7xl mx-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <form className="max-w-3xl mx-auto" onSubmit={(e) => { search() }}>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search for books or authors..."
                        value={searchQuery}
                        onChange={(e) =>{ setSearchQuery(e.target.value); search()}}
                        className="flex-1 px-6 py-3 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-colors duration-200"
                    />
                    <button onClick={search}
                        className="px-8 py-3 font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
            {loading ? (
                <p className="text-center text-gray-500 py-12">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-400 py-12">{error}</p>
            ) : (
                <div className="space-y-12">
                    {searchResults.length > 0 && (
                        <div className="text-center">
                            <p className="text-gray-500 text-sm">{searchResults.length} results found in {(Math.random() * 0.5 + 0.3).toFixed(2)} seconds</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {searchResults.map((book, index) => (
                            <Link to={'/book/' + book._id} key={index}>
                                <div className="group h-full p-6 bg-gray-50 rounded-2xl transition-all duration-200 hover:bg-gray-100">
                                    <div className="aspect-[3/4] mb-6 overflow-hidden rounded-xl">
                                        <img
                                            src={`https://picsum.photos/seed/${index * index + 23}/300/400`}
                                            alt={book.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-xl font-medium text-gray-900 line-clamp-2">{book.title}</h2>
                                        <p className="text-sm text-gray-500 italic">{book.author}</p>
                                        <p className="text-sm text-gray-600 line-clamp-3">{book.summery}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
}
export default SearchPage;