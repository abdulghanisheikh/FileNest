import axios from "axios";

let baseURL;
if (import.meta.env.VITE_ENVIRONMENT === "development") {
    baseURL = "http://localhost:3000"
} else {
    baseURL = import.meta.env.VITE_BASE_URL;
}

const api = new axios.create({
    baseURL,
    withCredentials: true
});

export const fetchDocs = async() => {
    const response = await api.get(`${baseURL}/file/get-docs`);
    return response;
}

export const deleteFile = async({filepath}) => {
    const response = await api.delete(`${baseURL}/file/delete?filepath=${filepath}`);
    return response;
}

export const uploadFile = async({file}) => {
    const formData = new FormData();
    formData.append("uploaded-file", file);

    const response = await api.post(`${baseURL}/user/upload`, formData);
    return response;
}