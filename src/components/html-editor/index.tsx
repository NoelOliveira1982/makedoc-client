import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { templates } from './templates';
import SafePreview from './safe-preview';
import './styles.css';

interface HtmlEditorProps {
  initialHtml?: string;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ initialHtml = '' }) => {
  const { htmlContent, setHtmlContent } = useAppContext();
  const [localHtml, setLocalHtml] = useState(initialHtml);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (htmlContent !== localHtml) {
      setLocalHtml(htmlContent || initialHtml);
    }
  }, [htmlContent, initialHtml]);

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setLocalHtml(newHtml);
    setHtmlContent(newHtml);
  };

  const insertTemplate = (template: string) => {
    const newHtml = localHtml + template;
    setLocalHtml(newHtml);
    setHtmlContent(newHtml);
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
            value={localHtml}
            onChange={handleHtmlChange}
            placeholder="Digite ou cole seu HTML aqui..."
            className="html-textarea"
            rows={15}
          />
        </div>

        {showPreview && (
          <div className="preview-panel">
            <label>Preview:</label>
            <SafePreview htmlContent={localHtml} className="html-preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HtmlEditor; 