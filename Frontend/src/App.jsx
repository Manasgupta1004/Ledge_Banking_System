import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import Home from './pages/home'
import Balance from './pages/balance'
import History from './pages/history'
import Account from './pages/accounts'
import QR from './pages/QR'
import Scanner from './pages/scanner'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
const App = () => {
  return (
    <div className='flex w-full'>
      <Toaster />
      <Sidebar />
      <div className='w-full'>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Login />} />
        <Route path='/my-accounts' element={<Account />} />
        <Route path='/my-qr' element={<QR />} />
        <Route path='/my-scanner' element={<Scanner />} />
        <Route path='/my-history' element={<History />} />
        <Route path='/my-balance' element={<Balance />} />
      </Routes>
      </div>
    </div>
  )
}

export default App

