import React from 'react';
import Header from '../header';
import Footer from '../footer';
import './styles.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 