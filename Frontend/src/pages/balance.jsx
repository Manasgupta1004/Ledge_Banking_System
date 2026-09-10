import React, { useState } from 'react'
import { Landmark, Wallet, Eye, LoaderCircle, IndianRupee } from 'lucide-react'
import NoAccount from '../components/noaccountscreen'
import { useAppContext } from '../context/context'
import axios from '../axios.js'

const Balance = () => {

  const { userAccounts, haveAAccounts, user } = useAppContext()

  const [checkingAccountId, setCheckingAccountId] = useState(null)
  const [balances, setBalances] = useState({})

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500'
  ]

  // Check balance of particular account
  const checkBalance = async (accountId) => {
    try {
      setCheckingAccountId(accountId)
      const { data } = await axios.get(
        `/api/account/get-balance/${accountId}`
      )
      if (data.success) {
        setBalances(prev => ({
          ...prev,
          [accountId]: data.balance
        }))
      }
    } catch (error) {
      console.log('CHECK BALANCE ERROR:', error)
    } finally {
      setCheckingAccountId(null)
    }
  }

  return (
    <div className='w-full flex flex-col'>
      <div className='p-4 flex flex-col items-center justify-center'>
        {/* Header */}
        <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
          <div className='flex items-center gap-5'>
            <Wallet className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2xl' />
            <div>
              <h1 className='text-2xl font-semibold'>
                Balance
              </h1>
              <p>
                Check Your Available Balance
              </p>
            </div>
          </div>
          <div className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
            <button>
              Check Balance
            </button>
          </div>
        </div>
        {/* No Account */}
        {haveAAccounts ? (
          <NoAccount />
        ) : (
          /* Accounts Container */
          <div className='w-full mt-5 px-12 bg-gray-100 rounded p-3'>
            {/* Account Header */}
            <div className='w-full flex items-center justify-between'>
              <h1 className='text-2xl font-semibold text-slate-600'>
                Your Accounts
              </h1>
              <div className='bg-blue-100 rounded text-blue-500 flex items-center gap-1.5 p-2'>
                <Wallet size={20} />
                Balance
              </div>
            </div>
            {/* Accounts List */}
            <div className='mt-4'>
              {userAccounts.map((account, index) => (
                <div className='flex justify-between bg-white rounded px-4 mt-2'
                  key={account._id}>
                  {/* Left Side */}
                  <div className='flex justify-between gap-5 px-4 py-2'>
                    <div className='flex items-center gap-5 mt-4'>
                      {/* Account Icon */}
                      <div className={`p-2 rounded-full ${colors[index % colors.length]}`}>
                        <Landmark className='text-white' size={20} />
                      </div>
                      {/* Account Details */}
                      <div>
                        <div className='font-semibold'>
                          {user?.name}
                        </div>
                        <div className='text-sm flex items-center gap-1'>
                          <p>
                            Account No:
                          </p>
                          <p>
                            {account._id}
                          </p>
                        </div>
                        <div className='text-xs text-gray-500'>Created:
                          {' '}
                          {new Date(account.createdAt).toLocaleDateString(
                            'en-IN',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right Side */}
                  <div className='flex items-center justify-center'>
                    {/* Loading */}
                    {checkingAccountId === account._id ? (
                      <div className='flex items-center gap-2 bg-blue-100 text-blue-500 p-2 rounded'>
                        <LoaderCircle size={20} className='animate-spin' />
                        <p>
                          Checking...
                        </p>
                      </div>
                    ) : balances[account._id] !== undefined ? (
                      /* Balance Show */
                      <div className='flex items-center gap-1 text-xl font-semibold text-green-700'>
                        <IndianRupee size={20} />
                        <span>
                          {balances[account._id]}
                        </span>
                      </div>
                    ) : (
                      /* Check Balance Button */
                      <div
                        onClick={() => checkBalance(account._id)}
                        className='flex items-center gap-1 bg-blue-100 text-blue-500 p-2 rounded cursor-pointer hover:bg-blue-200 '>
                        <Eye size={20} />
                        <p>
                          Check Balance
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='mt-35 text-center'>
          <h1 className='text-xl'>
            Your money. Your accounts. Your control.
          </h1>
          <p className='text-sm'>
            LedgerX keeps your finances simple, organized, and easy to manage.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Balance