import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-branding">
        <h1>MakeDoc</h1>
      </div>
      <nav className="header-nav">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          end // Garante que a rota "/" só fica ativa quando é exatamente ela
        >
          Gerar PDF
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Header; 