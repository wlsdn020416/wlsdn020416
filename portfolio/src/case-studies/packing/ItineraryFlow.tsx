export function ItineraryFlow() {
  return (
    <div className="itinerary-flow">
      <ol className="if-steps">
        <li>
          <b>후보 선정</b>
          <span>지역 · 키워드 · 이미지 조건, MBTI 점수 반영</span>
        </li>
        <li>
          <b>근거리 묶음</b>
          <span>하루 2곳, 서로 가장 가까운 여행지끼리</span>
        </li>
        <li>
          <b>Gemini 호출</b>
          <span>묶음과 후보 목록을 넣은 프롬프트</span>
        </li>
      </ol>

      <div className="if-branch">
        <div className="if-case">
          <h5>성공</h5>
          <p>JSON 응답을 받아 날짜별 일정으로 정리</p>
        </div>
        <div className="if-case is-fallback">
          <h5>실패 → fallback</h5>
          <p>HTTP 오류(쿼터 초과 등) · 네트워크 오류 · JSON 해석 실패 시 규칙 기반 일정으로 전환</p>
        </div>
      </div>

      <div className="if-result">
        <b>최종 일정</b>
        <span>
          두 경우 모두 장소와 순서는 근거리 묶음 결과를 사용합니다. 같은 조건의 요청은 30분 동안
          캐시합니다.
        </span>
      </div>
    </div>
  );
}
