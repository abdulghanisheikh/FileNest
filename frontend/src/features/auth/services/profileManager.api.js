import axios from "axios";

let baseURL;
if(import.meta.env.VITE_ENV === "development") {
    baseURL = "http://localhost:3000"
} else {
    baseURL = import.meta.env.VITE_BASE_URL;
}

const api = axios.create({
    baseURL,
    withCredentials: true
});

export const removeUserProfile = async() => {
    const response = await api.delete("/user/removeProfile");
    return response;
}

export const deleteAccount = async() => {
    const response = await api.delete("/user/deleteAccount");
    return response;
}

export const uploadUserProfile = async(file) => {
    const formData = new FormData();
    formData.append("profile", file);

    const response = await api.post("/user/uploadProfile", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response;
}