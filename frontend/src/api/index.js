import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// 상품
export const getProducts = (category) =>
  api.get('/products', { params: category ? { category } : {} }).then(r => r.data)

export const getNewProducts = () =>
  api.get('/products/new').then(r => r.data)

export const getProduct = (id) =>
  api.get(`/products/${id}`).then(r => r.data)

// 농가
export const getFarms = () =>
  api.get('/farms').then(r => r.data)

export const getFarm = (id) =>
  api.get(`/farms/${id}`).then(r => r.data)

export const applyFarm = (data) =>
  api.post('/farms/apply', data).then(r => r.data)

// 관리자
export const getPendingFarms = () =>
  api.get('/farms/admin/pending').then(r => r.data)

export const approveFarm = (id) =>
  api.patch(`/farms/admin/${id}/approve`).then(r => r.data)

export const rejectFarm = (id) =>
  api.patch(`/farms/admin/${id}/reject`).then(r => r.data)

// 센서
export const getSensors = () =>
  api.get('/sensors').then(r => r.data)

export const getSensorsByFarm = (farmId) =>
  api.get(`/sensors/farm/${farmId}`).then(r => r.data)
