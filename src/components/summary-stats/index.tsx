import React from 'react';
import type { SummaryStats } from '../../services/api';
import './styles.css';

interface SummaryStatsProps {
  stats: SummaryStats | null;
  isLoading: boolean;
}

export const SummaryStatsCard: React.FC<SummaryStatsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="summary-stats-container">
        <h3>Resumo do Período</h3>
        <p>Carregando estatísticas...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="summary-stats-container">
        <h3>Resumo do Período</h3>
        <p>Não foi possível carregar as estatísticas.</p>
      </div>
    );
  }

  return (
    <div className="summary-stats-container">
      <h3>Resumo (Últimos {stats.period_days || 0} dias)</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total de Requisições</h4>
          <p>{stats.total_requests || 0}</p>
        </div>
        <div className="stat-card">
          <h4>Requisições com Sucesso</h4>
          <p>{stats.successful_requests || 0}</p>
        </div>
        <div className="stat-card">
          <h4>Taxa de Sucesso</h4>
          <p>{(stats.success_rate || 0).toFixed(1)}%</p>
        </div>
        <div className="stat-card">
          <h4>Tempo Médio de Geração</h4>
          <p>{(stats.average_generation_time_ms || 0).toFixed(2)} ms</p>
        </div>
      </div>
    </div>
  );
};