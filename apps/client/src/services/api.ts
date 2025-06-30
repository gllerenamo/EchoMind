import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  // Registro de paciente
  registerPatient: async (data: any) => {
    const response = await api.post('/auth/register/patient', data);
    return response.data;
  },

  // Registro de médico
  registerDoctor: async (data: any) => {
    const response = await api.post('/auth/register/doctor', data);
    return response.data;
  },

  // Login
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Obtener perfil
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
}; 