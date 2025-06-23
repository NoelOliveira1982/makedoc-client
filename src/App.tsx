import './App.css';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout';
import ApiKeyConfig from './components/api-key-config';
import HtmlEditor from './components/html-editor';
import PdfGenerator from './components/pdf-generator';
import ApiStatus from './components/api-status/api-status';

function App() {
  return (
    <AppProvider>
      <Layout>
        <div className="app-layout">
          <aside className="sidebar">
            <ApiKeyConfig />
            <br />
            <ApiStatus />
          </aside>

          <div className="main-content">
            <HtmlEditor
              initialHtml="<h1>Bem-vindo ao MakeDoc!</h1><p>Digite ou cole seu HTML aqui para gerar um PDF.</p>"
            />

            <PdfGenerator />
          </div>
        </div>
      </Layout>
    </AppProvider>
  );
}

export default App;
