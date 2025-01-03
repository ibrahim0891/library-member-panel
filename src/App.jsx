import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Application from "./app/Application"
import Home from "./app/home/Home"
import BookDetails from "./app/bookDetail/BookDetails"
import { useEffect, useState } from "react"
import axios from "axios"
import Login from "./app/Auth/login"
import SearchPage from "./app/search/searchpage"
import Reserve from "./app/reserve/reserve"



function App() {
    const [isTokenMatch, setIsTokenMatch] = useState(false)
    useEffect(() => {
        async function fetchUser() {
            const res = await axios.get(`http://localhost:3000/user?id=${localStorage.getItem('uid')}`)
            if (res.data.token !== localStorage.getItem('token')) {
                setIsTokenMatch(false)
            } else {
                setIsTokenMatch(true)
            }
        }
        fetchUser()
    }, [])
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={isTokenMatch ? <Application /> : <Navigate to="/login" />} >
                        <Route index element={<Home />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="reserve" element={<Reserve />} />
                        <Route path="book/:id" element={<BookDetails />} />
                    </Route>
                    <Route path="/login" element={!isTokenMatch ? <Login /> : <Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
