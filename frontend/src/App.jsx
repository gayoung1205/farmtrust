import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import FarmDetail from './pages/FarmDetail'
import FarmApply from './pages/FarmApply'
import Admin from './pages/Admin'
import Inquiry from './pages/Inquiry'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="farms/:id" element={<FarmDetail />} />
        <Route path="apply" element={<FarmApply />} />
        <Route path="admin" element={<Admin />} />
        <Route path="inquiry" element={<Inquiry />}></Route>
      </Route>
    </Routes>
  )
}
