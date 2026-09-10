import { Banknote, Clock8Icon, LucideHome, Scan, ScanBox, ScanQrCode, Wallet, Wallet2, Wallet2Icon, WalletCards } from 'lucide-react'
import React from 'react'

const quickAction = () => {
  return (
    <div>
        <div className='mt-4 p-4'>
            <h1 className='text-2xl font-semibold text-gray-600'>Quick Action</h1>
            <div className='mt-4 sm:flex gap-3'>
                <div className='bg-gray-50 rounded mt-2 p-4 w-45 '>
                    <Scan className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2xl'/>
                    <h1 className='text-xl font semibold mt-2'>Scan QR</h1>
                    <p className='text-sm mt-2'>Scan and pay easily</p>
                </div>
                <div className='bg-gray-50 rounded mt-2 p-4 w-45 '>
                    <Wallet className='h-15 w-15 p-2 text-green-400 bg-green-100 rounded-2xl'/>
                    <h1 className='text-xl font semibold mt-2'>Check Balance</h1>
                    <p className='text-sm mt-2'>view your balance</p>
                </div>
                <div className='bg-gray-50 rounded mt-2 p-4 w-45 '>
                    <WalletCards className='h-15 w-15 p-2 text-orange-400 bg-orange-100 rounded-2xl'/>
                    <h1 className='text-xl font semibold mt-2'>Accounts</h1>
                    <p className='text-sm mt-2'>Account Detials</p>
                </div>
                <div className='bg-gray-50 rounded mt-2 p-4 w-45'>
                    <Clock8Icon className='h-15 w-15 p-2 text-purple-400 bg-purple-100 rounded-2xl'/>
                    <h1 className='text-xl font semibold mt-2'>History</h1>
                    <p className='text-sm mt-2'>view Transactions</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default quickAction