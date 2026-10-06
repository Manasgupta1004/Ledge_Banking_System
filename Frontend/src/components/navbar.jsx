import { PanelLeftIcon, PanelLeftOpen } from 'lucide-react'
import React from 'react'
import { useContext } from "react";
import { AppContext } from "../context/context";


const navbar = ({ showSidebar, setShowSidebar }) => {
    const { user } = useContext(AppContext);
    return (
        <div className={`w-full flex items-center ${showSidebar ? 'justify-end' : 'justify-between'} bg-gray-100 border-b border-b-gray-400 px-4 md:px-12 py-2`}>
            {
                !showSidebar && (
                    <div className='md:hidden lg:hidden'>
                        <PanelLeftOpen onClick={() => setShowSidebar(true)} size={20} />
                    </div>
                )
            }
            <div className='flex items-center gap-2'>
                <p className='text-xl h-8 w-8 rounded-full bg-purple-400 text-white flex items-center justify-center'>{user?.name?.charAt(0).toUpperCase() || 'U'}</p>
                <p>{user?.name || 'User'}</p>
            </div>
        </div>
    )
}

export default navbar