import { getSummary } from "../services/summary.api";
import { SummaryContext } from "../summary.context";
import { useContext } from "react";

export const useSummary = () => {
    const context = useContext(SummaryContext);
    const {setSummary, setLoading, setError} = context;

    const handleGetSummary = async(filepath) => {
        try {
            setLoading(true);
            
            const {data} = await getSummary(filepath);

            const {success, summary} = data;

            if(success) {
                setSummary(summary);
            }

            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "summary generation failed");
        } finally {
            setLoading(false);
        }
    }

    return {handleGetSummary};
}