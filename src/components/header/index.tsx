import React from 'react';
import './styles.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1>MakeDoc - Cliente React</h1>
      <p>Gere PDFs a partir de HTML usando a API MakeDocAPI</p>
    </header>
  );
};

export default Header; 