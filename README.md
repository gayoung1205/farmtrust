# 팜트러스트 (FarmTrust)

친환경 인증 농가 전용 신뢰 기반 농산물 직거래 플랫폼

## 기술 스택

| 역할 | 기술 |
|------|------|
| 백엔드 | Spring Boot 3.2 + JPA + H2 |
| 프론트엔드 | React 18 + Vite + React Router |
| API 통신 | Axios |

## 프로젝트 구조

```
farmtrust/
├── backend/                       # Spring Boot
│   └── src/main/java/com/farmtrust/
│       ├── FarmtrustApplication.java
│       ├── config/
│       │   ├── CorsConfig.java        # CORS 설정 (React 5173 허용)
│       │   └── DataInitializer.java   # H2 더미데이터 자동 삽입
│       ├── entity/
│       │   ├── Farm.java
│       │   ├── Product.java
│       │   └── SensorData.java
│       ├── repository/
│       ├── service/
│       ├── controller/
│       └── dto/
│
└── frontend/                      # React + Vite
    └── src/
        ├── api/index.js           # Axios API 모음
        ├── components/
        │   ├── Layout.jsx         # 네비게이션 공통 레이아웃
        │   ├── Banner.jsx         # 슬라이더 배너 (API 연동)
        │   └── ProductCard.jsx
        └── pages/
            ├── Home.jsx           # 메인 홈
            ├── ProductDetail.jsx  # 상품 상세
            ├── FarmDetail.jsx     # 농가 상세 (센서 + 카메라)
            ├── FarmApply.jsx      # 판매자 입점 신청
            └── Admin.jsx          # 관리자 (승인/반려)
```

## 실행 방법

### 백엔드

```bash
cd backend
./gradlew bootRun
# http://localhost:8080 에서 실행
# H2 콘솔: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:farmtrust)
```

### 프론트엔드

```bash
cd frontend
npm install
npm run dev
# http://localhost:5173 에서 실행
```

## 주요 API

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/products | 전체 상품 목록 |
| GET | /api/products?category=채소 | 카테고리별 상품 |
| GET | /api/products/new | 신규 상품 |
| GET | /api/farms | 승인된 농가 목록 |
| POST | /api/farms/apply | 농가 입점 신청 |
| GET | /api/farms/admin/pending | 승인 대기 목록 |
| PATCH | /api/farms/admin/{id}/approve | 농가 승인 |
| PATCH | /api/farms/admin/{id}/reject | 농가 반려 |
| GET | /api/sensors | 전체 센서 현황 |
| GET | /api/sensors/farm/{farmId} | 농가별 센서 |

## 더미데이터

서버 시작 시 자동으로 아래 데이터가 삽입됩니다:
- 농가 5개 (4개 승인, 1개 대기)
- 센서 데이터 11개 (안전/주의/위험 혼합)
- 상품 10개
