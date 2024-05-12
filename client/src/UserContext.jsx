import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {

    const [user, setUser] = useState(null);
    const [finalize, setFinalize] = useState(false);

    useEffect(() => {
        if (!user) {
            const {data} = axios.get('/profile').then(({data}) => {
                setUser(data)
                setFinalize(true)
            });
            
        }
    })

    return (
        <UserContext.Provider value={{user, setUser, finalize}}>
            {children}
        </UserContext.Provider>
    )
}