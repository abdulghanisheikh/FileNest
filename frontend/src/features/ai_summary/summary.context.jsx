import { createContext, useState } from "react";

export const SummaryContext = createContext();

export const SummaryContextProvider = ({children}) => {
    const [summaryData, setSummaryData] = useState({
        summary: "",
        docName: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return <SummaryContext.Provider value={{summaryData, setSummaryData, loading, setLoading, error, setError}}>
        {children}
    </SummaryContext.Provider>
}