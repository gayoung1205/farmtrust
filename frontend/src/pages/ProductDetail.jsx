import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, getFarm } from '../api'

const statusLabel = { SAFE: '안전', CAUTION: '주의', DANGER: '위험' }
const statusColor = { SAFE: '#3B6D11', CAUTION: '#854F0B', DANGER: '#A32D2D' }
const statusBg = { SAFE: '#EAF3DE', CAUTION: '#FAEEDA', DANGER: '#FCEBEB' }
const statusBorder = { SAFE: '#C0DD97', CAUTION: '#FAC775', DANGER: '#F7C1C1' }

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [farm, setFarm] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    getProduct(id).then(p => {
      setProduct(p)
      if (p?.farmId) getFarm(p.farmId).then(setFarm)
    })
  }, [id])

  if (!product) return (
    <div style={{ padding: 80, textAlign: 'center', color: '#aaa', fontSize: 13 }}>불러오는 중...</div>
  )

  const totalPrice = (product.price * quantity).toLocaleString()
  const worstSensor = farm?.sensors?.reduce((worst, s) => {
    const rank = { DANGER: 3, CAUTION: 2, SAFE: 1 }
    return rank[s.status] > rank[worst?.status || 'SAFE'] ? s : worst
  }, null)

  return (
    <div style={{ padding: '24px 240px' }}>

      {/* 브레드크럼 */}
      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link to="/" style={{ color: '#aaa' }}>홈</Link>
        <span>&rsaquo;</span>
        <Link to={`/?category=${product.category}`} style={{ color: '#aaa' }}>{product.category}</Link>
        <span>&rsaquo;</span>
        <span style={{ color: '#444' }}>{product.name}</span>
      </div>

      {/* 메인 상품 영역 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #e8e8e8', background: '#fff', marginBottom: 16 }}>

        {/* 이미지 */}
        <div style={{ borderRight: '1px solid #e8e8e8', background: '#f5f5f0', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 400 }} />
          ) : (
            <div style={{ fontSize: 12, color: '#ccc' }}>이미지 준비 중</div>
          )}
        </div>

        {/* 상품 정보 */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* 농가명 */}
          <Link to={`/farms/${product.farmId}`} style={{ fontSize: 12, color: '#3B6D11', marginBottom: 6, display: 'block' }}>
            {product.farmName} · {product.farmLocation}
          </Link>

          {/* 상품명 */}
          <div style={{ fontSize: 22, fontWeight: 500, color: '#1a1a1a', marginBottom: 10, letterSpacing: '-0.5px' }}>
            {product.name}
          </div>

          {/* 뱃지 */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            <span className="badge-eco">친환경</span>
            {product.isNew && <span className="badge-new">신규</span>}
          </div>

          {/* 가격 */}
          <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '16px 0', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>판매가</div>
            <div style={{ fontSize: 26, fontWeight: 500, color: '#1a1a1a' }}>
              {product.price?.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400 }}>원</span>
            </div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>/ {product.unit}</div>
          </div>

          {/* 배송 정보 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {[
              ['배송', '산지 직송 · 주문 후 1~2일 내 출고'],
              ['원산지', product.farmLocation],
              ['인증', product.farmName ? `${product.farmName} 친환경 인증` : '-'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                <div style={{ color: '#aaa', minWidth: 40 }}>{label}</div>
                <div style={{ color: '#444' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* 센서 상태 */}
          {worstSensor && (
            <div style={{ background: statusBg[worstSensor.status], border: `1px solid ${statusBorder[worstSensor.status]}`, padding: '10px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[worstSensor.status], flexShrink: 0 }}></div>
              <div>
                <div style={{ fontSize: 11, color: statusColor[worstSensor.status], fontWeight: 500 }}>
                  현재 농장 화학센서 — {statusLabel[worstSensor.status]}
                </div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>
                  실시간 센서 기준 · 농약 감지 수치 {worstSensor.chemicalLevel}
                </div>
              </div>
            </div>
          )}

          {/* 수량 선택 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16, border: '1px solid #e8e8e8', width: 'fit-content' }}>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              style={{ width: 36, height: 36, background: '#fff', border: 'none', fontSize: 16, color: '#444', borderRight: '1px solid #e8e8e8' }}
            >−</button>
            <div style={{ width: 48, textAlign: 'center', fontSize: 14, fontWeight: 500 }}>{quantity}</div>
            <button
              onClick={() => setQuantity(q => q + 1)}
              style={{ width: 36, height: 36, background: '#fff', border: 'none', fontSize: 16, color: '#444', borderLeft: '1px solid #e8e8e8' }}
            >+</button>
          </div>

          {/* 총 금액 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#aaa' }}>총 상품금액</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#27500A' }}>{totalPrice}원</div>
          </div>

          {/* 버튼 */}
          <div style={{ display: 'flex', gap: 1 }}>
            <button style={{ flex: 1, background: '#fff', border: '1px solid #27500A', color: '#27500A', padding: '13px 0', fontSize: 13, fontWeight: 500 }}>
              장바구니 담기
            </button>
            <button style={{ flex: 1, background: '#27500A', border: 'none', color: '#C0DD97', padding: '13px 0', fontSize: 13, fontWeight: 500 }}>
              바로 구매하기
            </button>
          </div>
        </div>
      </div>

      {/* 농가 정보 */}
      {farm && (
        <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #f0f0f0' }}>판매 농가 정보</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, background: '#EAF3DE', border: '1px solid #C0DD97', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500, color: '#27500A', flexShrink: 0 }}>
              {farm.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{farm.name}</div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 12 }}>{farm.location} · {farm.certification}</div>
              <div style={{ display: 'flex', gap: 1 }}>
                {farm.sensors?.map(s => (
                  <div key={s.id} style={{ flex: 1, background: '#f9f9f9', border: '1px solid #e8e8e8', padding: '8px 6px', textAlign: 'center', maxWidth: 80 }}>
                    <div style={{ fontSize: 9, color: '#aaa', marginBottom: 3 }}>{s.fieldName}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: statusColor[s.status] }}>{statusLabel[s.status]}</div>
                  </div>
                ))}
              </div>
            </div>
            <Link to={`/farms/${farm.id}`} style={{ fontSize: 11, color: '#3B6D11', border: '1px solid #3B6D11', padding: '6px 12px', whiteSpace: 'nowrap' }}>
              농가 상세 보기
            </Link>
          </div>
        </div>
      )}

      {/* 카메라 */}
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #f0f0f0' }}>실시간 밭 현황</div>
        <div style={{ width: '100%', height: 240, overflow: 'hidden', border: '1px solid #e8e8e8' }}>
          <img
            src="/images/farm-camera.jpg"
            alt="밭 현황"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

    </div>
  )
}