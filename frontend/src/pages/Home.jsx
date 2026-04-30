import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Banner from '../components/Banner'
import ProductCard from '../components/ProductCard'
import { getProducts, getFarms } from '../api'

export default function Home() {
  const [products, setProducts] = useState([])
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  const category = searchParams.get('category') || ''
  const tab = searchParams.get('tab') || ''

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getProducts(category || null),
      getFarms()
    ]).then(([p, f]) => {
      setProducts(p)
      setFarms(f)
    }).finally(() => setLoading(false))
  }, [category])

  const statusLabel = { SAFE: '안전', CAUTION: '주의', DANGER: '위험' }

  return (
    <div>
      <Banner />
      <div style={{ padding: '16px 240px' }}>

        {/* 상품 섹션 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{category || '신규 입점 상품'}</div>
          <div style={{ fontSize: 11, color: '#999', cursor: 'pointer' }}>더보기 &rsaquo;</div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#aaa', fontSize: 13 }}>불러오는 중...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 0, border: '1px solid #e8e8e8', marginBottom: 24 }}>
            {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* 농가 섹션 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>입점 농가</div>
          <div style={{ fontSize: 11, color: '#999', cursor: 'pointer' }}>더보기 &rsaquo;</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 0, border: '1px solid #e8e8e8' }}>
          {farms.map(farm => (
            <Link key={farm.id} to={`/farms/${farm.id}`} style={{ background: '#fff', padding: 14, borderRight: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8', display: 'block' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, background: '#EAF3DE', border: '1px solid #C0DD97', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: '#27500A', flexShrink: 0 }}>
                  {farm.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{farm.name}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{farm.location} · {farm.certification}</div>
                </div>
              </div>
              <div style={{ width: '100%', height: 80, overflow: 'hidden', border: '1px solid #e8e8e8', marginBottom: 8 }}>
                <img
                  src="/images/farm-camera.jpg"
                  alt="밭 현황"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 0 }}>
                {farm.sensors?.map(s => (
                  <div key={s.id} style={{ flex: 1, background: '#fff', border: '1px solid #e8e8e8', padding: '5px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#aaa' }}>{s.fieldName}</div>
                    <div className={`status-${s.status}`} style={{ fontSize: 11, marginTop: 1 }}>
                      {statusLabel[s.status]}
                    </div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
