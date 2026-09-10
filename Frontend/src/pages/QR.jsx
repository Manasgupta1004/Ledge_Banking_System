import React from 'react'
import Navbar from '../components/navbar'
import { QrCodeIcon } from 'lucide-react'
import { useAppContext } from '../context/context'
import axios from '../axios.js'

const QR = () => {
  const { userAccounts, haveAAccounts, user } = useAppContext()
  
  return (
    <div className='p-4'>
      <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
          <div className='flex items-center gap-5'>
            <QrCodeIcon className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2xl' />
            <div>
              <h1 className='text-2xl font-semibold'>
                QR Code
              </h1>
              <p>
                Scan QR Code to recieve money in accounts
              </p>
            </div>
          </div>
          <div className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
            <button>
              Generate QR
            </button>
          </div>
        </div>
    </div>
  )
}

export default QR