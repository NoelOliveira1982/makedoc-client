import React, { useRef, useEffect } from 'react';
import { sanitizeHtml } from '../../utils/htmlSanitizer';
import { safeHtml } from './safe-html';

interface SafePreviewProps {
  htmlContent: string;
  className?: string;
}

const SafePreview: React.FC<SafePreviewProps> = ({ htmlContent, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
        const sanitizedHtml = sanitizeHtml(htmlContent);

        doc.open();
        doc.write(safeHtml(sanitizedHtml));
        doc.close();
      }
    }
  }, [htmlContent]);

  return (
    <iframe
      ref={iframeRef}
      className={className}
      sandbox="allow-same-origin"
      title="HTML Preview"
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid #e1e8ed',
        borderRadius: '6px',
        backgroundColor: 'white',
        minHeight: '300px'
      }}
    />
  );
};

export default SafePreview; 