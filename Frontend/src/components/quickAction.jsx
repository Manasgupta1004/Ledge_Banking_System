import { Plus, Send, WalletCards, Scan, QrCode, Wallet, Clock8, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const quickAction = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            title: 'Add Deposit',
            description: 'Add money to account',
            icon: Plus,
            color: 'text-green-400',
            bgColor: 'bg-green-100',
            path: '/add-deposit'
        },
        {
            title: 'Accounts',
            description: 'Account Details',
            icon: WalletCards,
            color: 'text-orange-400',
            bgColor: 'bg-orange-100',
            path: '/my-accounts'
        },
        {
            title: 'Scan QR',
            description: 'Scan and pay easily',
            icon: Scan,
            color: 'text-blue-400',
            bgColor: 'bg-blue-100',
            path: '/my-scanner'
        },
        {
            title: 'Send Money',
            description: 'Send money to another user',
            icon: Send,
            color: 'text-blue-400',
            bgColor: 'bg-blue-100',
            path: '/send-money'
        },
        {
            title: 'My QR Code',
            description: 'View your QR code',
            icon: QrCode,
            color: 'text-purple-400',
            bgColor: 'bg-purple-100',
            path: '/my-qr'
        },
        {
            title: 'Check Balance',
            description: 'View your balance',
            icon: Wallet,
            color: 'text-green-400',
            bgColor: 'bg-green-100',
            path: '/my-balance'
        },
        {
            title: 'History',
            description: 'View Transactions',
            icon: Clock8,
            color: 'text-purple-400',
            bgColor: 'bg-purple-100',
            path: '/my-history'
        },
    ]

    return (
        <div className='flex flex-col justify-between'>
            <div className='mt-4 p-4'>
                <h1 className='text-2xl font-semibold text-gray-600'>Quick Action</h1>
                <div className='flex flex-col md:flex-row md:flex-wrap gap-6 mt-4'>
                    {
                        quickActions.map((action, index) => (
                            <div key={index} onClick={() => navigate(action.path)} className='flex cursor-pointer items-center justify-between p-4 mt-4 bg-gray-50 rounded'>
                                <div className='flex items-center gap-4'>
                                    <action.icon className={`w-6 h-6 ${action.color}`} />
                                    <div>
                                        <h2 className='text-lg font-medium text-gray-800'>{action.title}</h2>
                                        <p className='text-sm text-gray-500'>{action.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default quickAction