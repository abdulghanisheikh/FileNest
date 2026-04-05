import axios from "axios";

let baseURL;
if(import.meta.env.VITE_ENVIRONMENT === "development") {
    baseURL = "http://localhost:3000"
} else {
    baseURL = import.meta.env.VITE_BASE_URL;
}

const api = new axios.create({
    baseURL,
    withCredentials: true
});

export const login = async({email, password}) => {
    const response = await api.post("/auth/login", {email, password});
    return response;
}

export const register = async({fullname, email, password}) => {
    const response = await api.post("/auth/register", {fullname, email, password});
    return response;
}

export const getMe = async() => {
    const response = await api.get("/auth/getMe");
    return response;
}

export const logout = async() => {
    const response = await api.post("/auth/logout");
    return response;
}