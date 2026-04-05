import {login, register, getMe} from "../service/auth.api.js";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const {setUser, setLoading, setError} = context;
    const navigate = useNavigate();
    
    const handleLogin = async({email, password}) => {
        try {
            setLoading(true);
            const {data} = await login({email, password});

            const {success, user, message} = data;

            if(success) {
                setUser(user);
                navigate("/dashboard");
            } else {
                setError(message);
            }
        } catch(err) {
            setError(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async({fullname, email, password}) => {
        try {
            setLoading(true);
            const {data} = await register({fullname, email, password});

            const {success, user, message} = data;

            if(success) {
                setUser(user);
                navigate("/dashboard");
            } else {
                setError(message);
            }
        } catch(err) {
            setError(err?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async() => {
        try {
            setLoading(true);
            const {data} = await getMe();

            const {success, user, message} = data;
            if(success) {
                setUser(user);
            } else {
                setError(message);
            }
        } catch(err) {
            setError(err?.response?.data?.message || "Get me failed");
        } finally {
            setLoading(false);
        }
    }

    return {handleLogin, handleRegister, handleGetMe};
}