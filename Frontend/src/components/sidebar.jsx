import React from 'react'
import { Clock8Icon, Home, LogOutIcon, QrCodeIcon, ScanIcon, User, Wallet, WalletCards } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/context.jsx'


const sidebar = () => {
    const location = useLocation()
    const navigation = useNavigate()

    const { logoutFunctionContext } = useAppContext()

    const logoutFunction = async () => {
        try {
            const { data } = await axios.post('/api/user/logout')
            if (data.success) {
                toast(data.message)
                logoutFunctionContext()
                navigation('/signup')

            } else {
                toast(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    return (
        <div className='flex flex-col items-center justify-between h-screen bg-gray-100 py-5'>
            <div className='flex flex-col'>
                <div className='flex items-center justify-center mt-4'>
                    <h1 className='font-semibold text-xl'>Ledger</h1><p className='text-blue-500 text-2xl font-semibold'>X</p>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-10'>
                    <div className={`${location.pathname === '/' ? 'bg-indigo-100 rounded w-[240px] cursor-pointer text-blue-500' : ''} py-2 px-5 flex items-center gap-2`}>
                        <Home size={20} />
                        <p onClick={() => navigation('/')}>Home</p>
                    </div>
                    <div className={`${location.pathname === '/my-accounts' ? 'bg-indigo-100 w-[240px] rounded cursor-pointer text-blue-500' : ''} py-2 px-5 flex items-center gap-2`}>
                        <WalletCards size={20} />
                        <p onClick={() => navigation('/my-accounts')}>My Account</p>
                    </div>
                    <div className={`${location.pathname === '/my-scanner' ? 'bg-indigo-100 w-[240px] rounded cursor-pointer text-blue-500' : ''} py-2 px-5 flex items-center gap-2`}>
                        <ScanIcon size={20} />
                        <p onClick={() => navigation('/my-scanner')}>Scanner</p>
                    </div>
                    <div className={`${location.pathname === '/my-qr' ? 'bg-indigo-100 w-[240px] cursor-pointer rounded text-blue-500' : ''} py-2 px-5 flex items-center gap-2`}>
                        <QrCodeIcon size={20} />
                        <p onClick={() => navigation('/my-qr')}>My QR</p>
                    </div>
                    <div className={`${location.pathname === '/my-balance' ? 'bg-indigo-100 w-[240px] cursor-pointer rounded text-blue-500' : ''} py-2 px-5 flex items-center gap-2`}>
                        <Wallet size={20} />
                        <p onClick={() => navigation('/my-balance')}>Check Balance</p>
                    </div>
                    <div className={`${location.pathname === '/my-history' ? 'bg-indigo-100 w-[240px] cursor-pointer rounded text-blue-500' : ''} py-2 px-5 flex items-center gap-2`}>
                        <Clock8Icon size={20} />
                        <p onClick={() => navigation('/my-history')}>History</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2  hover:bg-indigo-100 w-[240px] cursor-pointer rounded hover:text-blue-500 py-2 px-5'>
                <User className='p-1 h-6 w-6 rounded-full bg-blue-300' />
                <p className=''>Logout</p>
                <LogOutIcon onClick={() => logoutFunction()} className='ml-20' size={20} />
            </div>
        </div>
    )
}

export default sidebar