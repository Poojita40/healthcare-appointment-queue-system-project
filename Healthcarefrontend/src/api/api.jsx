import axios from "axios";

// ✅ CHANGE THIS (IMPORTANT)
const BASE_URL = "https://healthcare-backend-api-vnfk.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

// chatbot
export const sendMessage = (message) => {
  return api.post("/api/chat", {
    message,
    sessionId: localStorage.getItem("sessionId"),
  });
};

// queue (email + token)
export const addPatient = (email, token) => {
  return api.post("/api/queue/add", null, {
    params: { email, token },
  });
};

export default a