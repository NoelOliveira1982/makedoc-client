import React, { useState } from 'react';
import type { ApiKey } from '../../services/api';
import './styles.css';

interface ApiKeysListProps {
  apiKeys: ApiKey[];
  isLoading: boolean;
}

const ApiKeysList: React.FC<ApiKeysListProps> = ({ apiKeys, isLoading }) => {
  const [showKeys, setShowKeys] = useState(false);

  if (isLoading && apiKeys.length === 0) {
    return <p>Carregando chaves de API...</p>;
  }

  const toggleShowKeys = () => {
    setShowKeys(!showKeys);
  };

  const formatKeyForDisplay = (key: string) => {
    if (showKeys) return key;
    return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
  }

  return (
    <div className="api-keys-container">
      <div className="api-keys-header">
        <h3>Chaves de API</h3>
        <button onClick={toggleShowKeys} className="btn btn-secondary">
          {showKeys ? 'Ocultar' : 'Mostrar'} Chaves
        </button>
      </div>
      {apiKeys.length === 0 && !isLoading ? (
        <p>Nenhuma chave de API encontrada.</p>
      ) : (
        <ul className="api-keys-list">
          {apiKeys.map(apiKey => (
            <li key={apiKey.key} className="api-key-item">
              <div className="api-key-info">
                <span className="api-key-name">{apiKey.name}</span>
                <span className={`api-key-status ${apiKey.is_active ? 'status-active' : 'status-inactive'}`}>
                  {apiKey.is_active ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <pre className="api-key-value">{formatKeyForDisplay(apiKey.key)}</pre>
              <div className="api-key-details">
                <span>Usos restantes: {apiKey.quantity}</span>
                <span>
                  Último uso: {apiKey.last_used ? new Date(apiKey.last_used).toLocaleString() : 'Nunca'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiKeysList; 