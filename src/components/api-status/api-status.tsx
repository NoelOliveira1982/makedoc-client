import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import './styles.css';

interface Error {
  status: 'offline' | 'error';
  message: string;
}

interface StatusConfig {
  online: { color: string; icon: string };
  offline: { color: string; icon: string };
  error: { color: string; icon: string };
  checking: { color: string; icon: string };
}

const handleError: Record<string | number, Error> = {
  'ERR_NETWORK': {
    status: 'offline',
    message: 'API não está acessível. Verifique se está rodando em http://localhost:8000',
  },
  401: {
    status: 'error',
    message: 'API está online, mas requer API key válida.',
  },
  405: {
    status: 'error',
    message: 'Método não permitido. URL: {url}, Método: {method}',
  }
} as const;

const statusConfig: StatusConfig = {
  online: { color: 'green', icon: '✓' },
  offline: { color: 'red', icon: '✗' },
  error: { color: 'orange', icon: '⚠' },
  checking: { color: 'blue', icon: '⟳' }
} as const;

const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline' | 'error'>('checking');
  const [message, setMessage] = useState('');
  const [apiInfo, setApiInfo] = useState<any>(null);

  const checkApiStatus = async () => {
    setStatus('checking');
    setMessage('Verificando conexão...');

    try {
      const connectionTest = await apiService.testConnection();
      console.log('Conexão básica:', connectionTest);

      const info = await apiService.getAPIInfo();
      setApiInfo(info);

      setStatus('online');
      setMessage('API está online e funcionando!');
    } catch (err: any) {
      console.error('Erro ao verificar API:', err);

      setStatus(handleError[err.response?.status]?.status || 'error');
      setMessage(handleError[err.response?.status]?.message || 'Erro desconhecido');
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  const getStatusColor = () => {
    return statusConfig[status]?.color || 'gray';
  };

  const getStatusIcon = () => {
    return statusConfig[status]?.icon || '?';
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