import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://localhost:8000', // URL da API MakeDocAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar a API key automaticamente
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    config.headers['X-API-KEY'] = apiKey;
  }
  return config;
});

// Tipos para as requisições e respostas
export interface HTMLRequest {
  html_content: string;
}

export interface PDFResponse {
  success: boolean;
  pdf_base64: string;
  filename: string;
  size_bytes: number;
}

export interface ErrorResponse {
  error: string;
  detail?: string;
}

// Serviços da API
export const apiService = {
  // Gerar PDF e retornar em base64 (ideal para frontend)
  generatePDFBase64: async (htmlContent: string): Promise<PDFResponse> => {
    const response = await api.post<PDFResponse>('/generate-pdf/base64', {
      html_content: htmlContent,
    });
    return response.data;
  },

  // Gerar PDF para download direto
  generatePDFDownload: async (htmlContent: string): Promise<Blob> => {
    const response = await api.post('/generate-pdf/', {
      html_content: htmlContent,
    }, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Obter informações sobre a API
  getAPIInfo: async () => {
    const response = await api.get('/generate-pdf/');
    return response.data;
  },

  // Testar conexão com a API
  testConnection: async () => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api; 