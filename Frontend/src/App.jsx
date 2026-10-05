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
import Transaction from './pages/transaction'
import Deposite from './pages/deposite'
const App = () => {
const [showSidebar, setShowSidebar] = React.useState(true)

  return (
    <div className='flex w-full h-screen'>
      <Toaster />
      {showSidebar && <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
      <div className='w-full h-screen md:ml-60 flex flex-col'>
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main className='flex-1 min-h-0'>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Login />} />
        <Route path='/my-accounts' element={<Account />} />
        <Route path='/my-qr' element={<QR />} />
        <Route path='/my-scanner' element={<Scanner />} />
        <Route path='/my-history' element={<History />} />
        <Route path='/my-balance' element={<Balance />} />
        <Route path='/transaction' element={<Transaction/>}/>
        <Route path='/add-deposite' element={<Deposite/>}/>
      </Routes>
      </main>
      </div>
    </div>
  )
}

export default App

