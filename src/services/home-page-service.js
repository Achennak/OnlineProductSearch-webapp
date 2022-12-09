import { axiosRequest } from './utils/axios';
const API_BASE = "http://localhost:4000/api";


export const getAllProperties = async (userID) => {
    const response = await axiosRequest.get(`${API_BASE}/products?user=${userID}`);
    const properties = response.data;
    console.log("from server products "+properties)
    return properties;
}

export const getAllProducts = async (userID, categoryName) => {
    console.log(categoryName);
    const response = await axiosRequest.get(
        `${API_BASE}/products`, {
            params: {
                user: userID,
                category: categoryName
            }
    });
    const properties = response.data;
    return properties;
}

export const createProduct = async (product) => {
    const response = await axiosRequest.post(
        `${API_BASE}/products`, product,
        {
            'Content-Type': 'multipart/form-data'
        });
    const properties = response.data;
    return properties;
}


