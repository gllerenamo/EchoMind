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

export const caseApi = {
  // Crear caso clínico
  createCase: async (data: any) => {
    const response = await api.post('/cases', data);
    return response.data;
  },

  // Listar casos clínicos
  getCases: async () => {
    const response = await api.get('/cases');
    return response.data;
  },

  // Obtener detalle de un caso clínico
  getCase: async (id: string) => {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  },

  // Asignar médico a un caso clínico
  assignDoctorToCase: async (caseId: string, doctorId: string) => {
    const response = await api.patch(`/cases/${caseId}/assign/${doctorId}`);
    return response.data;
  },

  // Actualizar caso clínico
  updateCase: async (id: string, data: any) => {
    const response = await api.patch(`/cases/${id}`, data);
    return response.data;
  },

  // Obtener mensajes del chat de un caso clínico
  getCaseMessages: async (caseId: string) => {
    const response = await api.get(`/cases/${caseId}/messages`);
    return response.data;
  },

  // Enviar mensaje al chat de un caso clínico
  sendCaseMessage: async (caseId: string, content: string) => {
    const response = await api.post(`/cases/${caseId}/messages`, { content });
    return response.data;
  },
};

export const doctorApi = {
  getDoctors: async () => {
    const response = await api.get('/doctors');
    return response.data;
  },
};

export const referralApi = {
  getReferralsByCase: async (clinicalCaseId: string) => {
    const response = await api.get(`/referrals/${clinicalCaseId}`);
    return response.data;
  },
  createReferral: async (data: { clinicalCaseId: string; toDoctorId: string; reason: string }) => {
    const response = await api.post('/referrals', data);
    return response.data;
  },
  getUserReferrals: async () => {
    const response = await api.get('/referrals/user/all');
    return response.data;
  },
};

export const chatApi = {
  getUserChats: async () => {
    const response = await api.get('/messages/user/all');
    return response.data;
  },
}; 