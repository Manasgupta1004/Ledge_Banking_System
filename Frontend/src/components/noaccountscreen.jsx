import { Landmark } from 'lucide-react'
import React from 'react'

const noaccountscreen = () => {
    return (
        <div className='flex flex-col items-between p-2 mt-20 gap-3'>
            <div className=' gap-3 flex flex-col items-center justify-center'>
                <Landmark size={80} className='text-gray-400' />
                <div>
                    <h1 className='text-2xl font-bold'>No Accounts Yet</h1>
                    <p className='text-sm'>You haven't added any accounts yet. Add your first account to start managing your finances.</p>
                </div>
            </div>
        </div>
    )
}

export default noaccountscreen