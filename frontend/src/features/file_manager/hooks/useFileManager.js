import { fetchDocs, deleteFile, uploadFile, fetchImages, fetchMedia, fetchOtherFiles } from "../services/file_manager.api";
import { useContext } from "react";
import { FileManagerContext } from "../file_manager.context";

export const useFileManager = () => {
    const context = useContext(FileManagerContext);

    const {setDocs, setLoading, setError, setImageFiles, setRefresh, setMediaFiles, setOtherFiles} = context;

    const handleFetchDocs = async() => {
        try {
            setLoading("documents");
            const {data} = await fetchDocs();
            const {success, files} = data;

            if(success) {
                setDocs(files);
            }

            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "Docs fetch failed");
        } finally {
            setLoading("");
        }
    }

    const handleFileDelete = async({filepath}) => {
        try {
            setLoading("delete");
            const {data} = await deleteFile({filepath});
            const {success} = data;

            if(success) {
                setRefresh(true);
            }
            
            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "Delete operation failed");

            return {success: false, message: err?.response?.data?.message || "Delete operation failed"};
        } finally {
            setLoading("");
        }
    }

    const handleUploadFile = async({file}) => {
        try {
            setLoading("upload");
            const {data} = await uploadFile({file});

            const {success} = data;

            if(success) {
                setRefresh(true);
            }

            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "File upload failed");
        } finally {
            setLoading("");
        }
    }

    const handleFetchImages = async() => {
        try {
            setLoading("images");
            
            const {data} = await fetchImages();

            const {success, images} = data;

            if(success) {
                setImageFiles(images);
            }
            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "Images fetch failed");
        } finally {
            setLoading("");
        }
    }
     
    const handleFetchMedia = async() => {
        try {
            setLoading("media");

            const {data} = await fetchMedia();

            const {success, media} = data;

            if(success) {
                setMediaFiles(media);
            }

            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "Media fetch failed");
        } finally {
            setLoading("");
        }
    }

    const handleFetchOtherFiles = async() => {
        try {
            setLoading("others");
            const {data} = await fetchOtherFiles();

            const {success, others} = data;

            if(success) {
                setOtherFiles(others);
            }

            return data;
        } catch(err) {
            setError(err?.response?.data?.message || "Other file fetched failed");
        } finally {
            setLoading("");
        }
    }

    return {handleFetchDocs, handleFileDelete, handleUploadFile, handleFetchImages, handleFetchMedia, handleFetchOtherFiles};
}