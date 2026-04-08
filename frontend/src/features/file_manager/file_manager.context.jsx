import { createContext, useState } from "react";

export const FileManagerContext = createContext();

export const FileManagerContextProvider = ({children}) => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    
    return <FileManagerContext.Provider value={{docs, setDocs, loading, setLoading, error, setError, refresh, setRefresh}}>
        {children}
    </FileManagerContext.Provider>
}