// src/services/GenericService.js
import axios from "axios";

// Set Base URL from environment or config file
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://api.example.com";

const Server = {
    get: async (endpoint, params = {}) => {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
            return response.data;
        } catch (error) {
            console.error("GET Error:", error);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await axios.post(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error("POST Error:", error);
            throw error;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await axios.put(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error("PUT Error:", error);
            throw error;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await axios.delete(`${BASE_URL}${endpoint}`);
            return response.data;
        } catch (error) {
            console.error("DELETE Error:", error);
            throw error;
        }
    },

    patch: async (endpoint, data) => {
        try {
            const response = await axios.patch(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error("PATCH Error:", error);
            throw error;
        }
    }
};

export default Server;
