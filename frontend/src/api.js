
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_URL}/upload`, formData);
  return res.data;
};

export const askQuestion = async (question) => {
  const formData = new FormData();
  formData.append("question", question);

  const res = await axios.post(`${API_URL}/ask`, formData);
  return res.data;
};