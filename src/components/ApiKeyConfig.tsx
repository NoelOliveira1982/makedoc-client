import React, { useState, useEffect } from 'react';

interface ApiKeyConfigProps {
  onApiKeySet: (apiKey: string) => void;
}

const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Carregar API key salva no localStorage
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsValid(true);
      onApiKeySet(savedApiKey);
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('apiKey', apiKey);
      setIsValid(true);
      onApiKeySet(apiKey);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('apiKey');
    setApiKey('');
    setIsValid(false);
    onApiKeySet('');
  };

  return (
    <div className="api-key-config">
      <h3>Configuração da API</h3>
      <div className="api-key-input">
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="password"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Digite sua API key"
          className="api-key-field"
        />
        <div className="api-key-buttons">
          <button
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim()}
            className="btn btn-primary"
          >
            Salvar
          </button>
          {isValid && (
            <button
              onClick={handleClearApiKey}
              className="btn btn-secondary"
            >
              Limpar
            </button>
          )}
        </div>
      </div>
      {isValid && (
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