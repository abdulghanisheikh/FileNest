import { useState, createContext } from "react";

export const ProfileManagerContext = createContext();

export const ProfileManagerContextProvider = ({children}) => {
    const [profile, setProfile] = useState("");
    const [loading, setLoading] = useState(false);

    return <ProfileManagerContext.Provider value={{profile, setProfile, loading, setLoading}}>
        {children}
    </ProfileManagerContext.Provider>
}