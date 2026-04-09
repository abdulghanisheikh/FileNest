import { fetchDocs, deleteFile, uploadFile } from "../service/file_manager.api";
import { useContext } from "react";
import { FileManagerContext } from "../file_manager.context";

export const useFileManager = () => {
    const context = useContext(FileManagerContext);

    const {setDocs, setLoading, setError, setRefresh} = context;

    const handleFetchDocs = async() => {
        try {
            setLoading(true);
            const {data} = await fetchDocs();
            const {success, files} = data;

            if(success) {
                setDocs(files);
            }

            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "Docs fetch failed");
        } finally {
            setLoading(false);
        }
    }

    const handleFileDelete = async({filepath}) => {
        try {
            setLoading(true);
            const {data} = await deleteFile({filepath});
            
            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "Delete operation failed");
        } finally {
            setLoading(false);
        }
    }

    const handleUploadFile = async({file}) => {
        try {
            setLoading(true);
            const {data} = await uploadFile({file});

            const {success} = data;

            if(success) {
                setRefresh(true);
            }

            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "File upload failed");
        } finally {
            setLoading(false);
        }
    }

    return {handleFetchDocs, handleFileDelete, handleUploadFile};
}