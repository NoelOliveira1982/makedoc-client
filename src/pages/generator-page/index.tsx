import React from 'react';
import ApiKeyConfig from '../../components/api-key-config';
import ApiStatus from '../../components/api-status/api-status';
import HtmlEditor from '../../components/html-editor';
import PdfGenerator from '../../components/pdf-generator';
import './styles.css';

const GeneratorPage: React.FC = () => {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <ApiKeyConfig />
        <br />
        <ApiStatus />
      </aside>

      <div className="main-content">
        <HtmlEditor
          initialHtml="<h1>Bem-vindo ao MakeDoc!</h1><p>Digite ou cole seu HTML aqui para gerar um PDF.</p>"
        />
        <PdfGenerator />
      </div>
    </div>
  );
};

export default GeneratorPage; 