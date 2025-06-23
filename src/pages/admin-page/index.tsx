import React, { useState, useEffect } from 'react';
import LogsTable from '../../components/logs-table';
import { SummaryStatsCard } from '../../components/summary-stats';
import ApiKeysList from '../../components/api-keys-list';
import { apiService } from '../../services/api';
import './styles.css';

const AdminPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [summaryStats, setSummaryStats] = useState<any>(null);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [logsData, statsData, apiKeysData] = await Promise.all([
          apiService.getAdminLogs(),
          apiService.getSummaryStats(),
          apiService.getApiKeys(),
        ]);
        setLogs(logsData);
        setSummaryStats(statsData);
        setApiKeys(apiKeysData);
      } catch (err) {
        console.error("Falha ao buscar dados de admin:", err);
        setError("Não foi possível carregar os dados do painel. Verifique a conexão com a API.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-page-content">
      <h1 className="admin-page-title">Painel de Administração</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="admin-content-grid">
        <div className="admin-section admin-section-full">
          <SummaryStatsCard stats={summaryStats} isLoading={isLoading} />
        </div>
        <div className="admin-section">
          <ApiKeysList apiKeys={apiKeys} isLoading={isLoading} />
        </div>
        <div className="admin-section admin-section-full">
          <LogsTable logs={logs} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 