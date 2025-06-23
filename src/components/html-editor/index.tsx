import React, { useState } from 'react';
import { templates } from './templates';
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