import { useState, useEffect } from 'react'
import { getSensors } from '../api'

export default function Banner() {
  const [cur, setCur] = useState(0)
  const [sensors, setSensors] = useState([])

  useEffect(() => {
    getSensors().then(setSensors).catch(() => {})
    const timer = setInterval(() => setCur(c => (c + 1) % 3), 4000)
    return () => clearInterval(timer)
  }, [])

  const go = (n) => setCur((n + 3) % 3)

  const slides = [
    {
      img: '/images/banner1.jpg',
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 80px' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#fff', border: '1px solid #fff', padding: '2px 8px', display: 'inline-block', marginBottom: 10 }}>친환경 인증 농가 전용</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#fff', lineHeight: 1.4, marginBottom: 8, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>보여주는 투명함으로<br />만드는 신뢰</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>24시간 실시간 센서로 농약 사용 여부를 직접 확인하세요</div>
            <button style={{ fontSize: 12, background: '#27500A', color: '#C0DD97', border: 'none', padding: '9px 20px' }}>상품 보러가기</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>실시간 센서 현황</div>
            {sensors.slice(0, 3).map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 12px', backdropFilter: 'blur(4px)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.status === 'SAFE' ? '#639922' : s.status === 'CAUTION' ? '#BA7517' : '#E24B4A' }}></div>
                <div>
                  <div style={{ fontSize: 10, color: '#666' }}>{s.fieldName}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: s.status === 'SAFE' ? '#27500A' : s.status === 'CAUTION' ? '#854F0B' : '#A32D2D' }}>
                    {s.status === 'SAFE' ? '안전' : s.status === 'CAUTION' ? '주의' : '위험'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      img: '/images/banner2.jpg',
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 80px' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#C0DD97', border: '1px solid #C0DD97', padding: '2px 8px', display: 'inline-block', marginBottom: 10 }}>신규 입점</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#fff', lineHeight: 1.4, marginBottom: 8, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>친환경 인증 농가라면<br />지금 바로 입점하세요</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>인증서 업로드만으로 간편 입점 — 담당자 방문 불필요</div>
            <button style={{ fontSize: 12, background: '#C0DD97', color: '#173404', border: 'none', padding: '9px 20px' }}>입점 신청하기</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['127', '입점 농가 수'], ['3일', '평균 승인 소요'], ['100%', '친환경 인증 농가']].map(([n, l]) => (
              <div key={l} style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 500, color: '#C0DD97' }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      img: '/images/banner3.jpg',
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 80px' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#fff', border: '1px solid #fff', padding: '2px 8px', display: 'inline-block', marginBottom: 10 }}>이번 주 추천</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#fff', lineHeight: 1.4, marginBottom: 8, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>제철 농산물을<br />산지 직송으로</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>전국 친환경 농가에서 갓 수확한 신선한 채소·과일</div>
            <button style={{ fontSize: 12, background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '9px 20px' }}>지금 보기</button>
          </div>
          <div style={{ display: 'flex', gap: 1 }}>
            {[['완숙 토마토', '전남 나주', '6,900원'], ['유기농 상추', '충남 홍성', '3,500원'], ['초당 옥수수', '경북 안동', '8,900원']].map(([name, loc, price]) => (
              <div key={name} style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 18px', textAlign: 'center', minWidth: 110 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#173404', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 10, color: '#3B6D11', marginBottom: 8 }}>산지 {loc}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#27500A' }}>{price}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div style={{ position: 'relative', borderBottom: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <div style={{
        backgroundImage: `url(${slides[cur].img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.4s ease',
        position: 'relative'
      }}>
        {/* 어두운 오버레이 */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>
        {/* 콘텐츠 */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {slides[cur].content}
        </div>
      </div>

      <button onClick={() => go(cur - 1)} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.5)', width: 32, height: 32, fontSize: 16, color: '#fff', zIndex: 2, cursor: 'pointer' }}>&#8249;</button>
      <button onClick={() => go(cur + 1)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.5)', width: 32, height: 32, fontSize: 16, color: '#fff', zIndex: 2, cursor: 'pointer' }}>&#8250;</button>
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 2 }}>
        {[0, 1, 2].map(i => (
          <button key={i} onClick={() => go(i)} style={{ width: 6, height: 6, borderRadius: '50%', border: 'none', background: i === cur ? '#fff' : 'rgba(255,255,255,0.4)', padding: 0, cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  )
}