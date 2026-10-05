import React from 'react'
import QuickAction from '../components/quickAction'
const home = () => {
  return (
    <div className='h-full flex flex-col justify-between'>
        <QuickAction/>
        <footer className=' border-t bg-gray-50 px-6 py-6'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
                    <div>
                        <h2 className='text-lg font-semibold'>
                            Ledger<span className='text-blue-500'>X</span>
                        </h2>
                        <p className='text-sm text-gray-500 mt-1'>
                            Simple, secure and smart money management.
                        </p>
                    </div>
                    <div className='text-sm text-gray-500 text-center md:text-right'>
                        <p>© 2026 LedgerX. All rights reserved.</p>
                        <p className='mt-1'>
                            Secure payments made simple.
                        </p>
                    </div>
                </div>
            </footer>
    </div>
  )
}

export default home