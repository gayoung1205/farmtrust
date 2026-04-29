import { useEffect, useState } from 'react'
import { getPendingFarms, approveFarm, rejectFarm } from '../api'

export default function Admin() {
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPendingFarms().then(setFarms).finally(() => setLoading(false))
  }, [])

  const handleApprove = async (id) => {
    await approveFarm(id)
    setFarms(f => f.filter(farm => farm.id !== id))
  }

  const handleReject = async (id) => {
    await rejectFarm(id)
    setFarms(f => f.filter(farm => farm.id !== id))
  }

  return (
    <div style={{ padding: '24px 40px' }}>
      <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>관리자 — 입점 신청 목록</div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 20 }}>승인 시 즉시 상품 등록이 가능합니다.</div>

      {loading ? (
        <div style={{ color: '#aaa', fontSize: 13 }}>불러오는 중...</div>
      ) : farms.length === 0 ? (
        <div style={{ color: '#aaa', fontSize: 13, padding: 40, textAlign: 'center', border: '1px solid #e8e8e8', background: '#fff' }}>
          대기 중인 입점 신청이 없습니다.
        </div>
      ) : (
        <div style={{ border: '1px solid #e8e8e8', background: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', padding: '10px 16px', borderBottom: '1px solid #e8e8e8', background: '#f5f5f0', fontSize: 11, color: '#888', fontWeight: 500, gap: 16 }}>
            <span>농장명</span><span>소재지</span><span>인증 번호</span><span>대표자</span><span>처리</span>
          </div>
          {farms.map(farm => (
            <div key={farm.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 13, gap: 16, alignItems: 'center' }}>
              <span style={{ fontWeight: 500 }}>{farm.name}</span>
              <span style={{ color: '#666' }}>{farm.location}</span>
              <span style={{ color: '#666' }}>{farm.certification}</span>
              <span style={{ color: '#666' }}>{farm.ownerName}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => handleApprove(farm.id)}
                  style={{ fontSize: 11, background: '#27500A', color: '#C0DD97', border: 'none', padding: '5px 12px' }}
                >승인</button>
                <button
                  onClick={() => handleReject(farm.id)}
                  style={{ fontSize: 11, background: '#fff', color: '#A32D2D', border: '1px solid #A32D2D', padding: '5px 12px' }}
                >반려</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
