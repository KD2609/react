import './App.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {

        authService.getCurrentUser()
            .then((userData) => {

                if (userData) {
                    dispatch(login(userData))
                } else {
                    dispatch(logout())
                }

            })
            .catch(() => {
                dispatch(logout())
            })
            .finally(() => {
                setLoading(false)
            })

    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen flex flex-wrap content-between">

            <div className="w-full block">

                <Header />

                <main>
                    <Outlet />
                </main>

                <Footer />
            </div>

        </div>
    )
}

export default App