import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Application from "./app/Application"
import Home from "./app/home/Home"
import BookDetails from "./app/bookDetail/BookDetails"
import { useEffect, useState } from "react"
import axios from "axios"
import Login from "./app/Auth/login"
import SearchPage from "./app/search/searchpage"
import Reserve from "./app/reserve/reserve"

import Context from "./context"
import UserDetails from "./app/home/userDetails"

function App() {
    const [isTokenMatch, setIsTokenMatch] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    useEffect(() => {
        async function fetchUser() {
            if (!localStorage.getItem('uid')) {
                setLoading(false)
                return 'please login'
            }
            const res = await axios.get(`http://localhost:3000/user?id=${localStorage.getItem('uid')}`)
            if (res.data.token !== localStorage.getItem('token')) {
                setIsTokenMatch(false)

            } else {
                setUser(res.data)
                setIsTokenMatch(true)
            }
            setLoading(false)
        }
        fetchUser()
    }, [])
    if (loading) {
        return null
    }
    return (
         <Context.Provider value={isTokenMatch ? user : null}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={isTokenMatch ? <Application /> : <Navigate to="/login" />} >
                        <Route index element={<Home />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="reserve" element={<Reserve />} />
                        <Route path="book/:id" element={<BookDetails />} />
                        <Route path="userDetails" element={<UserDetails/>} />
                    </Route>
                    <Route path="/login" element={!isTokenMatch ? <Login /> : <Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
        
    )

}
export default App