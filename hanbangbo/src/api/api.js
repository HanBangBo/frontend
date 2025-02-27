import axios from "axios";

const BASE_URL = "http://backend_web:8000/api"; // ✅ 백엔드 API 주소 입력

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // ✅ 요청 제한 시간 설정 (5초)
});

// ✅ 요청 인터셉터 (요청 전 실행)
api.interceptors.request.use(
  (config) => {
    // 예: 토큰이 필요할 경우 설정 가능
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 (응답 후 실행)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 에러:", error.response);
    return Promise.reject(error);
  }
);

export default api;
