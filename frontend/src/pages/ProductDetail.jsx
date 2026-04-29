import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../api'

const BG = { '채소': '#EAF3DE', '과일': '#FAEEDA', '나물·버섯': '#E1F5EE', default: '#f5f5f0' }

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => { getProduct(id).then(setProduct) }, [id])

  if (!product) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>불러오는 중...</div>

  return (
    <div style={{ padding: '24px 40px', maxWidth: 800 }}>
      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>
        <Link to="/">홈</Link> &rsaquo; <Link to={`/?category=${product.category}`}>{product.category}</Link> &rsaquo; {product.name}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e8e8e8', background: '#fff' }}>
        <div style={{ background: BG[product.category] || BG.default, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, padding: 40, borderRight: '1px solid #e8e8e8' }}>
          {product.emoji}
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ fontSize: 10, color: '#aaa', marginBottom: 4 }}>
            <Link to={`/farms/${product.farmId}`} style={{ color: '#3B6D11' }}>{product.farmName}</Link> · {product.farmLocation}
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 500, marginBottom: 8 }}>{product.name}</h1>
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            <span className="badge-eco">친환경</span>
            {product.isNew && <span className="badge-new">신규</span>}
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 20 }}>{product.price?.toLocaleString()}원</div>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>단위: {product.unit}</div>
          <div style={{ borderTop: '1px solid #eee', paddingTop: 16, marginTop: 16 }}>
            <button style={{ width: '100%', background: '#27500A', color: '#C0DD97', border: 'none', padding: '12px 0', fontSize: 14, fontWeight: 500 }}>
              장바구니에 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
