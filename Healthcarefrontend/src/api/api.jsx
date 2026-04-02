import axios from "axios";

const BASE_URL = "http://localhost:8081";

const api = axios.create({
    baseURL: BASE_URL
});

// chatbot
export const sendMessage = (message) => {
    return api.post("/api/chat", {
        message,
        sessionId: localStorage.getItem("sessionId")
    });
};

// queue
export const addPatient = (email, token) => {
    return api.post("/queue/add", null, {
        params: { email, token }
    });
};

export default api;