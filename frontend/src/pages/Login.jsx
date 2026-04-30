import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [tab, setTab] = useState('consumer')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('로그인 기능은 준비 중입니다.')
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
      <div style={{ width: 400 }}>

        {/* 로고 */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ fontSize: 22, fontWeight: 500, color: '#27500A', letterSpacing: '-0.5px' }}>팜트러스트</Link>
          <div style={{ fontSize: 12, color: '#aaa', marginTop: 6 }}>보여주는 투명함으로 만드는 신뢰</div>
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', border: '1px solid #e8e8e8', marginBottom: 0 }}>
          {[['consumer', '소비자 로그인'], ['seller', '농가 로그인']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1,
                padding: '11px 0',
                fontSize: 13,
                fontWeight: tab === key ? 500 : 400,
                background: tab === key ? '#27500A' : '#fff',
                color: tab === key ? '#C0DD97' : '#888',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', padding: '28px 28px' }}>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>이메일</div>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="example@email.com"
              style={{ width: '100%', border: '1px solid #e8e8e8', padding: '10px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>비밀번호</div>
            <input
              required
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="비밀번호를 입력해주세요"
              style={{ width: '100%', border: '1px solid #e8e8e8', padding: '10px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', background: '#27500A', color: '#C0DD97', border: 'none', padding: '13px 0', fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 14 }}
          >
            로그인
          </button>

          {/* 소셜 로그인 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 1, background: '#e8e8e8' }}></div>
            <div style={{ fontSize: 11, color: '#ccc' }}>또는</div>
            <div style={{ flex: 1, height: 1, background: '#e8e8e8' }}></div>
          </div>

          <div style={{ display: 'flex', gap: 1, marginBottom: 20 }}>
            {[
              ['카카오', '#FEE500', '#3C1E1E'],
              ['네이버', '#03C75A', '#fff'],
              ['구글', '#fff', '#444'],
            ].map(([name, bg, color]) => (
              <button
                key={name}
                type="button"
                style={{ flex: 1, padding: '10px 0', fontSize: 12, background: bg, color, border: '1px solid #e8e8e8', cursor: 'pointer' }}
              >
                {name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 12, color: '#aaa' }}>
            <Link to="/signup" style={{ color: '#aaa' }}>회원가입</Link>
            <span>|</span>
            <span style={{ cursor: 'pointer' }}>아이디 찾기</span>
            <span>|</span>
            <span style={{ cursor: 'pointer' }}>비밀번호 찾기</span>
          </div>
        </form>

        {/* 농가 입점 안내 */}
        {tab === 'seller' && (
          <div style={{ marginTop: 12, background: '#EAF3DE', border: '1px solid #C0DD97', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#27500A', marginBottom: 2 }}>아직 입점 신청을 안 하셨나요?</div>
              <div style={{ fontSize: 11, color: '#3B6D11' }}>친환경 인증서만 있으면 간편하게 입점 가능해요</div>
            </div>
            <Link to="/apply" style={{ fontSize: 11, background: '#27500A', color: '#C0DD97', padding: '7px 12px', whiteSpace: 'nowrap' }}>
              입점 신청
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}