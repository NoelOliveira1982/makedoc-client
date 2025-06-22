# MakeDoc Client - Cliente React

Um cliente React moderno para consumir a API MakeDocAPI, permitindo gerar PDFs a partir de conteúdo HTML de forma intuitiva e responsiva.

## 🚀 Funcionalidades

- **Editor de HTML**: Interface amigável para escrever e editar HTML
- **Preview em Tempo Real**: Visualize o resultado do HTML antes de gerar o PDF
- **Modelos Prontos**: Templates predefinidos para diferentes tipos de documentos
- **Geração de PDF**: Suporte a dois métodos de geração:
  - Base64 (ideal para frontend)
  - Download direto
- **Configuração de API Key**: Interface para configurar e gerenciar chaves de API
- **Status da API**: Monitoramento em tempo real da conectividade
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- API MakeDocAPI rodando em `http://localhost:8000`

## 🛠️ Instalação

1. **Clone o repositório** (se aplicável):
```bash
git clone <url-do-repositorio>
cd makedoc-client
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

4. **Acesse a aplicação**:
Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 🔧 Configuração

### API Key

Para usar o cliente, você precisa configurar uma API key válida:

1. Acesse a seção "Configuração da API" no painel lateral
2. Digite uma das chaves válidas:
   - `minha-api-key-123`
   - `outra-chave-456`
3. Clique em "Salvar"

### Conectando com a API

Certifique-se de que a API MakeDocAPI está rodando:

```bash
# Na pasta da API
cd MakeDocAPI
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📖 Como Usar

### 1. Configurar API Key
- No painel lateral, configure sua API key
- Verifique se o status da API está "online"

### 2. Criar Conteúdo HTML
- Use o editor de HTML para escrever seu conteúdo
- Ou escolha um dos modelos prontos:
  - **Documento Simples**: Estrutura básica com título e lista
  - **Relatório**: Formatação profissional com tabela
  - **Carta**: Template para correspondência formal

### 3. Preview do Conteúdo
- Clique em "Mostrar Preview" para ver como ficará o documento
- Ajuste o HTML conforme necessário

### 4. Gerar PDF
- **PDF Base64**: Gera o PDF e permite visualizar/baixar
- **Download Direto**: Baixa o PDF automaticamente

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── ApiKeyConfig.tsx      # Configuração de API key
│   ├── ApiStatus.tsx         # Status da API
│   ├── HtmlEditor.tsx        # Editor de HTML com preview
│   └── PdfGenerator.tsx      # Gerador de PDFs
├── services/
│   └── api.ts               # Serviços para consumir a API
├── App.tsx                  # Componente principal
├── App.css                  # Estilos da aplicação
└── main.tsx                 # Ponto de entrada
```

## 🔌 Endpoints da API

O cliente consome os seguintes endpoints da MakeDocAPI:

- `GET /` - Teste de conexão
- `GET /generate-pdf/` - Informações da API
- `POST /generate-pdf/` - Gera PDF para download direto
- `POST /generate-pdf/base64` - Gera PDF em base64

## 🎨 Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP
- **CSS Grid/Flexbox** - Layout responsivo

## 📱 Responsividade

O cliente é totalmente responsivo e funciona em:

- **Desktop**: Layout em duas colunas com sidebar
- **Tablet**: Layout adaptativo com sidebar colapsável
- **Mobile**: Layout em coluna única otimizado para touch

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção
npm run lint         # Executa linter
```

## 🔒 Segurança

- API keys são armazenadas no localStorage do navegador
- Todas as requisições incluem automaticamente o header `X-API-Key`
- Validação de entrada no frontend antes de enviar para a API

## 🐛 Solução de Problemas

### API não conecta
- Verifique se a API está rodando em `http://localhost:8000`
- Confirme se não há firewall bloqueando a porta
- Teste a API diretamente: `curl http://localhost:8000/`

### Erro de API Key
- Use uma das chaves válidas listadas na interface
- Verifique se a chave está sendo salva corretamente
- Limpe o localStorage e configure novamente

### PDF não gera
- Verifique se o HTML é válido
- Confirme se a API key está configurada
- Verifique os logs do console para erros detalhados

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.
