import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import './styles.css';

const ApiKeyConfig: React.FC = () => {
  const { apiKey, setApiKey, isApiKeyValid, clearApiKey } = useAppContext();
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  const handleSaveApiKey = () => {
    if (localApiKey.trim()) {
      setApiKey(localApiKey);
    }
  };

  const handleClearApiKey = () => {
    setLocalApiKey('');
    clearApiKey();
  };

  return (
    <div className="api-key-config">
      <h3>Configuração da API</h3>
      <div className="api-key-input">
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="password"
          id="apiKey"
          value={localApiKey}
          onChange={(e) => setLocalApiKey(e.target.value)}
          placeholder="Digite sua API key"
          className="api-key-field"
        />
        <div className="api-key-buttons">
          <button
            onClick={handleSaveApiKey}
            disabled={!localApiKey.trim()}
            className="btn btn-primary"
          >
            Salvar
          </button>
          {isApiKeyValid && (
            <button
              onClick={handleClearApiKey}
              className="btn btn-secondary"
            >
              Limpar
            </button>
          )}
        </div>
      </div>
      {isApiKeyValid && (
        <div className="api-key-status success">
          ✓ API Key configurada
        </div>
      )}
      <div className="api-key-info">
        <p><strong>API Keys válidas para teste:</strong></p>
        <ul>
          <li><code>minha-api-key-123</code></li>
          <li><code>outra-chave-456</code></li>
        </ul>
      </div>
    </div>
  );
};

export default ApiKeyConfig; 