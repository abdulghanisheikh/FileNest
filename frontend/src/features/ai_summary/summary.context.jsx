import { createContext, useState } from "react";

export const SummaryContext = createContext();

export const SummaryContextProvider = ({children}) => {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return <SummaryContext.Provider value={{summary, setSummary, loading, setLoading, error, setError}}>
        {children}
    </SummaryContext.Provider>
}