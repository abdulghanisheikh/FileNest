import {login, register, getMe, logout} from "../services/auth.api.js";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { toast } from "react-toastify";

export const useAuth = () => {

    const context = useContext(AuthContext);
    const {setUser, setLoading, setError} = context;
    
    const handleLogin = async({email, password}) => {
        try {
            setLoading("login");
            const {data} = await login({email, password});

            const {success, user, message} = data;

            if(success) {
                toast.success(message, {
                    autoClose: 1000
                });
                
                setTimeout(() => {
                    setUser(user);
                }, 1000);
            }
            
            return data;
        } catch(err) {
            toast.error(err?.response?.data?.message || "Error in Logging-In user");
        } finally {
            setLoading("");
        }
    }

    const handleRegister = async({fullname, email, password}) => {
        try {
            setLoading("register");
            const {data} = await register({fullname, email, password});

            const {success, user, message} = data;

            if(success) {
                setUser(user);
                toast.success(message);
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in registering user");
        } finally {
            setLoading("");
        }
    }

    const handleGetMe = async() => {
        try {
            const {data} = await getMe();

            const {success, user} = data;

            if(success) {
                setUser(user);
            }
        } catch(err) {
            setError(err?.response?.data?.message || "Error in getting user data");
        }
    }

    const handleLogout = async() => {
        try {
            setLoading("logout");
            const {data} = await logout();

            const {success, message} = data;

            if(success) {                
                toast.success(message, {
                    autoClose: 1500
                });

                setUser(null);
            }

            return data;
        } catch(err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading("");
        }
    }

    return {handleLogin, handleRegister, handleGetMe, handleLogout};
}