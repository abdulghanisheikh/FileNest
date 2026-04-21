import axios from "axios";

let baseURL;
if(import.meta.env.VITE_ENVIRONMENT === "development") {
    baseURL = "http://localhost:3000";
} else {
    baseURL = import.meta.env.VITE_BASE_URL;
}

const api = new axios.create({
    baseURL,
    withCredentials: true
});

export const getSummary = async(filepath) => {
    const response = await api.get(`${baseURL}/summarize?filepath=${filepath}`);
    return response;
}