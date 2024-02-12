import { createContext, useEffect, useState , useContext} from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        chrome.storage.local.get(["user"])
        .then(data => {
            if (data.user) {
                setUser(JSON.parse(data.user))
            }
        })
    },[])

    const logOutUser = () => {
        setUser(null)
        chrome.storage.local.remove(['user'])
        chrome.tabs.reload();
    }

    return (
        <AuthContext.Provider value={{user, logOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
};