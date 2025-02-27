export const getUserId = () => {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = `${Math.random().toString(36).substr(2, 9)}`; // ✅ 난수 생성
    localStorage.setItem("userId", userId);
  }

  return userId;
};
