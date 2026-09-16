import React from 'react'
import Navbar from '../components/navbar'
import { Clock, Watch } from 'lucide-react'
import { useAppContext } from '../context/context'

const history = () => {
   const { userAccounts, haveAAccounts, user } = useAppContext()
  return (
    <div className='p-4'>
      <div className='flex w-full items-center justify-between p-4 rounded bg-gray-50'>
        <div className='flex items-center gap-5'>
          <Clock className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2' />
          <div>
            <h1 className='text-2xl font-semibold'>Transaction History</h1>
            <p>View all your money in and out transaction</p>
          </div>
        </div>
        <div className='flex items-center px-4 py-2 rounded bg-blue-500 text-white gap-2'>
          <button>History</button>
        </div>
      </div>
      <div>
        {userAccounts.map((account, index)=>{
return (
  <div className='mt-4 rounded-t'></div>
)
        })}
      </div>
    </div>
  )
}

export default history