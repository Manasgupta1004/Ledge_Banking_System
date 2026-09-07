import React from 'react'
import {Scan} from 'lucide-react'

const accounts = () => {
  return (
    <div className='p-4'>
      <div className='flex items-center p-4 bg-gray-50'>
        <Scan className='h-15 w-15 p-2 text-blue-400 bg-blue-100 rounded-2xl'/>
        <div>
         <h1 className='text-2xl font-semibold'> Accounts</h1>
         <p>Manage Your Bank accounst, card and more</p>
        </div>
      </div>
    </div>
  )
}

export default accounts