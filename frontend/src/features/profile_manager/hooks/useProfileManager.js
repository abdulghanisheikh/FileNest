import {deleteAccount, uploadUserProfile, removeUserProfile, getUserProfile} from "../services/profile_manager.api.js";
import { useContext } from "react";
import {ProfileManagerContext} from "../profile_manager.context.jsx";
import {useNavigate} from "react-router-dom";

export const useProfileManager = () => {
    const context = useContext(ProfileManagerContext);
    const {setProfile, setLoading} = context;

    const navigate = useNavigate();

    const handleDeleteAccount = async() => {
        try {
            setLoading(true);
            const {data} = await deleteAccount();

            const {success} = data;

            if(success) {
                setTimeout(() => {
                    navigate("/signup-page");
                }, 2000);
            }

            return data;
        } catch(err) {
            console.log(err?.response?.data?.message || "Account delete operation failed");
        } finally {
            setLoading(false);
        }
    }

    const handleUploadUserProfile = async({file}) => {
        try {
            setLoading(true);
            const {data} = await uploadUserProfile({file});

            const {success} = data;

            if(success) {
                handleGetUserProfile();
            }

            return data;
        } catch(err) {
            console.log(err?.response?.data?.message || "Profile upload failed");
        } finally {
            setLoading(false);
        }
    }

    const handleGetUserProfile = async() => {
        try {
            setLoading(true);

            const {data} = await getUserProfile();

            const {success, profileUrl} = data;

            if(success) {
                setProfile(profileUrl);
            }

            return data;
        } catch(err) {
            console.log(err?.response?.data?.message || "Profile upload failed");
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveUserProfile = async() => {
        try {
            const {data} = await removeUserProfile();

            const {success} = data;

            if(success) {
                setProfile("");
            }

            return data;
        } catch(err) {
            console.log(err?.response?.data?.message || "Profile upload failed");
        } finally {
            setLoading(false);
        }
    }

    return {handleDeleteAccount, handleUploadUserProfile, handleGetUserProfile, handleRemoveUserProfile};
}