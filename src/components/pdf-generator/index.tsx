import React, { useState } from 'react';
import { apiService } from '../../services/api';
import type { PDFResponse } from '../../services/api';
import './styles.css';

interface PdfGeneratorProps {
  htmlContent: string;
  apiKey: string;
}

interface Error {
  message: string;
}

const handleError: Record<string | number, Error> = {
  401: {
    message: 'API Key inválida ou não fornecida.',
  },
  403: {
    message: 'API Key não autorizada.',
  },
  405: {
    message: 'Método não permitido. URL: {url}, Método: {method}',
  }
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ htmlContent, apiKey }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<PDFResponse | null>(null);

  const generatePDFBase64 = async () => {
    if (!htmlContent.trim()) {
      setError('Por favor, insira algum conteúdo HTML.');
      return;
    }

    if (!apiKey) {
      setError('Por favor, configure uma API key válida.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(null);
    setPdfData(null);

    try {
      const result = await apiService.generatePDFBase64(htmlContent);
      setPdfData(result);
      setSuccess('PDF gerado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao gerar PDF:', err);

      setError(handleError[err.response?.status]?.message || 'Erro desconhecido');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFDownload = async () => {
    if (!htmlContent.trim()) {
      setError('Por favor, insira algum conteúdo HTML.');
      return;
    }

    if (!apiKey) {
      setError('Por favor, configure uma API key válida.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(null);

    try {
      const blob = await apiService.generatePDFDownload(htmlContent);

      // Criar link para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'documento.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess('PDF baixado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao baixar PDF:', err);

      setError(handleError[err.response?.status]?.message || 'Erro desconhecido');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadBase64PDF = () => {
    if (!pdfData?.pdf_base64) return;

    const byteCharacters = atob(pdfData.pdf_base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pdfData.filename || 'documento.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const viewBase64PDF = () => {
    if (!pdfData?.pdf_base64) return;

    const pdfUrl = `data:application/pdf;base64,${pdfData.pdf_base64}`;
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="pdf-generator">
      <h3>Gerador de PDF</h3>

      <div className="generator-controls">
        <button
          onClick={generatePDFBase64}
          disabled={isGenerating || !htmlContent.trim() || !apiKey}
          className="btn btn-primary"
        >
          {isGenerating ? 'Gerando...' : 'Gerar PDF (Base64)'}
        </button>

        <button
          onClick={generatePDFDownload}
          disabled={isGenerating || !htmlContent.trim() || !apiKey}
          className="btn btn-secondary"
        >
          {isGenerating ? 'Baixando...' : 'Baixar PDF Direto'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          <strong>Sucesso:</strong> {success}
        </div>
      )}

      {pdfData && (
        <div className="pdf-result">
          <h4>PDF Gerado</h4>
          <div className="pdf-info">
            <p><strong>Arquivo:</strong> {pdfData.filename}</p>
            <p><strong>Tamanho:</strong> {(pdfData.size_bytes / 1024).toFixed(2)} KB</p>
          </div>

          <div className="pdf-actions">
            <button
              onClick={viewBase64PDF}
              className="btn btn-outline"
            >
              Visualizar PDF
            </button>
            <button
              onClick={downloadBase64PDF}
              className="btn btn-outline"
            >
              Baixar PDF
            </button>
          </div>
        </div>
      )}

      {!apiKey && (
        <div className="warning-message">
          ⚠️ Configure uma API key para gerar PDFs
        </div>
      )}
    </div>
  );
};

export default PdfGenerator; 