import React, { useState } from 'react'
import { Landmark, LoaderCircle, QrCodeIcon } from 'lucide-react'
import { useAppContext } from '../context/context'
import NoAccount from '../components/noaccountscreen.jsx'
import axios from '../axios.js'

const QR = () => {
  const { userAccounts, haveAAccounts, user } = useAppContext()
  const [qrImages, setQrImages] = useState({})
  const [generatingAccounts, setGeneratingAccounts] = useState({})

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500'
  ]

  const GenarateQR = async (accountId) => {
    try {
      setGeneratingAccounts(prev => ({
        ...prev,
        [accountId]: true
      }))

      const { data, status } = await axios.post(`/api/account/QR/${accountId}`)
      console.log(data)
      console.log(status)

      if (data.success) {
        setQrImages(prev => ({
          ...prev,
          [accountId]: data.QRmodel.qrImageURL
        }))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setGeneratingAccounts(prev => ({
        ...prev,
        [accountId]: false
      }))
    }
  }

  return (
    <div className='p-4'>
      <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
        <div className='flex items-center gap-5'>
          <QrCodeIcon className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2' />
          <div>
            <h1 className='text-2xl font-semibold'>QR Code</h1>
            <p>Scan QR Code to receive money in accounts</p>
          </div>
        </div>
        <div className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
          <button>Generate QR</button>
        </div>
      </div>

      {haveAAccounts ? (
        <NoAccount />
      ) : (
        <div className='w-full mt-5 px-12 bg-gray-100 rounded p-3'>
          <div className='w-full flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-slate-600'>Your Accounts</h1>
            <div className='bg-blue-100 rounded text-blue-500 flex items-center gap-1.5 p-2'>
              <QrCodeIcon size={20} />
              Accounts
            </div>
          </div>

          <div className='mt-4'>
            {userAccounts.map((account, index) => (
              <div
                className='flex justify-between bg-white rounded px-4 mt-2'
                key={account._id}
              >
                <div className='flex justify-between gap-5 px-4 py-2'>
                  <div className='flex items-center gap-5 mt-4'>
                    <div className={`p-2 rounded-full ${colors[index % colors.length]}`}>
                      <Landmark className='text-white' size={20} />
                    </div>

                    <div>
                      <div className='font-semibold'>{user?.name}</div>

                      <div className='text-sm flex items-center gap-1'>
                        <p>Account No:</p>
                        <p>{account._id}</p>
                      </div>

                      <div className='text-xs text-gray-500'>
                        Created At:{' '}
                        {new Date(account.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {generatingAccounts[account._id] ? (
                  <div className='flex items-center'>
                    <div className='flex items-center gap-2 bg-blue-100 text-blue-500 rounded px-4 py-2'>
                      <LoaderCircle size={20} className='animate-spin' />
                      <p>Generating...</p>
                    </div>
                  </div>
                ) : qrImages[account._id] ? (
                  <div className='p-4 bg-white flex items-center justify-center'>
                    <img
                      src={qrImages[account._id]}
                      alt='QR Code'
                      className='h-40 w-40 object-contain'
                    />
                  </div>
                ) : (
                  <div
                    className='flex items-center gap-2'
                  >
                    <div onClick={() => GenarateQR(account._id)} className='flex items-center gap-2 bg-blue-100 py-2 text-blue-500 px-4 rounded cursor-pointer hover:bg-blue-200'>
                      <QrCodeIcon size={20} />
                      <p>Generate QR</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default QR