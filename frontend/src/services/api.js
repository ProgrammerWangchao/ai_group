
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
api.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (error.response?.status === 401) {
    // 处理认证错误
    console.error('Authentication error');
  }
  return Promise.reject(error);
});

export default {
  // 工具相关API
  getTools: (params) => api.get('/tools', { params }),
  getToolById: (id) => api.get(`/tools/${id}`),
  getFeaturedTools: () => api.get('/tools/featured'),
  submitTool: (data) => api.post('/tools', data),
  updateTool: (id, data) => api.put(`/tools/${id}`, data),
  deleteTool: (id) => api.delete(`/tools/${id}`),
  approveTool: (id) => api.post(`/tools/${id}/approve`),

  // 分类相关API
  getCategories: () => api.get('/categories'),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),

  // 标签相关API
  getTags: () => api.get('/tags'),
  createTag: (data) => api.post('/tags', data),
  updateTag: (id, data) => api.put(`/tags/${id}`, data),
  deleteTag: (id) => api.delete(`/tags/${id}`),

  // 用户相关API
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateUserVerification: (id, action) => api.post(`/users/${id}/${action}`),

  // 认证相关API
  login: (credentials) => api.post('/token', credentials),
  register: (data) => api.post('/register', data),
  refreshToken: (refreshToken) => api.post('/token/refresh', { refresh: refreshToken }),
};
