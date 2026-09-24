import React, { useEffect, useState } from 'react'
import { ArrowBigDown, ArrowDown, ArrowDown01, Clock, Landmark, MoveDown, Trash2 } from 'lucide-react'
import { useAppContext } from '../context/context'
import axios from '../axios.js'

const history = () => {
  const { userAccounts, user } = useAppContext()
  const [ledgers, setLedgers] = useState({})
  const [names, setNames] = useState({})

  const getUserById = async (accountId) => {
    try {
      const { data } = await axios.post(`/api/account/getuserbyid/${accountId}`)
      if (data.success) {
        setNames(prev => ({
          ...prev,
          [accountId]: data.userName
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getHistory = async (accountId) => {
    try {
      const { data } = await axios.get(`/api/transactions/get-ledger/${accountId}`)

      if (data.success) {

        setLedgers(prev => ({
          ...prev,
          [accountId]: data.ledger
        }))

        data.ledger.forEach(ledger => {

          const otherAccountId =
            ledger.type === 'credit'
              ? ledger.transaction.fromAccount
              : ledger.transaction.toAccount

          getUserById(otherAccountId)
        })
      }

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    if (userAccounts.length > 0) {
      userAccounts.forEach(account => {
        getHistory(account._id)
      })
    }
  }, [userAccounts])

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500'
  ]


  return (
    <div className='p-4'>
      <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
        <div className='flex items-center gap-5'>
          <Clock className='h-15 w-15 p-2 text-blue-400 bg-gray-100 rounded-2' />
          <div>
            <h1 className='text-2xl font-semibold'>Transaction History</h1>
            <p>View all your money in and out transaction</p>
          </div>
        </div>
        <div className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
          <button>History</button>
        </div>
      </div>
      <div className='bg-gray-100 px-4 py-2 mt-4'>
        {userAccounts.map((account, index) => {
          return (
            <div className='rounded-t flex justify-between bg-white rounded mt-4' key={index}>
              <div className='flex flex-col justify-between gap-5 px-4 rounded py-2 w-full'>
                <div className='flex items-center justify-between w-full gap-5 '>
                  <div className='flex items-center gap-5'>
                    <div className={`p-2 rounded-full ${colors[index % colors.length]}`}>
                      <Landmark className='text-white' size={20} />
                    </div>
                    <div>
                      <div>{user?.name}</div>
                      <div className='text-sm flex items-center gap-1'>
                        <p>Account No:</p>
                        <p>{account._id}</p>
                      </div>
                    </div>
                  </div>
                  <div className='px-4 py-2 rounded bg-blue-500 text-white'>View History</div>
                </div>
                <div className=''>
                  <div className='mt-4'>
                    <div className='text-xl text-gray-600 font-semibold'>
                      Transactions
                    </div>

                    <div className='mt-3 bg-gray-50 rounded px-6 py-3'>
                      {ledgers[account._id]?.length > 0 ? (
                        ledgers[account._id].map((ledger) => (
                          <div
                            key={ledger._id}
                            className='flex items-center justify-between border-b py-3'
                          >
                            <div className='flex items-center gap-3'>
                              <div
                                className={`h-10 w-10 flex items-center justify-center rounded-full ${ledger.type === 'credit'
                                  ? 'bg-green-100 text-green-500'
                                  : 'bg-red-100 text-red-500'
                                  }`}
                              >
                                <div className='text-2xl'>{ledger.type === 'credit' ? '↓' : '↑'}</div>
                              </div>

                              <div>
                                <p className='font-semibold capitalize'>
                                  {ledger.type}
                                </p>
                                <p>
                                  {ledger.type === 'credit' ? 'From' : 'To'}: {
                                    names[
                                    ledger.type === 'credit'
                                      ? ledger.transaction.fromAccount
                                      : ledger.transaction.toAccount
                                    ]
                                  }
                                </p>
                              </div>
                            </div>
                            <p className='text-sm text-gray-500'>
                              {new Date(ledger.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                            <p
                              className={`font-semibold ${ledger.type === 'credit'
                                ? 'text-green-500'
                                : 'text-red-500'
                                }`}
                            >
                              {ledger.type === 'credit' ? '+' : '-'} ₹{ledger.amount}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className='text-gray-500 py-4'>
                          No transactions found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default history