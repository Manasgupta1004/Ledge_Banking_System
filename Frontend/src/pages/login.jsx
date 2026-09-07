import React, { useState } from 'react'
import axios from '../axios.js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/context'

const login = () => {

    const [login, setLogin] = useState(false)
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate()

    const { setUser } = useAppContext()

    const formSubmitFunction = async (e) => {
        e.preventDefault()
        const url = login ? '/api/user/login' : '/api/user/register'

        try {
            const { data } = await axios.post(url, {
                name, email, password
            })
            if (data.success) {
                toast.success(data.message)
                navigate('/')

            } else {
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <form onSubmit={formSubmitFunction} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
                <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">{login ? 'Login' : 'Sign Up'}</h2>
                {!login && <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full outline-none bg-transparent py-2.5" type="text" placeholder="Username" required />
                </div>}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full outline-none bg-transparent py-2.5" type="email" placeholder="Email" required />
                </div>
                <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full outline-none bg-transparent py-2.5" type="password" placeholder="Password" required />
                </div>
                <button type='submit' className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">{login ? 'Login Account' : 'Create Account'}</button>
                <p className="text-center mt-4">{login ? 'Do not have an account?' : 'Already have an account?'}<a href={login ? '#login' : ''} onClick={() => setLogin(!login)} className="text-blue-500 underline">{login ? 'Sign Up' : 'Login'}</a></p>
            </form >
        </div >
    )
}
export default login