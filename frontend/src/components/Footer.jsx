import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', borderTop: '1px solid #333', marginTop: 60 }}>

      {/* 상단 */}
      <div style={{ padding: '40px 240px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, borderBottom: '1px solid #333' }}>

        {/* 브랜드 */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#C0DD97', marginBottom: 10 }}>팜트러스트</div>
          <div style={{ fontSize: 12, color: '#888', lineHeight: 1.8, marginBottom: 16 }}>
            보여주는 투명함으로 만드는 신뢰<br />
            친환경 인증 농가 전용 농산물 직거래 플랫폼
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ fontSize: 10, background: '#27500A', color: '#C0DD97', padding: '3px 8px', border: '1px solid #3B6D11' }}>친환경 인증</div>
            <div style={{ fontSize: 10, background: 'transparent', color: '#888', padding: '3px 8px', border: '1px solid #444' }}>24시간 모니터링</div>
          </div>
        </div>

        {/* 쇼핑 */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#ccc', marginBottom: 14 }}>쇼핑</div>
          {['전체 상품', '채소', '과일', '쌀·잡곡', '나물·버섯', '양념'].map(item => (
            <div key={item} style={{ marginBottom: 8 }}>
              <Link to={`/?category=${item === '전체 상품' ? '' : item}`} style={{ fontSize: 12, color: '#888' }}>{item}</Link>
            </div>
          ))}
        </div>

        {/* 농가 */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#ccc', marginBottom: 14 }}>농가</div>
          {[['농가 둘러보기', '/?tab=farms'], ['입점 신청', '/apply'], ['입점 안내', '/apply']].map(([label, to]) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <Link to={to} style={{ fontSize: 12, color: '#888' }}>{label}</Link>
            </div>
          ))}
        </div>

        {/* 고객센터 */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#ccc', marginBottom: 14 }}>고객센터</div>
          {[['1:1 문의', '/inquiry'], ['자주 묻는 질문', '/inquiry'], ['관리자 페이지', '/admin']].map(([label, to]) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <Link to={to} style={{ fontSize: 12, color: '#888' }}>{label}</Link>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: '12px', background: '#222', border: '1px solid #333' }}>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>고객센터 운영시간</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#C0DD97' }}>09:00 - 18:00</div>
            <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>주말·공휴일 휴무</div>
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div style={{ padding: '20px 240px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: '#555', lineHeight: 1.8 }}>
          상호명 : 팜트러스트 | 대표자 : 홍길동 | 사업자등록번호 : 000-00-00000<br />
          주소 : 서울특별시 강남구 테헤란로 000 | 통신판매업신고 : 제2024-서울강남-0000호
        </div>
        <div style={{ fontSize: 11, color: '#555' }}>
          © 2024 FarmTrust. All rights reserved.
        </div>
      </div>
    </footer>
  )
}