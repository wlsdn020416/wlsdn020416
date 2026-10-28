export const comparisonMetrics = [
  { key: 'delivery', label: '알림 전달', target: 3000 },
  { key: 'completion', label: '재조회 완료까지', target: 8000 },
  { key: 'detail', label: '상세 재조회', target: 200 },
  { key: 'stock', label: '재고 재조회', target: 200 },
  { key: 'list', label: '목록 재조회', target: 200 },
  { key: 'order', label: '주문', target: 500 },
] as const;

export type MetricKey = (typeof comparisonMetrics)[number]['key'];
export type ComparisonPoint = {
  connections: number;
  vanillaRps: number;
  currentRps: number;
  vanilla: Record<MetricKey, number>;
  current: Record<MetricKey, number>;
};

// 출처: Backend/k6/sse-stream/result-refetch.md의 바닐라 대비 처리 한계 절.
// 각 연결 수 1회. 200연결 비교는 원문에 없어 보간하지 않습니다. 시간 단위는 ms.
export const performanceComparison: {
  conditions: string;
  notes: string;
  points: ComparisonPoint[];
} = {
  conditions:
    'DB CPU 1개·512MiB, 앱 CPU 2개·1GiB, DB 왕복 약 3.2ms, HikariCP 10, 주문 50건/초. 바닐라 1c5bd76과 최적화 코드 + 메모리 캐시 + 재조회 분산 비교.',
  notes:
    '각 연결 수 1회 측정. 200연결 비교값은 없어 제외했습니다. 1500·2000은 SSE 상한을 임시 확대했고 현재 코드에서 미시작 주문이 각각 2·36건입니다. 해당 두 회차는 주기 재동기화의 예약 당김 규칙 반영 전입니다. 전체 회차는 연결 ready 직후 동기화 추가 전이며 주문 구간만 집계했습니다. 재조회 완료까지는 주문 응답 수신 기준이고 실제 렌더링 시간은 아닙니다.',
  points: [
    {
      connections: 400,
      vanilla: {
        detail: 96.0,
        stock: 79.0,
        list: 80.0,
        order: 171.0,
        delivery: 1060.0,
        completion: 2680.0,
      },
      vanillaRps: 338.3,
      current: {
        detail: 21.0,
        stock: 9.0,
        list: 16.0,
        order: 45.0,
        delivery: 990.0,
        completion: 2600.0,
      },
      currentRps: 339.6,
    },
    {
      connections: 600,
      vanilla: {
        detail: 114.0,
        stock: 98.0,
        list: 97.0,
        order: 227.0,
        delivery: 2410.0,
        completion: 3120.0,
      },
      vanillaRps: 434.6,
      current: {
        detail: 19.0,
        stock: 8.0,
        list: 13.0,
        order: 42.0,
        delivery: 990.0,
        completion: 2600.0,
      },
      currentRps: 509.5,
    },
    {
      connections: 800,
      vanilla: {
        detail: 115.0,
        stock: 101.0,
        list: 100.0,
        order: 231.0,
        delivery: 3330.0,
        completion: 3580.0,
      },
      vanillaRps: 436.2,
      current: {
        detail: 19.0,
        stock: 8.0,
        list: 13.0,
        order: 41.0,
        delivery: 990.0,
        completion: 2600.0,
      },
      currentRps: 679.3,
    },
    {
      connections: 1000,
      vanilla: {
        detail: 115.0,
        stock: 100.0,
        list: 97.0,
        order: 233.0,
        delivery: 4270.0,
        completion: 4460.0,
      },
      vanillaRps: 441.3,
      current: {
        detail: 21.0,
        stock: 9.0,
        list: 16.0,
        order: 42.0,
        delivery: 990.0,
        completion: 2600.0,
      },
      currentRps: 848.6,
    },
    {
      connections: 1500,
      vanilla: {
        detail: 124.0,
        stock: 108.0,
        list: 105.0,
        order: 254.0,
        delivery: 7060.0,
        completion: 7260.0,
      },
      vanillaRps: 445.8,
      current: {
        detail: 104.0,
        stock: 88.0,
        list: 125.0,
        order: 215.0,
        delivery: 990.0,
        completion: 2620.0,
      },
      currentRps: 1273.4,
    },
    {
      connections: 2000,
      vanilla: {
        detail: 135.0,
        stock: 118.0,
        list: 111.0,
        order: 281.0,
        delivery: 10380.0,
        completion: 10570.0,
      },
      vanillaRps: 448.8,
      current: {
        detail: 531.0,
        stock: 536.0,
        list: 725.0,
        order: 835.0,
        delivery: 990.0,
        completion: 2690.0,
      },
      currentRps: 1695.0,
    },
  ],
};
