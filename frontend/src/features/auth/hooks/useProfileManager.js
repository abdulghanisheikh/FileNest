import { removeUserProfile, deleteAccount, uploadUserProfile } from "../services/profileManager.api.js";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useProfileManager = () => {
    const context = useContext(AuthContext);
    const {setUser, setLoading} = context;

    const navigate = useNavigate();

    const handleDeleteAccount = async() => {
        try {
            setLoading(true);

            const {data} = await deleteAccount();
            const {success} = data;

            if(success) {
                setUser(null);

                setTimeout(() => {
                    navigate('/login-page');
                }, 1500);
            }
        } catch(err) {
            console.log(err.message || "Error in deleting account");
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

            return data;
        } catch(err) {
            console.log(err.response?.data?.message || "Error in removing user profile");
        } finally {
            setLoading(false);
        }
    }

    const handleUploadUserProfile = async({file}) => {
        try {
            setLoading(true);
            const {data} = await uploadUserProfile({file});

            return data;
        } catch(err) {
            console.log(err.response?.data?.message || "Error in uploading user profile");
        } finally {
            setLoading(false);
        }
    }

    return {handleDeleteAccount, handleRemoveProfile, handleUploadUserProfile};
}