// Packing 저장소 원문에서 발췌 (들여쓰기만 정리, 생략 구간은 // ... 로 표시)

export const targetsSnippet = `
const CONTENT_TYPE_TARGETS = [
  { contentTypeId: 12, name: "관광지", targetCount: 40 },
  { contentTypeId: 14, name: "문화시설", targetCount: 25 },
  { contentTypeId: 39, name: "음식점", targetCount: 25 },
  { contentTypeId: 28, name: "레포츠", targetCount: 10 },
];
// ...
function hasRequiredListFields(item) {
  const imageUrl = item?.firstimage || item?.firstimage2;

  return Boolean(
    item?.addr1 &&
      imageUrl &&
      item?.mapx &&
      item?.mapy,
  );
}
`;

export const pagesSnippet = `
function selectDistributedPages(totalPages, pageLimit = MAX_PAGES) {
  if (!Number.isInteger(totalPages) || totalPages <= 0) return [];

  if (pageLimit === 0 || pageLimit >= totalPages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (pageLimit === 1) {
    return [Math.ceil(totalPages / 2)];
  }

  const selectedPages = new Set();

  for (let index = 0; index < pageLimit; index += 1) {
    const pageNo = Math.round(
      1 + (index * (totalPages - 1)) / (pageLimit - 1),
    );
    selectedPages.add(pageNo);
  }

  return Array.from(selectedPages).sort((first, second) => first - second);
}
`;

export const scoringSnippet = `
function applyAxisWeights(axisScores, weights) {
  Object.entries(weights).forEach(([axis, weight]) => {
    const oppositeAxis = OPPOSITE_AXIS[axis];
    axisScores[axis] += weight;
    axisScores[oppositeAxis] -= weight;
  });
}
// ...
function calculateMbtiScores(axisScores) {
  return MBTI_TYPES.map((mbtiType) => {
    const selectedAxes = mbtiType.split('');
    const score =
      selectedAxes.reduce((total, axis) => total + axisScores[axis], 0) /
      selectedAxes.length;

    return {
      mbtiType,
      score: Number(score.toFixed(2)),
    };
  }).sort((first, second) => second.score - first.score);
}
`;

export const rankingSnippet = `
scoreUrl.searchParams.set("mbti_type", \`eq.\${mbtiType}\`);
scoreUrl.searchParams.set("order", "score.desc,destination_id.asc");

// 이미지가 없는 관광지는 DB 단에서 제외 — 페이지네이션 카운트도 정확해짐
scoreUrl.searchParams.set("destinations.image_url", "not.is.null");

if (provinces.length > 0) {
  scoreUrl.searchParams.set(
    "destinations.province",
    createInFilter(provinces),
  );
}
if (keywords.length > 0) {
  scoreUrl.searchParams.set(
    "destinations.destination_keywords.keyword",
    createInFilter(keywords),
  );
}
`;

export const fallbackSnippet = `
const cached = itineraryCache.get(cacheKey);
const now = Date.now();
if (cached && now - cached.createdAt < 1000 * 60 * 30) {
  return cached.value;
}

try {
  const result = await callGemini({ apiKey: geminiApiKey, prompt });
  itineraryCache.set(cacheKey, { createdAt: now, value: result });
  return result;
} catch (error) {
  console.warn("Gemini fallback used:", error.message);
  itineraryCache.set(cacheKey, { createdAt: now, value: fallbackPayload });
  return fallbackPayload;
}
`;

export const normalizeSnippet = `
function normalizeAiDays(aiDays, travelDays, travelDates, fallbackDays) {
  const normalizedAiDays = Array.isArray(aiDays)
    ? aiDays.slice(0, travelDays)
    : [];

  return (normalizedAiDays.length ? normalizedAiDays : fallbackDays)
    .slice(0, travelDays)
    .map((day, index) => ({
      ...day,
      day: index + 1,
      dayLabel: day?.dayLabel || \`DAY \${index + 1}\`,
      date: travelDates[index] || day?.date || "",
      items:
        Array.isArray(fallbackDays[index]?.items) &&
        fallbackDays[index].items.length > 0
          ? fallbackDays[index].items
          : Array.isArray(day?.items)
            ? day.items
            : [],
    }));
}
`;
