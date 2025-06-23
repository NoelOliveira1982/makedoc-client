import { useState } from 'react';
import './App.css';
import Layout from './components/layout';
import ApiKeyConfig from './components/api-key-config';
import HtmlEditor from './components/html-editor';
import PdfGenerator from './components/pdf-generator';
import ApiStatus from './components/api-status/api-status';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  return (
    <Layout>
      <div className="app-layout">
        <aside className="sidebar">
          <ApiKeyConfig onApiKeySet={setApiKey} />
          <br />
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
    </Layout>
  );
}

export default App;
