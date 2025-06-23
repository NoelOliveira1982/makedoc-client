export const safeHtml = (sanitizedHtml: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* Reset básico para o preview */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 1rem;
        background: white;
      }
      
      /* Estilos para elementos comuns */
      h1, h2, h3, h4, h5, h6 {
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      
      p {
        margin-bottom: 1rem;
      }
      
      ul, ol {
        margin-bottom: 1rem;
        padding-left: 2rem;
      }
      
      table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1rem;
      }
      
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      
      th {
        background-color: #f8f9fa;
      }
      
      img {
        max-width: 100%;
        height: auto;
      }
      
      /* Prevenir estilos que podem afetar o iframe */
      html, body {
        overflow: visible !important;
        position: static !important;
      }
      
      /* Desabilitar scripts maliciosos */
      script {
        display: none !important;
      }
      
      /* Garantir que estilos perigosos sejam sobrescritos */
      * {
        position: static !important;
        z-index: auto !important;
      }
    </style>
  </head>
  <body>
    ${sanitizedHtml}
  </body>
</html>
`;