/**
 * Sanitiza HTML removendo scripts e estilos perigosos
 */
export const sanitizeHtml = (html: string): string => {
  // Remover scripts
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remover event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remover javascript: URLs
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Remover data: URLs que podem conter scripts
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  // Remover estilos que podem afetar o iframe
  sanitized = sanitized.replace(/position:\s*fixed/gi, 'position: static');
  sanitized = sanitized.replace(/position:\s*absolute/gi, 'position: static');
  sanitized = sanitized.replace(/z-index:\s*-?\d+/gi, 'z-index: auto');

  // Remover estilos que podem causar overflow
  sanitized = sanitized.replace(/overflow:\s*hidden/gi, 'overflow: visible');

  return sanitized;
};

/**
 * Lista de tags HTML seguras permitidas
 */
export const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'div', 'span', 'br', 'hr',
  'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'strong', 'b', 'em', 'i', 'u', 's',
  'a', 'img',
  'blockquote', 'pre', 'code',
  'form', 'input', 'textarea', 'button', 'select', 'option',
  'fieldset', 'legend', 'label'
];

/**
 * Lista de atributos seguros permitidos
 */
export const ALLOWED_ATTRIBUTES = [
  'class', 'id', 'style', 'title', 'alt', 'src', 'href',
  'width', 'height', 'type', 'value', 'placeholder',
  'readonly', 'disabled', 'checked', 'selected',
  'colspan', 'rowspan', 'border', 'cellpadding', 'cellspacing'
]; 