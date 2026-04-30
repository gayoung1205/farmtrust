import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFarm, getProducts } from '../api'
import ProductCard from '../components/ProductCard'

const statusLabel = { SAFE: '안전', CAUTION: '주의', DANGER: '위험' }
const statusColor = { SAFE: '#3B6D11', CAUTION: '#854F0B', DANGER: '#A32D2D' }
const statusBg = { SAFE: '#EAF3DE', CAUTION: '#FAEEDA', DANGER: '#FCEBEB' }
const statusBorder = { SAFE: '#C0DD97', CAUTION: '#FAC775', DANGER: '#F7C1C1' }

export default function FarmDetail() {
  const { id } = useParams()
  const [farm, setFarm] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    getFarm(id).then(setFarm)
    getProducts().then(all => setProducts(all.filter(p => p.farmId === Number(id))))
  }, [id])

  if (!farm) return (
    <div style={{ padding: 80, textAlign: 'center', color: '#aaa', fontSize: 13 }}>불러오는 중...</div>
  )

  const safeCnt = farm.sensors?.filter(s => s.status === 'SAFE').length || 0
  const cautionCnt = farm.sensors?.filter(s => s.status === 'CAUTION').length || 0
  const dangerCnt = farm.sensors?.filter(s => s.status === 'DANGER').length || 0

  return (
    <div style={{ padding: '24px 240px' }}>

      {/* 브레드크럼 */}
      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link to="/" style={{ color: '#aaa' }}>홈</Link>
        <span>&rsaquo;</span>
        <Link to="/?tab=farms" style={{ color: '#aaa' }}>농가 보기</Link>
        <span>&rsaquo;</span>
        <span style={{ color: '#444' }}>{farm.name}</span>
      </div>

      {/* 농가 헤더 */}
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: '24px 28px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, background: '#EAF3DE', border: '1px solid #C0DD97', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 500, color: '#27500A', flexShrink: 0 }}>
            {farm.name[0]}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: '#1a1a1a' }}>{farm.name}</div>
              <span style={{ fontSize: 10, background: '#EAF3DE', color: '#27500A', padding: '2px 7px', border: '1px solid #C0DD97' }}>친환경 인증</span>
            </div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{farm.location} · {farm.certification}</div>
            <div style={{ fontSize: 12, color: '#666' }}>대표자 {farm.ownerName}</div>
          </div>
        </div>

        {/* 센서 요약 */}
        <div style={{ display: 'flex', gap: 1 }}>
          {[
            ['안전', safeCnt, '#3B6D11', '#EAF3DE', '#C0DD97'],
            ['주의', cautionCnt, '#854F0B', '#FAEEDA', '#FAC775'],
            ['위험', dangerCnt, '#A32D2D', '#FCEBEB', '#F7C1C1'],
          ].map(([label, cnt, color, bg, border]) => (
            <div key={label} style={{ background: bg, border: `1px solid ${border}`, padding: '10px 20px', textAlign: 'center', minWidth: 70 }}>
              <div style={{ fontSize: 18, fontWeight: 500, color }}>{cnt}</div>
              <div style={{ fontSize: 10, color, marginTop: 2 }}>{label} 밭</div>
            </div>
          ))}
        </div>
      </div>

      {/* 실시간 카메라 - 한 줄 */}
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>실시간 카메라</span>
          <span style={{ fontSize: 10, color: '#aaa' }}>24시간 모니터링</span>
        </div>
        <div style={{ width: '100%', height: 300, overflow: 'hidden', border: '1px solid #e8e8e8' }}>
          <img
            src="/images/farm-camera.jpg"
            alt="밭 현황"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ marginTop: 10, padding: '8px 12px', background: '#f9f9f9', border: '1px solid #f0f0f0', fontSize: 11, color: '#888' }}>
          💡 의심 장면 발견 시 <Link to="/inquiry" style={{ color: '#3B6D11', fontWeight: 500 }}>1:1 문의</Link>를 통해 녹화본을 요청할 수 있습니다
        </div>
      </div>

      {/* 화학센서 + 농가정보 - 2열 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* 화학센서 현황 */}
        <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>화학센서 현황</span>
            <span style={{ fontSize: 10, color: '#aaa' }}>실시간 농약 감지</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {farm.sensors?.map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: statusBg[s.status], border: `1px solid ${statusBorder[s.status]}` }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[s.status], flexShrink: 0 }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1a1a' }}>{s.fieldName}</div>
                  <div style={{ fontSize: 10, color: '#aaa', marginTop: 1 }}>화학물질 수치 {s.chemicalLevel}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: statusColor[s.status] }}>
                  {statusLabel[s.status]}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 10, color: '#bbb', lineHeight: 1.6 }}>
            ※ 안전 0~2.0 · 주의 2.1~5.0 · 위험 5.1 이상 (단위: ppm)
          </div>
        </div>

        {/* 농가 정보 */}
        <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #f0f0f0' }}>농가 정보</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e8e8e8' }}>
            {[
              ['농장명', farm.name],
              ['소재지', farm.location],
              ['친환경 인증', farm.certification],
              ['대표자', farm.ownerName],
              ['운영 밭 수', `${farm.sensors?.length || 0}개`],
              ['판매 상품 수', `${products.length}개`],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: '12px 16px', borderRight: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
                <div style={{ fontSize: 10, color: '#aaa', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 이 농가의 상품 */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{farm.name}의 상품</div>
          <div style={{ fontSize: 11, color: '#999' }}>총 {products.length}개</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', border: '1px solid #e8e8e8' }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

    </div>
  )
}