import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline' | 'error'>('checking');
  const [message, setMessage] = useState('');
  const [apiInfo, setApiInfo] = useState<any>(null);

  const checkApiStatus = async () => {
    setStatus('checking');
    setMessage('Verificando conexão...');

    try {
      // Testar conexão básica
      const connectionTest = await apiService.testConnection();
      console.log('Conexão básica:', connectionTest);

      // Obter informações da API
      const info = await apiService.getAPIInfo();
      setApiInfo(info);

      setStatus('online');
      setMessage('API está online e funcionando!');
    } catch (err: any) {
      console.error('Erro ao verificar API:', err);
      console.error('Status:', err.response?.status);
      console.error('URL:', err.config?.url);
      console.error('Method:', err.config?.method);

      if (err.code === 'ERR_NETWORK') {
        setStatus('offline');
        setMessage('API não está acessível. Verifique se está rodando em http://localhost:8000');
      } else if (err.response?.status === 401) {
        setStatus('error');
        setMessage('API está online, mas requer API key válida.');
      } else if (err.response?.status === 405) {
        setStatus('error');
        setMessage(`Erro 405: Método não permitido. URL: ${err.config?.url}, Método: ${err.config?.method}`);
      } else {
        setStatus('error');
        setMessage(`Erro: ${err.message || 'Erro desconhecido'}`);
      }
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'green';
      case 'offline': return 'red';
      case 'error': return 'orange';
      case 'checking': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return '✓';
      case 'offline': return '✗';
      case 'error': return '⚠';
      case 'checking': return '⟳';
      default: return '?';
    }
  };

  return (
    <div className="api-status">
      <h3>Status da API</h3>

      <div className="status-indicator">
        <span
          className={`status-icon status-${status}`}
          style={{ color: getStatusColor() }}
        >
          {getStatusIcon()}
        </span>
        <span className="status-text">{message}</span>
      </div>

      <button
        onClick={checkApiStatus}
        disabled={status === 'checking'}
        className="btn btn-outline"
      >
        {status === 'checking' ? 'Verificando...' : 'Verificar Novamente'}
      </button>

      {apiInfo && (
        <div className="api-info">
          <h4>Informações da API:</h4>
          <pre className="api-info-json">
            {JSON.stringify(apiInfo, null, 2)}
          </pre>
        </div>
      )}

      <div className="api-help">
        <h4>Como usar:</h4>
        <ol>
          <li>Certifique-se de que a API MakeDocAPI está rodando em <code>http://localhost:8000</code></li>
          <li>Configure uma API key válida no painel de configuração</li>
          <li>Digite ou cole HTML no editor</li>
          <li>Clique em "Gerar PDF" para criar seu documento</li>
        </ol>
      </div>
    </div>
  );
};

export default ApiStatus; 