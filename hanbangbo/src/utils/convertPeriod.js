export const calculatePeriod = (start, end) => {
  if (!start || !end) return null;

  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);

  // ✅ 개월 수 차이 계산
  const monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);

  // ✅ 1, 3, 6 중 가장 가까운 값으로 변환
  if (monthDiff <= 2) return 1;
  if (monthDiff <= 4) return 3;
  return 6;
};
