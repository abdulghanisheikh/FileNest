import { createContext, useState } from "react";

export const FileManagerContext = createContext();

export const FileManagerContextProvider = ({children}) => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);
    
    return <FileManagerContext.Provider value={{docs, setDocs, imageFiles, setImageFiles, loading, setLoading, error, setError, refresh, setRefresh, mediaFiles, setMediaFiles, otherFiles, setOtherFiles}}>
        {children}
    </FileManagerContext.Provider>
}