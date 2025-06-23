export const templates = [
  {
    name: 'Documento Simples',
    html: `
<h1>Título do Documento</h1>
<p>Este é um parágrafo de exemplo.</p>
<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>`
  },
  {
    name: 'Relatório',
    html: `
<div style="font-family: Arial, sans-serif;">
<h1 style="color: #2c3e50;">Relatório</h1>
<h2>Resumo Executivo</h2>
<p>Este é um relatório de exemplo com formatação.</p>

<h2>Dados</h2>
<table border="1" style="width: 100%; border-collapse: collapse;">
  <tr>
    <th style="padding: 8px;">Coluna 1</th>
    <th style="padding: 8px;">Coluna 2</th>
  </tr>
  <tr>
    <td style="padding: 8px;">Dado 1</td>
    <td style="padding: 8px;">Dado 2</td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Carta',
    html: `
<div style="font-family: 'Times New Roman', serif; margin: 20px;">
<div style="text-align: right; margin-bottom: 30px;">
  <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
</div>

<h2>Prezado(a) Senhor(a),</h2>

<p>Escreva o conteúdo da sua carta aqui...</p>

<p style="margin-top: 30px;">Atenciosamente,</p>
<p>Seu Nome</p>
</div>`
  }
];