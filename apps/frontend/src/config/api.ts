const API_BASE_URL = process.env.API_URL || "http://localhost:3001/api";

const API_ENDPOINTS = {
  FACILITIES: `${API_BASE_URL}/facilities`,
};

export default API_ENDPOINTS;
