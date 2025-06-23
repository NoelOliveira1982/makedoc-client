import React from 'react';
import type { LogEntry } from '../../services/api';
import './styles.css';

interface LogsTableProps {
  logs: LogEntry[];
  isLoading: boolean;
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, isLoading }) => {
  if (isLoading && logs.length === 0) {
    return <p>Carregando logs...</p>;
  }

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="logs-table-container">
      <h3>Logs de Geração</h3>
      {logs.length === 0 && !isLoading ? (
        <p>Nenhum log encontrado.</p>
      ) : (
        <table className="logs-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Status</th>
              <th>Chave de API (início)</th>
              <th>Fonte</th>
              <th>Tempo (ms)</th>
              <th>Tamanho</th>
              <th>Erro</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className={!log.success ? 'log-error' : ''}>
                <td>{new Date(log.created_at).toLocaleString()}</td>
                <td>
                  <span className={`log-status ${log.success ? 'status-success' : 'status-fail'}`}>
                    {log.success ? 'Sucesso' : 'Falha'}
                  </span>
                </td>
                <td>{log.api_key.substring(0, 8)}...</td>
                <td>{log.source}</td>
                <td>{log.generation_time_ms.toFixed(2)}</td>
                <td>{formatBytes(log.file_size_bytes)}</td>
                <td>{log.error_message || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsTable; 