import { useState } from 'react';
import './App.css';
import ApiKeyConfig from './components/ApiKeyConfig';
import HtmlEditor from './components/HtmlEditor';
import PdfGenerator from './components/PdfGenerator';
import ApiStatus from './components/ApiStatus';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  return (
    <div className="app">
      <header className="app-header">
        <h1>MakeDoc - Cliente React</h1>
        <p>Gere PDFs a partir de HTML usando a API MakeDocAPI</p>
      </header>

      <main className="app-main">
        <div className="app-layout">
          <aside className="sidebar">
            <ApiKeyConfig onApiKeySet={setApiKey} />
            <ApiStatus />
          </aside>

          <div className="main-content">
            <HtmlEditor
              onHtmlChange={setHtmlContent}
              initialHtml="<h1>Bem-vindo ao MakeDoc!</h1><p>Digite ou cole seu HTML aqui para gerar um PDF.</p>"
            />

            <PdfGenerator
              htmlContent={htmlContent}
              apiKey={apiKey}
            />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          MakeDoc Client - Desenvolvido para consumir a API MakeDocAPI
        </p>
      </footer>
    </div>
  );
}

export default App;
