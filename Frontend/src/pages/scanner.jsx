import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { toast } from 'react-hot-toast'
import { useAppContext } from '../context/context'
import axios from '../axios.js'
import { SwitchCamera, CheckCircleIcon, IndianRupee, SendHorizontalIcon, LoaderCircle } from 'lucide-react'

const scanner = () => {
  const [scannedData, setScannedData] = useState(null)
  const { userAccounts } = useAppContext()
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [amount, setAmount] = useState()
  const [names, setNames] = useState('')
  const [sending, setsending] = useState(false)
  const [sent, setSent] = useState(false)


  const getUserById = async (accountId) => {
    try {
      const { data } = await axios.post(`/api/account/getuserbyid/${accountId}`)
      if (data.success) {
        setNames(data.userName)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createTransaction = async () => {
    try {
      setsending(true)
      setSent(false)
      const idempotencyKey = crypto.randomUUID()
      const { data } = await axios.post('/api/transactions/create-transaction', {
        fromAccount, toAccount, amount, idempotencyKey
      })
      setsending(false)
      if (data.success) {
        setSent(true)
      }

    } catch (error) {
      setsending(false)
      toast.error(error.response?.data?.message || error.message)
    }
  }


  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader',
      {
        fps: 10,
        qrbox: {
          height: 250, width: 250
        }
      }
    )

    const onScanSuccess = (decodedText) => {
      console.log("Scanned QR:", decodedText)
      try {
        const qrData = JSON.parse(decodedText)
        console.log("Parsed QR Data:", qrData)

        if (qrData.type !== "ledgerx-account") {
          return toast.error('This is not a LedgerX account QR code. Please scan a valid LedgerX account QR code.')
        }

        if (!qrData.accountId) {
          return toast.error('Invalid LedgerX account QR code. Please scan a valid LedgerX account QR code.')
        }

        setScannedData(qrData)
        setToAccount(qrData.accountId)
        getUserById(qrData.accountId)
        scanner.clear()

      } catch (error) {
        return toast.error('Error parsing QR code. Please scan a valid LedgerX account QR code.')
      }
    }
    scanner.render(onScanSuccess)

    return () => {
      scanner.clear().catch(() => { })
    }

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    createTransaction()
  }

  return (
    <div className='p-4 flex flex-col w-full'>
      <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
        <div className='flex items-center gap-5'>
          <SwitchCamera className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2xl' />
          <div>
            <h1 className='text-2xl font-semibold'>Send Money</h1>
            <p>Scan a QR code to send money to another user</p>
          </div>
        </div>
        <div className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
          <button>Scan and Pay</button>
        </div>
      </div>
      <div className='mt-4 w-full bg-gray-50 rounded p-4'>
        <h1 className='text-2xl font-semibold'>
          Scan QR Code
        </h1>
        <p className='text-gray-500'>
          Scan a LedgerX account QR code
        </p>
        <div className='bg-white rounded-2xl shadow-sm p-6 mt-4 md:flex md:items-center md:gap-6'>
          <div id='reader' className='w-60 h-60'></div>
          {scannedData && (
            <div className='p-4 bg-green-50 border border-green-200 rounded-xl'>
              <div className='flex items-center gap-2 text-green-600 mb-3'>
                <CheckCircleIcon size={22} />
                <h2 className='font-semibold'>
                  QR Scanned Successfully
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='bg-white rounded-lg px-4 py-4'>
                  <div className='flex items-center justify-between bg-gray-100 rounded py-2 text-sm px-4 border border-gray-300 w-60'>
                    <select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required className='border-none w-full outline-none'>
                      <option value=''>Select account</option>
                      {userAccounts.map((account) => (
                        <option key={account._id} value={account._id}>
                          {account._id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='mt-4 flex'>
                    <p className='text-sm text-gray-500'>
                      Holder Name :
                    </p>
                    <p className='font-medium text-gray-800 break-all mt-1'>
                      {names}
                    </p>
                  </div>
                  <div className='mt-1 flex'>
                    <p className='text-sm text-gray-500'>
                      Account ID :
                    </p>
                    <p className='font-medium text-gray-800 break-all mt-1'>
                      {scannedData.accountId}
                    </p>
                  </div>
                  <div className='flex items-center gap-2 rounded bg-gray-200 mt-4 border w-60 text-sm border-gray-300' >
                    <div className='px-2 py-2 border-r border-gray-400'>
                      <IndianRupee size={20} />
                    </div>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" required className='py-2 px-2 border-none outline-none' placeholder='EnterAmount' />
                  </div>
                  <button type='submit' className='flex items-center mt-5 bg-blue-500 gap-2 w-full text-white py-2 px-4 justify-center'>
                    {
                      sent ?
                        (
                          <div className='flex items-center gap-2'>
                            <div className='w-6 h-6 rounded-full text-white flex items-center justify-center'>
                              ✓
                            </div>
                            <p>Sent Successfully</p>
                          </div>
                        ) :
                        sending ? (
                          <>
                            <LoaderCircle className='animate-spin' size={20} />
                            <p>Sending...</p>
                          </>
                        ) : (
                          <>
                            <SendHorizontalIcon size={20} />
                            <p>Send Money</p>
                          </>
                        )
                    }
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default scanner