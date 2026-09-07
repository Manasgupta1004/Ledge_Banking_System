import { createContext, useContext, useState } from "react";
import axios from '../axios.js'
import { useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const logoutFunctionContext = () => {
        setUser(null);
    };


    const value = {
        user,
        logoutFunctionContext,
        setUser
    }

    const getCurrentUser = async () => {
        try {
            const { data } = await axios.get(
                "/api/user/getCurrentUser",
                {
                    withCredentials: true
                }
            );
            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            setUser(null);
        }
    }
    useEffect(() => {
        getCurrentUser();
    }, []);
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

