import { IndianRupee, LoaderCircle, SendHorizonalIcon, SendIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useAppContext } from '../context/context'
import axios from '../axios.js'
import toast from 'react-hot-toast'

const trandsaction = () => {
  const { userAccounts } = useAppContext()
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [amount, setAmount] = useState()
  const [sending, setsending] = useState(false)
  const [sent, setSent] = useState(false)


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

  const handleSubmit = (e) => {
    e.preventDefault()
    createTransaction()
  }

  return (
    <div className='p-4 flex flex-col'>
      <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
        <div className='flex items-center gap-5'>
          <SendIcon className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2xl' />
          <div>
            <h1 className='text-2xl font-semibold'>Send Money</h1>
            <p>Transafer money securely to another account</p>
          </div>
        </div>
        <div className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
          <button>Send Money</button>
        </div>
      </div>
      <div className='mt-5 p-5 bg-gray-50 rounded'>
        <form action="" onSubmit={handleSubmit}>
          <div className='md:flex lg:flex gap-8 p-2'>
            <div className='flex flex-col'>
              <h1 className='text-xl font-semibold'>From Account</h1>
              <p className='text-sm text-gray-600'>Select the account you want to send money from</p>
              <div className='flex items-center justify-between bg-gray-200 rounded py-2 px-4 border border-gray-300 mt-4 w-80'>
                <select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required className='border-none w-full outline-none'>
                  <option value=''>Select account</option>
                  {userAccounts.map((account) => (
                    <option key={account._id} value={account._id}>
                      {account._id}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mt-6'>
                <h1 className='text-xl font-semibold'>To Account</h1>
                <p className='text-sm text-gray-600'>Select the account you want to send money to</p>
                <div className='flex items-center justify-between bg-gray-200 rounded py-2 px-4 mt-4 w-80 border border-gray-300'>
                  <input value={toAccount} onChange={(e) => setToAccount(e.target.value)} placeholder='Enter To Account Number' required className='w-full border-none outline-none' type="text" />
                </div>
              </div>
              
            </div>
            <div className='mt-4 md:mt-0 lg:mt-0 flex flex-col'>
              <h1 className='text-xl font-semibold'>Amount</h1>
              <p className='text-sm text-gray-600'>Enter the amount you want to transfer</p>
              <div className='flex items-center gap-2 w-80 rounded bg-gray-200 mt-4 border border-gray-300' >
                <div className='px-2 py-2 border-r border-gray-400'>
                  <IndianRupee size={20} />
                </div>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" required className='py-2 px-2 border-none outline-none' placeholder='EnterAmount' />
              </div>
            </div>
          </div>
          <div className='p-2 mt-2'>
          <button type='submit' className='flex w-80 items-center  bg-blue-500 gap-2 text-white py-2 px-4 justify-center'>
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
                        <SendHorizonalIcon size={20} />
                        <p>Send Money</p>
                      </>
                    )
                }
              </button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default trandsaction