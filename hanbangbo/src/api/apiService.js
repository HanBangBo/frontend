import { calculatePeriod } from "../utils/convertPeriod";
import { getUserId } from "../utils/userId";
import api from "./api";

let cachedUserId = null; // 전역 변수로 userId 캐싱
const getCachedUserId = () => {
  if (!cachedUserId) {
    cachedUserId = getUserId();
  }
  return cachedUserId;
};

// ✅ 데이터 가져오기 (GET)
export const fetchQuestions = async (
  quizType,
  source,
  startPeriod,
  endPeriod
) => {
  try {
    const period = calculatePeriod(startPeriod, endPeriod); // ✅ 기간 변환
    if (!period) throw new Error("기간이 유효하지 않습니다.");

    const requestBody = {
      user: getCachedUserId(),
      type_value: quizType,
      source_value: source,
      period,
    };

    const response = await api.post("/save_user_choice", requestBody);
    return response.data;
  } catch (error) {
    console.error("❌ 문제 요청 실패:", error);
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
