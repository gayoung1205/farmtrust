import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const statusLabel = { SAFE: '안전', CAUTION: '주의', DANGER: '위험' }
  const sensorStatus = product.farmSensorStatus

  return (
    <Link to={`/products/${product.id}`} style={{ display: 'block', background: '#fff', borderRight: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderBottom: '1px solid #e8e8e8', background: '#f5f5f0' }}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#ccc' }}>
            이미지 준비 중
          </div>
        )}
      </div>
      <div style={{ padding: '9px 10px' }}>
        <div style={{ fontSize: 10, color: '#aaa', marginBottom: 2 }}>{product.farmName} · {product.farmLocation}</div>
        <div style={{ fontSize: 12, color: '#1a1a1a', marginBottom: 5, lineHeight: 1.4 }}>{product.name}</div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 4, flexWrap: 'wrap' }}>
          <span className="badge-eco">친환경</span>
          {product.isNew && <span className="badge-new">신규</span>}
        </div>
        {sensorStatus && (
          <div className={`status-${sensorStatus}`} style={{ fontSize: 9, marginBottom: 3 }}>
            ● {statusLabel[sensorStatus]}
          </div>
        )}
        <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>
          {product.price.toLocaleString()}원
        </div>
      </div>
    </Link>
  )
}