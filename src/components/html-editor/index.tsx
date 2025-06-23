import React, { useState } from 'react';
import './styles.css';

interface HtmlEditorProps {
  onHtmlChange: (html: string) => void;
  initialHtml?: string;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ onHtmlChange, initialHtml = '' }) => {
  const [html, setHtml] = useState(initialHtml);
  const [showPreview, setShowPreview] = useState(false);

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtml(newHtml);
    onHtmlChange(newHtml);
  };

  const insertTemplate = (template: string) => {
    const newHtml = html + template;
    setHtml(newHtml);
    onHtmlChange(newHtml);
  };

  const templates = [
    {
      name: 'Documento Simples',
      html: `
<h1>Título do Documento</h1>
<p>Este é um parágrafo de exemplo.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`
    },
    {
      name: 'Relatório',
      html: `
<div style="font-family: Arial, sans-serif;">
  <h1 style="color: #2c3e50;">Relatório</h1>
  <h2>Resumo Executivo</h2>
  <p>Este é um relatório de exemplo com formatação.</p>
  
  <h2>Dados</h2>
  <table border="1" style="width: 100%; border-collapse: collapse;">
    <tr>
      <th style="padding: 8px;">Coluna 1</th>
      <th style="padding: 8px;">Coluna 2</th>
    </tr>
    <tr>
      <td style="padding: 8px;">Dado 1</td>
      <td style="padding: 8px;">Dado 2</td>
    </tr>
  </table>
</div>`
    },
    {
      name: 'Carta',
      html: `
<div style="font-family: 'Times New Roman', serif; margin: 20px;">
  <div style="text-align: right; margin-bottom: 30px;">
    <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
  </div>
  
  <h2>Prezado(a) Senhor(a),</h2>
  
  <p>Escreva o conteúdo da sua carta aqui...</p>
  
  <p style="margin-top: 30px;">Atenciosamente,</p>
  <p>Seu Nome</p>
</div>`
    }
  ];

  return (
    <div className="html-editor">
      <div className="editor-header">
        <h3>Editor de HTML</h3>
        <div className="editor-controls">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-secondary"
          >
            {showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
          </button>
        </div>
      </div>

      <div className="templates-section">
        <h4>Modelos Prontos:</h4>
        <div className="template-buttons">
          {templates.map((template, index) => (
            <button
              key={index}
              onClick={() => insertTemplate(template.html)}
              className="btn btn-outline"
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <div className={`editor-content ${showPreview ? 'with-preview' : ''}`}>
        <div className="editor-panel">
          <label htmlFor="htmlEditor">HTML:</label>
          <textarea
            id="htmlEditor"
            value={html}
            onChange={handleHtmlChange}
            placeholder="Digite ou cole seu HTML aqui..."
            className="html-textarea"
            rows={15}
          />
        </div>

        {showPreview && (
          <div className="preview-panel">
            <label>Preview:</label>
            <div
              className="html-preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HtmlEditor; 