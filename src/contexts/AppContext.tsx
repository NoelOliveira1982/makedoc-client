import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AppContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  htmlContent: string;
  setHtmlContent: (content: string) => void;
  isApiKeyValid: boolean;
  clearApiKey: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      setApiKeyState(savedApiKey);
      setIsApiKeyValid(true);
    }
  }, []);

  const setApiKey = (key: string) => {
    if (key.trim()) {
      localStorage.setItem('apiKey', key);
      setApiKeyState(key);
      setIsApiKeyValid(true);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('apiKey');
    setApiKeyState('');
    setIsApiKeyValid(false);
  };

  const value: AppContextType = {
    apiKey,
    setApiKey,
    htmlContent,
    setHtmlContent,
    isApiKeyValid,
    clearApiKey,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 