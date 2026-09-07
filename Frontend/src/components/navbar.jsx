import { User } from 'lucide-react'
import React from 'react'
import { useContext } from "react";
import { AppContext } from "../context/context";


const navbar = () => {
    const { user } = useContext(AppContext);
    return (
        <div className=' w-full h-15 px-12 gap-2 flex items-center justify-end border-b border-b-gray-400 bg-gray-100'>
            <p className=' text-xl h-8 w-8 rounded-full bg-purple-400 text-white flex items-center justify-center'>{user?.name?.charAt(0).toUpperCase() || 'U'}</p>
            <p>{user?.name || 'User'}</p>
        </div>
    )
}

export default navbar