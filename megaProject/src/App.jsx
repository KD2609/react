import './App.css'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js'
import Header from './components/header/Header.jsx'



function App() {

  const[loading ,setLoading] = useState(true);
  const dispatch  = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch((login(userData)))
      } else {
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));
  },[])
  
  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO
        </main>
      </div>
    </div>
  ) : <div>Test</div>;
}

export default App
