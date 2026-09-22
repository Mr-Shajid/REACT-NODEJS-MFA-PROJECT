import {createContext, useContext, useEffect } from "react";
import { useState } from "react";


const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        console.log("the useEffect runs: ", storedUser);
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        if (data) {
            setIsLoggedIn(false);
            setUser(null);
            sessionStorage.removeItem("user");
        }
    };

    return (
        <SessionContext.Provider value={{isLoggedIn, loading, user, login, logout}}>
            {children}
        </SessionContext.Provider>
    )
}