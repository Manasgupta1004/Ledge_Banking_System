import React, { useState } from 'react'
import { Plus, WalletCards, Landmark, Trash2 } from 'lucide-react'
import NoAccount from '../components/noaccountscreen'
import { useAppContext } from '../context/context'
import axios from '../axios.js'
import { toast } from 'react-hot-toast'

const accounts = () => {

  const { userAccounts, haveAAccounts, user } = useAppContext()

  const createAccount = async () => {
    try {
      await axios.post('/api/account/create-account')
      toast('Account Created')
    } catch (error) {
      console.log(error.message)
    }
  }
  const deleteAccount = async (accountId) => {
    try {
      const { data } = await axios.post(`/api/account/delete/${accountId}`)
      if (data.success) {
        toast('Account Deleted')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500'
  ]

  return (
    <div className='w-full flex flex-col'>
      <div className='p-4 flex flex-col items-center justify-center'>
        <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
          <div className='flex items-center gap-5'>
            <WalletCards className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2xl' />
            <div>
              <h1 className='text-2xl font-semibold'> Accounts</h1>
              <p>Manage Your Bank accounts, card and more</p>
            </div>
          </div>
          <div onClick={() => createAccount()} className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
            <Plus />
            <button>Create New</button>
          </div>
        </div>
        {haveAAccounts ? <NoAccount /> :
          <div className='w-full mt-5 px-12 bg-gray-100 rounded p-3'>
            <div className='w-full flex items-center justify-between'>
              <h1 className='text-2xl font-semibold text-slate-600'>Your Accounts</h1>
              <div className='bg-blue-100 rounded text-blue-500 flex items-center gap-1.5 p-2'>
                <WalletCards size={20} />
                Accounts
              </div>
            </div>
            <div className='mt-4'>
              {userAccounts.map((accounts, index) => {
                return (
                  <div className=' flex justify-between bg-white rounded px-4 mt-2' key={index}>
                    <div className='flex justify-between gap-5 px-4 py-2'>
                      <div className='flex items-center gap-5 mt-4'>
                        <div className={`p-2 rounded-full ${colors[index % colors.length]}`}>
                          <Landmark className='text-white' size={20} />
                        </div>
                        <div>
                          <div>{user?.name}</div>
                          <div className='text-sm flex items-center gap-1'>
                            <p>Account No:</p>
                            <p>{accounts._id}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-end gap-4 pt-3'>
                      <Trash2 onClick={() => deleteAccount(accounts._id)} className='text-red-500' size={15} />
                      <div className='flex items-center gap-1 text-sm text-gray-500'>
                        <p>Created At:</p>
                        <p>{new Date(accounts.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }
        <div className='mt-35'>
          <h1 className='text-xl'>Your money. Your accounts. Your control.</h1>
          <p className='text-sm'>LedgerX keeps your finances simple, organized, and easy to manage.</p>
        </div>
      </div>
    </div>
  )
}

export default accounts