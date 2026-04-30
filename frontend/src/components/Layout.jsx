import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getProducts } from '../api'
import Footer from './Footer'

export default function Layout() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/?search=${search}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f5' }}>
      {/* 상단 네비 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: 18, fontWeight: 500, color: '#27500A', whiteSpace: 'nowrap', letterSpacing: '-0.5px' }}>팜트러스트</Link>
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 340, position: 'relative' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="농산물, 농가 검색"
            style={{ width: '100%', border: '1px solid #ccc', padding: '8px 36px 8px 12px', fontSize: 13, outline: 'none' }}
          />
          <button type="submit" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 14, color: '#888' }}>
            &#128269;
          </button>
        </form>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link to="/login" style={{ fontSize: 12, color: '#666' }}>로그인</Link>
          <span style={{ fontSize: 12, color: '#666', cursor: 'pointer' }}>회원가입</span>
          <span style={{ fontSize: 12, color: '#666', cursor: 'pointer' }}>마이페이지</span>
          <Link to="/inquiry" style={{fontSize: 12, color: '#666'}}>문의하기</Link>
          <Link to="/admin" style={{ fontSize: 12, color: '#666' }}>관리자</Link>
          <button style={{ fontSize: 12, fontWeight: 500, color: '#27500A', border: '1px solid #3B6D11', padding: '5px 12px', background: 'none' }}>장바구니 0</button>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '0 40px', display: 'flex', justifyContent: 'center' }}>
        {['전체', '채소', '과일', '쌀·잡곡', '나물·버섯', '양념', '농가 보기', '입점 신청'].map((item, i) => (
          <Link
            key={item}
            to={item === '입점 신청' ? '/apply' : item === '농가 보기' ? '/?tab=farms' : `/?category=${item === '전체' ? '' : item}`}
            style={{ fontSize: 12, color: '#555', padding: '10px 70px', whiteSpace: 'nowrap', borderBottom: '2px solid transparent', display: 'block' }}
            onMouseEnter={e => e.target.style.color = '#27500A'}
            onMouseLeave={e => e.target.style.color = '#555'}
          >
            {item}
          </Link>
        ))}
      </div>

      <Outlet />
      <Footer />
    </div>
  )
}
