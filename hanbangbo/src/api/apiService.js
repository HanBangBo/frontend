import api from "./api";

// ✅ 데이터 가져오기 (GET)
export const fetchNewsData = async () => {
  try {
    const response = await api.get("/news");
    return response.data;
  } catch (error) {
    console.error("뉴스 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// ✅ 데이터 전송 (POST)
export const submitQuizAnswer = async (quizId, answer) => {
  try {
    const response = await api.post(`/quiz/${quizId}/submit`, { answer });
    return response.data;
  } catch (error) {
    console.error("퀴즈 답안을 제출하는 중 오류 발생:", error);
    throw error;
  }
};
