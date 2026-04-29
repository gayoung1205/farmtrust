import { useState } from 'react'
import { applyFarm } from '../api'

export default function FarmApply() {
  const [form, setForm] = useState({ name: '', location: '', certification: '', ownerName: '' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await applyFarm(form)
      setDone(true)
    } catch {
      alert('신청 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div style={{ padding: '60px 40px', textAlign: 'center' }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: '#27500A', marginBottom: 8 }}>입점 신청이 완료되었습니다</div>
      <div style={{ fontSize: 13, color: '#888' }}>관리자 검토 후 3일 이내 승인 여부를 안내드립니다.</div>
    </div>
  )

  return (
    <div style={{ padding: '32px 40px', maxWidth: 480 }}>
      <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>농가 입점 신청</div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 24 }}>친환경 인증서 보유 농가에 한해 온라인 신청만으로 입점 가능합니다.</div>

      <form onSubmit={handleSubmit}>
        {[
          ['농장명', 'name', '예) 청정원 농장'],
          ['소재지', 'location', '예) 전남 나주'],
          ['친환경 인증 번호', 'certification', '예) 유기농-2024-001'],
          ['대표자명', 'ownerName', '예) 홍길동'],
        ].map(([label, key, placeholder]) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#444', marginBottom: 5 }}>{label}</div>
            <input
              required
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              style={{ width: '100%', border: '1px solid #ccc', padding: '9px 12px', fontSize: 13, outline: 'none' }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: '#444', marginBottom: 5 }}>친환경 인증서 파일</div>
          <input type="file" accept=".pdf,.jpg,.png" style={{ fontSize: 12, color: '#666' }} />
          <div style={{ fontSize: 10, color: '#aaa', marginTop: 4 }}>PDF, JPG, PNG 형식 가능</div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', background: '#27500A', color: '#C0DD97', border: 'none', padding: '12px 0', fontSize: 14, fontWeight: 500, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? '신청 중...' : '입점 신청하기'}
        </button>
      </form>
    </div>
  )
}
