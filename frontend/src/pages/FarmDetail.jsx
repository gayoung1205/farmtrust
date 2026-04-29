import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFarm, getProducts } from '../api'
import ProductCard from '../components/ProductCard'

const statusLabel = { SAFE: '안전', CAUTION: '주의', DANGER: '위험' }

export default function FarmDetail() {
  const { id } = useParams()
  const [farm, setFarm] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    getFarm(id).then(setFarm)
    getProducts().then(all => setProducts(all.filter(p => p.farmId === Number(id))))
  }, [id])

  if (!farm) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>불러오는 중...</div>

  return (
    <div style={{ padding: '24px 40px' }}>
      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>
        <Link to="/">홈</Link> &rsaquo; 농가 보기 &rsaquo; {farm.name}
      </div>

      {/* 농가 정보 */}
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, background: '#EAF3DE', border: '1px solid #C0DD97', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500, color: '#27500A' }}>
            {farm.name[0]}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>{farm.name}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{farm.location} · {farm.certification}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: 10, background: '#EAF3DE', color: '#27500A', padding: '3px 8px', border: '1px solid #C0DD97' }}>친환경 인증</span>
          </div>
        </div>

        {/* 카메라 */}
        <div style={{ background: '#f5f5f0', border: '1px solid #e8e8e8', padding: 24, textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>📷 실시간 카메라</div>
          <div style={{ fontSize: 11, color: '#ccc' }}>개발 중입니다</div>
        </div>

        {/* 센서 */}
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>화학센서 현황</div>
        <div style={{ display: 'flex', gap: 0, border: '1px solid #e8e8e8' }}>
          {farm.sensors?.map(s => (
            <div key={s.id} style={{ flex: 1, padding: '12px 8px', textAlign: 'center', borderRight: '1px solid #e8e8e8', background: '#fff' }}>
              <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>{s.fieldName}</div>
              <div className={`status-${s.status}`} style={{ fontSize: 14 }}>{statusLabel[s.status]}</div>
              <div style={{ fontSize: 10, color: '#ccc', marginTop: 2 }}>수치 {s.chemicalLevel}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 이 농가의 상품 */}
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>{farm.name}의 상품</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', border: '1px solid #e8e8e8' }}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
