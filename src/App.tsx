import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout';
import GeneratorPage from './pages/generator-page';
import AdminPage from './pages/admin-page';

function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}

export default App;
