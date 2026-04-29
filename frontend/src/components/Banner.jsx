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
      bg: '#EAF3DE',
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '90px 80px' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#3B6D11', border: '1px solid #3B6D11', padding: '2px 8px', display: 'inline-block', marginBottom: 8 }}>친환경 인증 농가 전용</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#173404', lineHeight: 1.4, marginBottom: 6 }}>보여주는 투명함으로<br />만드는 신뢰</div>
            <div style={{ fontSize: 12, color: '#3B6D11', marginBottom: 12 }}>24시간 실시간 센서로 농약 사용 여부를 직접 확인하세요</div>
            <button style={{ fontSize: 11, background: '#27500A', color: '#C0DD97', border: 'none', padding: '7px 16px' }}>상품 보러가기</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, color: '#3B6D11', marginBottom: 2 }}>실시간 센서 현황</div>
            {sensors.slice(0, 3).map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e0e0e0', padding: '5px 10px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%' }} className={`dot-${s.status}`}></div>
                <div>
                  <div style={{ fontSize: 10, color: '#888' }}>밭 {s.fieldName}</div>
                  <div className={`status-${s.status}`}>{s.status === 'SAFE' ? '안전' : s.status === 'CAUTION' ? '주의' : '위험'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      bg: '#173404',
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '90px 80px' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#97C459', border: '1px solid #97C459', padding: '2px 8px', display: 'inline-block', marginBottom: 8 }}>신규 입점</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#EAF3DE', lineHeight: 1.4, marginBottom: 6 }}>친환경 인증 농가라면<br />지금 바로 입점하세요</div>
            <div style={{ fontSize: 12, color: '#97C459', marginBottom: 12 }}>인증서 업로드만으로 간편 입점 — 담당자 방문 불필요</div>
            <button style={{ fontSize: 11, background: '#97C459', color: '#173404', border: 'none', padding: '7px 16px' }}>입점 신청하기</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[['127', '입점 농가 수'], ['3일', '평균 승인 소요'], ['100%', '친환경 인증 농가']].map(([n, l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#C0DD97' }}>{n}</div>
                <div style={{ fontSize: 10, color: '#97C459' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      bg: '#EAF3DE',
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '90px 80px' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#3B6D11', border: '1px solid #3B6D11', padding: '2px 8px', display: 'inline-block', marginBottom: 8 }}>이번 주 추천</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#173404', lineHeight: 1.4, marginBottom: 6 }}>제철 농산물을<br />산지 직송으로</div>
            <div style={{ fontSize: 12, color: '#3B6D11', marginBottom: 12 }}>전국 친환경 농가에서 갓 수확한 신선한 채소·과일</div>
            <button style={{ fontSize: 11, background: 'transparent', color: '#27500A', border: '1px solid #27500A', padding: '7px 16px' }}>지금 보기</button>
          </div>
          <div style={{ display: 'flex', gap: 1 }}>
            {[
              ['완숙 토마토', '전남 나주', '6,900원'],
              ['유기농 상추', '충남 홍성', '3,500원'],
              ['초당 옥수수', '경북 안동', '8,900원'],
            ].map(([name, loc, price]) => (
              <div key={name} style={{ background: '#fff', border: '1px solid #C0DD97', padding: '14px 18px', textAlign: 'center', minWidth: 110 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: '#173404', marginBottom: 4 }}>{name}</div>
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
      <div style={{ background: slides[cur].bg, transition: 'background 0.3s' }}>
        {slides[cur].content}
      </div>
      <button onClick={() => go(cur - 1)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: 24, height: 24, fontSize: 14, color: '#27500A' }}>&#8249;</button>
      <button onClick={() => go(cur + 1)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: 24, height: 24, fontSize: 14, color: '#27500A' }}>&#8250;</button>
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <button key={i} onClick={() => go(i)} style={{ width: 6, height: 6, borderRadius: '50%', border: 'none', background: i === cur ? '#3B6D11' : 'rgba(0,0,0,0.2)', padding: 0 }} />
        ))}
      </div>
    </div>
  )
}
