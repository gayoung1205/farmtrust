import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Inquiry() {
  const [form, setForm] = useState({ category: '', title: '', content: '', email: '', requestRecording: false })
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setDone(true)
  }

  if (done) return (
    <div style={{ padding: '80px 240px', textAlign: 'center' }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: '#27500A', marginBottom: 8 }}>문의가 접수되었습니다</div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>입력하신 이메일로 답변 드리겠습니다. 영업일 기준 1~2일 소요됩니다.</div>
      <Link to="/" style={{ fontSize: 13, color: '#27500A', border: '1px solid #27500A', padding: '8px 20px' }}>홈으로 돌아가기</Link>
    </div>
  )

  return (
    <div style={{ padding: '32px 240px' }}>
      <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>1:1 문의</div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 28 }}>
        실시간 카메라 녹화본 요청 및 기타 문의를 남겨주세요.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>

        {/* 문의 폼 */}
        <form onSubmit={handleSubmit}>

          {/* 문의 유형 */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>문의 유형</div>
            <div style={{ display: 'flex', gap: 1 }}>
              {['일반 문의', '녹화본 요청', '주문/배송', '환불/교환', '기타'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, category: cat }))}
                  style={{
                    padding: '8px 14px',
                    fontSize: 12,
                    border: '1px solid #e8e8e8',
                    background: form.category === cat ? '#27500A' : '#fff',
                    color: form.category === cat ? '#C0DD97' : '#666',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>제목</div>
            <input
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="문의 제목을 입력해주세요"
              style={{ width: '100%', border: '1px solid #e8e8e8', padding: '9px 12px', fontSize: 13, outline: 'none' }}
            />
          </div>

          {/* 내용 */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>문의 내용</div>
            <textarea
              required
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="문의 내용을 상세히 입력해주세요"
              rows={8}
              style={{ width: '100%', border: '1px solid #e8e8e8', padding: '10px 12px', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          {/* 이메일 */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>답변 받을 이메일</div>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="example@email.com"
              style={{ width: '100%', border: '1px solid #e8e8e8', padding: '9px 12px', fontSize: 13, outline: 'none' }}
            />
          </div>

          {/* 녹화본 요청 체크박스 */}
          <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, padding: '12px', background: '#f9f9f9', border: '1px solid #e8e8e8' }}>
            <input
              type="checkbox"
              id="recording"
              checked={form.requestRecording}
              onChange={e => setForm(f => ({ ...f, requestRecording: e.target.checked }))}
              style={{ width: 14, height: 14, accentColor: '#27500A' }}
            />
            <label htmlFor="recording" style={{ fontSize: 12, color: '#444', cursor: 'pointer' }}>
              실시간 카메라 <strong>녹화본 요청</strong>을 포함합니다
            </label>
          </div>

          <button
            type="submit"
            style={{ width: '100%', background: '#27500A', color: '#C0DD97', border: 'none', padding: '13px 0', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            문의 접수하기
          </button>
        </form>

        {/* 안내 사이드 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid #f0f0f0' }}>문의 안내</div>
            {[
              ['운영시간', '평일 09:00 - 18:00'],
              ['답변기간', '영업일 기준 1~2일'],
              ['녹화본', '요청 후 3일 이내 제공'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 12 }}>
                <div style={{ color: '#aaa', minWidth: 48 }}>{label}</div>
                <div style={{ color: '#444' }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#EAF3DE', border: '1px solid #C0DD97', padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#27500A', marginBottom: 8 }}>📷 녹화본 요청 안내</div>
            <div style={{ fontSize: 11, color: '#3B6D11', lineHeight: 1.7 }}>
              의심 장면 발생 시 해당 농가와<br />
              날짜/시간을 문의 내용에 기재해주세요.<br />
              관리자 확인 후 녹화본을 제공해드립니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}