import { removeUserProfile, deleteAccount, uploadUserProfile } from "../services/profileManager.api.js";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { toast } from "react-toastify";

export const useProfileManager = () => {
    const context = useContext(AuthContext);
    const {setUser, setLoading} = context;

    const handleDeleteAccount = async() => {
        try {
            setLoading(true);

            const {data} = await deleteAccount();
            const {success, message} = data;

            if(success) {
                toast.success(message, {autoClose: 1500});
                setUser(null);
            }
        } catch(err) {
            toast.error(err.message || "Error in deleting account");
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveProfile = async() => {
        try {
            setLoading(true);

            const {data} = await removeUserProfile();

            const {success, message} = data;

            if(success) {
                toast.success(message);
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in removing user profile");
        } finally {
            setLoading(false);
        }
    }

    const handleUploadUserProfile = async(file) => {
        try {
            setLoading(true);
            const {data} = await uploadUserProfile(file);

            const {success, message} = data;

            if(success) {
                toast.success(message);
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in uploading profile picture");
        } finally {
            setLoading(false);
        }
    }

    return {handleDeleteAccount, handleRemoveProfile, handleUploadUserProfile};
}