import axios from "axios";

let baseURL = import.meta.env.VITE_ENV === "development" ?
    "http://localhost:3000" :
    import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL,
    withCredentials: true
});

export const fetchDocs = async() => {
    const response = await api.get('/file/get-docs');
    return response;
}

export const deleteFile = async(filepath) => {
    const response = await api.delete('/file/delete', {
        params: { filepath }
    });

    return response;
}

export const uploadFile = async({file}) => {
    const formData = new FormData();
    formData.append("uploaded-file", file);

    const response = await api.post('/user/upload', formData);
    return response;
}

export const fetchImages = async() => {
    const response = await api.get('/file/get-images');
    return response;
}

export const fetchMedia = async() => {
    const response = await api.get('/file/get-media');
    return response;
}

export const fetchOtherFiles = async() => {
    const response = await api.get('/file/get-others');
    return response;
}