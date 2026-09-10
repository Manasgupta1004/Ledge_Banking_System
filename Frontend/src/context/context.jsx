import { createContext, useContext, useState } from "react";
import axios from '../axios.js'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userAccounts, setUserAccount] = useState([])
    const [haveAAccounts, setHaveAAccounts] = useState(true)
    const navigate = useNavigate()

    const logoutFunctionContext = () => {
        setUser(null);
    };


    const value = {
        user,
        logoutFunctionContext,
        setUser,
        userAccounts,
        setUserAccount,
        haveAAccounts
    }

    const getCurrentUser = async () => {
        try {
            const { data } = await axios.get(
                "/api/user/getCurrentUser",
                {
                    withCredentials: true
                })

            if (data.success) {
                setUser(data.user);
            }

        } catch (error) {
            console.log(error);
            setUser(null);
        }
    }

    const getCurrentAccounts = async () => {
        try {
            const { data } = await axios.get('/api/account/get-accounts', {
                withCredentials: true
            })
            if (data.success) {
                setUserAccount(data.account)
                if (data.success) {
                    setUserAccount(data.account);

                    if (data.account.length > 0) {
                        setHaveAAccounts(false);
                    } else {
                        setHaveAAccounts(true);
                    }
                    console.log('Accounts:', data.account)
                }
            }

        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/signup');
            } else {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    }

    useEffect(() => {
        getCurrentUser();
        getCurrentAccounts()
    }, []);
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

